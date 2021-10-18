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
import {MatFormFieldModule} from '@angular/material/form-field';


import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as PowerCharts from "fusioncharts/fusioncharts.powercharts";
import * as FusionWidgets from "fusioncharts/fusioncharts.widgets";
import { GraphtestComponent } from './components/graphtest/graphtest.component';
import { DialtestComponent } from './components/dialtest/dialtest.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { Dial2Component } from './components/dial2/dial2.component';
import { TestbarComponent } from './components/testbar/testbar.component';
import { IframetestComponent } from './components/iframetest/iframetest.component';

FusionChartsModule.fcRoot(FusionCharts, FusionWidgets, PowerCharts, charts, FusionTheme);

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
    IframeComponent,
    GraphtestComponent,
    DialtestComponent,
    SafeUrlPipe,
    Dial2Component,
    TestbarComponent,
    IframetestComponent
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
    FusionChartsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }