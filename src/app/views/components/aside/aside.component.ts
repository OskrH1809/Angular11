import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor() { }
   user = JSON.parse(localStorage.getItem('usuario'));
   role = this.user['role']
  ngOnInit(): void {
    
  }

}
