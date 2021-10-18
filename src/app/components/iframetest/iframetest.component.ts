import { getUrlScheme } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframetest',
  templateUrl: './iframetest.component.html',
  styleUrls: ['./iframetest.component.css']
})
export class IframetestComponent implements OnInit {

  url: string = "https://www.w3schools.com";

  sanitizedUrl: any;
  

  constructor(private sanitizer: DomSanitizer) { 
    
    //this.sanitizer.bypassSecurityTrustUrl
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.url)


    console.log(this.sanitizedUrl);

    
  }

  ngOnInit(): void {
    
  }

}
