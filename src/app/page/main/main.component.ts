import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  view = "product";
  constructor() { }

  ngOnInit(): void {
  }
  _changeView(data){
    debugger
    this.view=data;

  }

}
