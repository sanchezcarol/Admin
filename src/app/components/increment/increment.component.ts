import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtPorcentaje', {static:true}) txtPorcentaje:ElementRef 

  @Input() porcentaje:number = 50;
  @Input() leyenda:string = 'Leyenda';

  @Output() cambioValor:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges(value:number){

   
    if(value >= 100 ){
      this.porcentaje = 100;
    }else if( value <= 0){
      this.porcentaje = 0;
    }
    else{
      this.porcentaje = value;
    }

    this.txtPorcentaje.nativeElement.value = this.porcentaje
    this.cambioValor.emit( this.porcentaje)



  }


  cambiarValor(valor){
    
    if ( this.porcentaje >= 100 && valor > 0) {
      this.porcentaje=100;
      return ;
    }

    if ( this.porcentaje <= 0 && valor < 0) {
      this.porcentaje=0;
      return ;
    }

    this.porcentaje +=valor;
    this.cambioValor.emit( this.porcentaje)
    
  }

}
