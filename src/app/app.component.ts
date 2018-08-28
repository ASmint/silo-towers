import { Component, OnInit } from '@angular/core';
import { Indicator } from './models/indicator.model';
import { Observable } from 'rxjs/Observable';
import { TowersService } from './services/towers.service';

@Component({
  selector: 'st-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly indicators: Observable<Indicator[]>;
  private _serverData: Indicator[];

  constructor(private _towerService: TowersService) {
    this._towerService.getIndicators()
      .subscribe(data => {
        this._serverData = data;
      }
      );
    this.indicators = this.emulateRecievingData();
  }

  ngOnInit() {}

  emulateRecievingData() {
    return new Observable<Indicator[]>(observer => {
      const interval = setInterval(() => {
        const indicators = this._serverData.map(item => {
          item.value = item.value < item.maxValue ? item.value + 300 : 0;
          return item;
        });
        observer.next(indicators);
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    });
  }


}
