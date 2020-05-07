import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { _URL_ } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Medic } from 'src/app/models/medic.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  medics:Medic[] = []
  hospitals:Hospital[] = []
  users:User[] = []

  constructor(public activatedRoute:ActivatedRoute, public http:HttpClient) {
    activatedRoute.params.subscribe(params=>{
      let value = params['value']
      this.search(value)  
    })
   }

  ngOnInit() { }

  search(value:string){
  
    let url = _URL_+'/search/todo/'+value    
    this.http.get(url).subscribe((resp:any) =>{
      this.medics = resp.medics
      this.hospitals  = resp.hospitales
      this.users = resp.users
    })

  }

}
