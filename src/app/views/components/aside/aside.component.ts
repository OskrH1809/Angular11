import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdministrarUserService } from 'src/app/auth/services/administrar-user.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor(private router:Router,private rol:AdministrarUserService) { }



   role = 'ADMIN'
  ngOnInit(): void {

  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('user');
    this.router.navigate(['login']);

  }

}
