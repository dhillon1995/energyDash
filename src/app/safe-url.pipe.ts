import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  url: any = "www.google.com";

  constructor(private sanitizer: DomSanitizer) {}

  transform(url:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
