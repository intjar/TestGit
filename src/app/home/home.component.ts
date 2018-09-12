import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    constructor(updates: SwUpdate, private titleService: Title) {
      updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    }) }

  ngOnInit() {
    this.titleService.setTitle('dashboard');
  }

}
