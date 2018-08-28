import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { AppComponent } from './app.component';
import { SiloTowerComponent } from './silo-tower/silo-tower.component';
import { InMemoryService } from './services/in-memory.service';
import { TowersService } from './services/towers.service';


@NgModule({
  declarations: [
    AppComponent,
    SiloTowerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryService, { dataEncapsulation: false })
  ],
  providers: [TowersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
