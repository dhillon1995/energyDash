import { Component, OnInit } from '@angular/core';
import testData from "../../../../../dataTest/dataTest.json"
import testData2 from "../../../assets/snapshot.json"

@Component({
  selector: 'app-example-card',
  templateUrl: './example-card.component.html',
  styleUrls: ['./example-card.component.css']
})
export class ExampleCardComponent implements OnInit {

  constructor() {

    console.log()
  }

  testVar: any = (testData2 as any);

  testVar2: any;


  ngOnInit(): void {
    this.testVar2 = JSON.parse(JSON.stringify(testData2));
    console.log("this is the data", testData2)
    console.log("this is the testVar", this.testVar)
    console.log("this is the testVar2", this.testVar2)
    console.log("this is Test from testVar", this.testVar.Test)
    console.log("this is Test from testVar2", this.testVar2[0].power_now)
  }

}
