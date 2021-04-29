import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems = [];

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.updateCart();
  }

  updateCart() {
    let cartOb = JSON.parse(localStorage.getItem('cart'));
    this.cartItems = cartOb;
    this.getTotalPrice();
  }

  updateQTY(qty: number, _item: any) {
// console.log("item ",item);
    let cart = localStorage.getItem('cart');
    let cartOb;
    if (!cart) {
      cartOb = [];
    } else {
      cartOb = JSON.parse(cart);
    }
    const _itemIndex = cartOb.findIndex((item => item.itemCode == _item.itemCode));
    _item.itemQty = _item.itemQty + (qty);
    cartOb[_itemIndex] = _item;
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cartOb));
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

  _removeItem(_item: any) {
    let cart = localStorage.getItem('cart');
    let cartOb;
    if (!cart) {
      cartOb = [];
    } else {
      cartOb = JSON.parse(cart);
    }
    const _itemIndex = cartOb.findIndex((item => item.itemCode == _item.itemCode));
    cartOb.splice(_itemIndex, 1);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cartOb));
    this.updateCart();
  }

  placeOrder() {
    this.router.navigate(['/checkout']);

  }
}
