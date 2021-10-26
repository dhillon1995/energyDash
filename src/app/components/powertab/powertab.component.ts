import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-powertab',
  templateUrl: './powertab.component.html',
  styleUrls: ['./powertab.component.css']
})
export class PowertabComponent implements OnInit {

  url: string = "https://www.knowatts.co.uk/Power+Manager+Dashboard";
  urlSafe: SafeResourceUrl

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
