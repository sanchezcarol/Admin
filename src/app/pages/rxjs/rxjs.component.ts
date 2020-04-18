import { Component, OnInit } from '@angular/core';
import { Observable, observable, Subscription } from 'rxjs';
import { retry, map, filter } from "rxjs/operators"; 
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  subscription: Subscription

  constructor() { 

    this.subscription = this.devuelveObservable()
    .subscribe (
      numero => console.log('Contador ', numero),
      error => console.log( 'Error ',error),      
      () => console.log('El contador finalizo')
      
    )

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.subscription.unsubscribe();

  }

  devuelveObservable():Observable<any>{
    return new Observable( observer => {
      
      let contador = 0;

      let interval = setInterval( () => {

        contador += 1

        let salida = {
          valor : contador
        }

        observer.next(salida)

        // if(contador == 3){
        //   clearInterval(interval)
        //   observer.complete()
        // }
        // if(contador == 2){ // El observador emite un error
        //   observer.error('Error en el contador')
        // }


      },500)

    })
    .pipe( 
      retry(2),
      map( (resp:any) => {
        return resp.valor
      }),
      filter( valor => {
        //filtrA el valor que se recibe del map segun cierta logica, retorna un valor boolean 
        if( (valor%2)===1){
          return true
        }
        else return false
      })
    );
  }
}
