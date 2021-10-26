import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import exampleData from "../../../assets/snapshotExample.json"
import testData2 from "../../../assets/snapshot.json"

@Component({
  selector: 'app-cost-card',
  templateUrl: './cost-card.component.html',
  styleUrls: ['./cost-card.component.css']
})
export class CostCardComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  testVar: any = (testData2 as any);

  testVar2: any;

  testVar3: any;

  exampleDataVar: any = (exampleData as any);



  getDataHttp(url:string) {

    return this.http.get(url);
  }


  ngOnInit(): void {

    this.testVar2 = JSON.parse(JSON.stringify(testData2));
    let appInfo = "";
    this.getDataHttp('../assets/snapshot.json').subscribe(
      (data: any) => {
        var test = data;
        this.testVar3 = JSON.parse(JSON.stringify(test));
      }
    )

  }

}
