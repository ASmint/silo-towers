import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewChecked,
} from '@angular/core';
import { Indicator } from '../models/indicator.model';

@Component({
  selector: "st-silo-tower",
  templateUrl: "./silo-tower.component.html",
  styleUrls: ["./silo-tower.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SiloTowerComponent implements OnInit, AfterViewChecked {
  @ViewChild("indicator")
  private _indicator: ElementRef;

  get fullHeight() {
    return this._fullHeight;
  }
  private _fullHeight = 395;

  private _y = 45;

  carnallite: number;

  @Input()
  get data(): Indicator {
    return this._data;
  }
  set data(value: Indicator) {
    this._data = value;
  }
  private _data: Indicator;

  get percent(): number {
    return this._getPercent();
  }

  set okStatus(value: boolean) {
    this._okStatus = value;
  }
  get okStatus() {
    if (
      this.data.value < this.data.minValue ||
      this.data.value > this.data.maxValue
    ) {
      this.okStatus = false;
    } else {
      this.okStatus = true;
    }
    return this._okStatus;
  }
  private _okStatus = true;

  constructor() {}

  ngOnInit() {
    this.carnallite = Math.round(Math.random() * 1000 + 500);
    this._setIndicatorHeight();
  }

  ngAfterViewChecked () {
    this._setIndicatorHeight();
  }

  private _setIndicatorHeight() {
    const indicatorElement = this._indicator.nativeElement as SVGRectElement;

    let indicatorHeight = (this.fullHeight / 100) * this.percent;
    if (indicatorHeight > this.fullHeight) {
      indicatorHeight = this.fullHeight;
    }
    indicatorElement.setAttribute(
      "y",
      `${this._y + this.fullHeight - indicatorHeight}`
    );
    indicatorElement.setAttribute(
      "height",
      `${this.fullHeight - this.fullHeight + indicatorHeight}`
    );
  }

  private _getPercent(): number {
    const startPoint = this.data.value - this.data.minValue;
    if (startPoint < 0) {
      return 0;
    }
    const onePercent = (this.data.maxValue - this.data.minValue) / 100;
    return Math.round(startPoint / onePercent);
  }
}
