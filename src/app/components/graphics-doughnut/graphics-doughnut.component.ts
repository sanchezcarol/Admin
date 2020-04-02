import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graphics-doughnut',
  templateUrl: './graphics-doughnut.component.html',
  styleUrls: ['./graphics-doughnut.component.css']
})
export class GraphicsDoughnutComponent implements OnInit {

  @Input() doughnutChartLabels:Label[]
  @Input() doughnutChartData: MultiDataSet[]
  @Input() doughnutChartType: ChartType
  @Input() leyenda:string

  constructor() { 
  }

  ngOnInit() {   
  }

}
