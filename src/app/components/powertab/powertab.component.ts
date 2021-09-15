import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-powertab',
  templateUrl: './powertab.component.html',
  styleUrls: ['./powertab.component.css']
})
export class PowertabComponent implements OnInit {

  uri = "goboldygook";
  res : any

  constructor(private domSanitizer: DomSanitizer) {
    this.res = domSanitizer.bypassSecurityTrustUrl(this.uri);
  }


  ngOnInit(): void {
  }

}
