import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HometabComponent } from './components/hometab/hometab.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ExampleCardComponent } from './components/example-card/example-card.component';
import { CostCardComponent } from './components/cost-card/cost-card.component';
import { RatingCardComponent } from './components/rating-card/rating-card.component';
import { EnvironmentCardComponent } from './components/environment-card/environment-card.component';
import { AppliancesCardComponent } from './components/appliances-card/appliances-card.component';
import { CarbonCardComponent } from './components/carbon-card/carbon-card.component';
import { PowertabComponent } from './components/powertab/powertab.component';
import { CosttabComponent } from './components/costtab/costtab.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ComparetabComponent } from './components/comparetab/comparetab.component';
import { EnvironmenttabComponent } from './components/environmenttab/environmenttab.component';
import { AppliancestabComponent } from './components/appliancestab/appliancestab.component';
import { TesthomeComponent } from './components/testhome/testhome.component';
import { MapcardComponent } from './components/mapcard/mapcard.component';
import { IframeComponent } from './components/iframe/iframe.component';
import { HttpClient, HttpClientModule }    from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HometabComponent,
    ExampleCardComponent,
    CostCardComponent,
    RatingCardComponent,
    EnvironmentCardComponent,
    AppliancesCardComponent,
    CarbonCardComponent,
    PowertabComponent,
    CosttabComponent,
    ComparetabComponent,
    EnvironmenttabComponent,
    AppliancestabComponent,
    TesthomeComponent,
    MapcardComponent,
    IframeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }