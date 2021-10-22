import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-zoomchart',
  templateUrl: './zoomchart.component.html',
  styleUrls: ['./zoomchart.component.css']
})
export class ZoomchartComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ZoomchartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
}
