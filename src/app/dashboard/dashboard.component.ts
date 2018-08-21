import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',  
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) { }
  
  ngOnInit() {}

  onClickFunc(type){

    if(type =="capacity"){
      this.router.navigate(['/capacity']);
    }

    if(type =="generation"){
      this.router.navigate(['/generation']);
    }
  }

}
