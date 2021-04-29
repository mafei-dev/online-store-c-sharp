import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  userDetail: any;
  cartItems = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.updateCart();
  }

  updateCart() {
    let cartOb = JSON.parse(localStorage.getItem('cart'));
    console.log(cartOb);
    this.cartItems = cartOb;
    this.getTotalPrice();
  }

  total = 0;

  getTotalPrice() {
    let cart = localStorage.getItem('cart');
    let cartOb;
    if (!cart) {
      cartOb = [];
    } else {
      cartOb = JSON.parse(cart);
    }
    this.total = 0;
    cartOb.map(item => {
      this.total += (item?.unitPrice * item?.itemQty);
    });
  }

  getUserDetails() {
    //todo: get user id from session
    this.http.get<any>(`${environment.baseUrl}/customer/detail?customerId=1`).subscribe(
      data => {
        if (data) {
          console.log('data ', data);
          this.userDetail = data;
        } else {
          this.userDetail = null;
        }
      }, error => {
        this.userDetail = null;
      }, () => {

      }
    );
  }

  placeOrder() {
    const ipAPI = '//api.ipify.org?format=json';
    Swal.queue([{
      title: 'Place the order.',
      confirmButtonText: 'Proceed',
      text:
        'You are going to place the order.',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return fetch(ipAPI)
          .then(response => response.json())
          .then(data => {
            Swal.insertQueueStep({
              icon: 'success',
              title: 'The order has been successfully placed.'
            });
            //remove cart
            localStorage.removeItem('cart');
            this.router.navigate(['/user']);
          })
          .catch(() => {
            Swal.insertQueueStep({
              icon: 'error',
              title: 'Unable place the order'
            });
          });
      }
    }]);
  }
}
