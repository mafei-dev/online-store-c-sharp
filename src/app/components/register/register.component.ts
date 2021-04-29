import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public show: boolean = false;
  public userData: {
    name: string,
    email: string,
    password: string
  } = {
    name: null,
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

  register() {
    this.http.post<any>(`${environment.baseUrl}/customer/reg`, this.userData).subscribe(
      data => {
        this.router.navigate(['/login']);
      }, error => {
        alert('something went wrong');
      }, () => {

      }
    );
  }
}
