import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: []
})
export class Graphics1Component implements OnInit {

  graphics:any = {
    'graphics1':{
      'labels': ['Con frigoles', 'con Natilla', 'con Tocino'],
      'data': [24,30,46],
      'type': 'doughnut',
      'leyenda': 'el pan se come con'
    },
    'graphics2':{
      'labels': ['Hombres', 'Mujeres'],
      'data': [4500,6000],
      'type': 'doughnut',
      'leyenda': 'entrevistados'
    },
    'graphics3':{
      'labels': ['Si', 'No'],
      'data': [95,5],
      'type': 'doughnut',
      'leyenda': '¿Les gusta el pan?'
    },
    'graphics4':{
      'labels': ['No', 'Si'],
      'data': [85,15],
      'type': 'doughnut',
      'leyenda': '¿Has ido recientemente al médico?'
    }
  }




  constructor() { }

  ngOnInit() {
    console.log(this.graphics);
    
  }

}
