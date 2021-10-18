import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import exampleData from "../../../assets/snapshotExample.json"
import testData2 from "../../../assets/snapshot.json"

const data = {
  chart: {
    caption: "Comparison of cost",
    yaxisname: "Costs in <b>£</b>",
    subcaption: "2012-2016",
    showhovereffect: "1",
    numberPrefix: "£",
    drawcrossline: "1",
    plottooltext: " <b>$seriesName</b> used <b>$dataValue</b> in $label",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "1st"
        },
        {
          label: "2nd"
        },
        {
          label: "3rd"
        },
        {
          label: "4th"
        },
        {
          label: "5th"
        },
        {
          label: "6th"
        },
        {
          label: "7th"
        },
        {
          label: "8th"
        },
        {
          label: "9th"
        },
        {
          label: "10th"
        },
        {
          label: "11th"
        },
        {
          label: "12th"
        },
        {
          label: "13th"
        },
        {
          label: "14th"
        },
        {
          label: "15th"
        },
        {
          label: "16th"
        },
        {
          label: "17th"
        },
        {
          label: "18th"
        },
        {
          label: "19th"
        },
        {
          label: "20th"
        },
        {
          label: "21st"
        },
        {
          label: "22nd"
        },
        {
          label: "23rd"
        },
        {
          label: "25th"
        },
        {
          label: "26th"
        },
        {
          label: "27th"
        },
        {
          label: "29th"
        },
        {
          label: "30th"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Brook Green",
      data: [
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        }
      ]
    },
    {
      seriesname: "Site 2",
      data: [
        {
          value: "3.8"
        },
        {
          value: "4"
        },
        {
          value: "2.8"
        },
        {
          value: "3.6"
        },
        {
          value: "2.9"
        },
        {
          value: "4"
        },
        {
          value: "3.8"
        },
        {
          value: "3.2"
        },
        {
          value: "4.2"
        },
        {
          value: "3.7"
        },
        {
          value: "3.2"
        },
        {
          value: "2.6"
        },
        {
          value: "2.2"
        },
        {
          value: "2.8"
        },
        {
          value: "3.7"
        },
        {
          value: "4.3"
        },
        {
          value: "5"
        },
        {
          value: "4.7"
        },
        {
          value: "4.8"
        },
        {
          value: "4.2"
        },
        {
          value: "3.8"
        },
        {
          value: "3.9"
        },
        {
          value: "3.2"
        },
        {
          value: "3.3"
        },
        {
          value: "3.6"
        },
        {
          value: "4.2"
        },
        {
          value: "4.6"
        },
        {
          value: "4.8"
        },
        {
          value: "4.8"
        }
      ]
    },
    {
      seriesname: "Site 3",
      data: [
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        }
      ]
    },
    {
      seriesname: "Site 4",
      data: [
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        },
        {
          value: "4"
        }
      ]
    }
  ]
};

@Component({
  selector: 'app-comparetab',
  templateUrl: './comparetab.component.html',
  styleUrls: ['./comparetab.component.css']
})

export class ComparetabComponent implements OnInit {
  width = 600;
  height = 400;
  type = "msline";
  dataFormat = "json";
  dataSource = data;

  constructor(private http: HttpClient) { }

  testVar: any = (testData2 as any);

  testVar2: any;

  newVar: any;

  exampleDataVar: any = (exampleData as any);

  dialvalue: any = "89";

  
  getDataHttp(url:string) {

    return this.http.get(url);
  }

  ngOnInit(): void {

    var dataTest = this.dataSource.dataset[0].data;

    //var index = dataTest.findIndex(p => p.label == "1st");
    
    console.log("testbar data", dataTest)
    //console.log("index find data", index)
    //console.log("index to value", this.dataSource.dataset[0].data[index]['value'])
    //console.log("index to value", this.dataSource.dataset[0].data[0]['value'] = "5.28")
    //console.log("index to value", this.dataSource.dataset[0].data[index]['value'])

    console.log("Start timer");
    setTimeout(() => {  
       //never do this - I'm ashamed 
       this.dataSource.dataset[0].data[0]['value'] = this.newVar.tarrif_cost_total
       this.dataSource.dataset[0].data[1]['value'] = this.newVar.cost_sep2
       this.dataSource.dataset[0].data[2]['value'] = this.newVar.cost_sep3
       this.dataSource.dataset[0].data[3]['value'] = this.newVar.cost_sep4
       this.dataSource.dataset[0].data[4]['value'] = this.newVar.cost_sep5
       this.dataSource.dataset[0].data[5]['value'] = this.newVar.cost_sep6
       this.dataSource.dataset[0].data[6]['value'] = this.newVar.cost_sep7
       this.dataSource.dataset[0].data[7]['value'] = this.newVar.cost_sep8
       this.dataSource.dataset[0].data[8]['value'] = this.newVar.cost_sep9
       this.dataSource.dataset[0].data[9]['value'] = this.newVar.cost_sep10
       this.dataSource.dataset[0].data[10]['value'] = this.newVar.cost_sep11
       this.dataSource.dataset[0].data[11]['value'] = this.newVar.cost_sep12
       this.dataSource.dataset[0].data[12]['value'] = this.newVar.cost_sep13
       this.dataSource.dataset[0].data[13]['value'] = this.newVar.cost_sep14
       this.dataSource.dataset[0].data[14]['value'] = this.newVar.cost_sep15
       this.dataSource.dataset[0].data[15]['value'] = this.newVar.cost_sep16
       this.dataSource.dataset[0].data[16]['value'] = this.newVar.cost_sep17
       this.dataSource.dataset[0].data[17]['value'] = this.newVar.cost_sep18
       this.dataSource.dataset[0].data[18]['value'] = this.newVar.cost_sep19
       this.dataSource.dataset[0].data[19]['value'] = this.newVar.cost_sep20
       this.dataSource.dataset[0].data[20]['value'] = this.newVar.cost_sep21
       this.dataSource.dataset[0].data[21]['value'] = this.newVar.cost_sep22
       this.dataSource.dataset[0].data[22]['value'] = this.newVar.cost_sep23
       this.dataSource.dataset[0].data[23]['value'] = this.newVar.cost_sep24
       this.dataSource.dataset[0].data[24]['value'] = this.newVar.cost_sep25
       this.dataSource.dataset[0].data[25]['value'] = this.newVar.cost_sep26
       this.dataSource.dataset[0].data[26]['value'] = this.newVar.cost_sep27
       this.dataSource.dataset[0].data[27]['value'] = this.newVar.cost_sep28
       this.dataSource.dataset[0].data[28]['value'] = this.newVar.cost_sep29
       this.dataSource.dataset[0].data[29]['value'] = this.newVar.cost_sep30
     }, 2000);


    console.log("breakdown Init")

    this.testVar2 = JSON.parse(JSON.stringify(testData2));
    console.log("this is a power now test from testVar2", this.testVar2.power_now)

    let appInfo = "";
    this.getDataHttp('../assets/snapshot.json').subscribe(
      (data: any) => {
        var test = data;
        console.log("snapshot data: ", test);
        this.newVar = JSON.parse(JSON.stringify(test));
        console.log("this is newVar", this.newVar)
        console.log("this is newVar", this.newVar.power_now)
        console.log("this week test",this.newVar.power_thisweek)
        //this.dialtestnum = 300//this.newVar.power_today2
        console.log("dialtestnum ", this.newVar.power_now)
      }
    )

    console.log("dial init test ", this.dataSource.dataset[0]) 

    console.log( "dataSource object", this.dataSource.dataset[0])
    console.log(this.dataSource.dataset[0].data[0]['value'])

  }

}
