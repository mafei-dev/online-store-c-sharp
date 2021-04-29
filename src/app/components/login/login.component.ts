import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginData: {
    email: string,
    password: string,
  } = {
    email: null,
    password: null
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    this.http.post<any>(`${environment.baseUrl}/customer/login`, this.loginData).subscribe(
      data => {
        //todo: store token
        this.router.navigate(['/user']);
      }, error => {
        alert('something went wrong');
      }, () => {
      }
    );
  }
}
