import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {OrderDetailComponent} from '../order-detail/order-detail.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  orderList = [];

  ngOnInit(): void {
    this.getUserDetails();
    this.getOrderHistory();
  }

  currentPage: number = 0;

  getOrderHistory() {
    this.http.get<any>(`${environment.baseUrl}/orders/history?customerId=1&currentPage=${this.currentPage}`).subscribe(
      data => {
        if (data) {
          console.log('data ', data);
          this.orderList = data;
          this.currentPage++;
        } else {
          this.orderList = [];
        }
      }, error => {
        this.orderList = [];
      }, () => {

      }
    );
  }

  userDetail: any;

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

  updateUserProfile() {

  }


  openModal(order) {
    const modalRef = this.modalService.open(OrderDetailComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.orderId = order.orderId;
  }
}
