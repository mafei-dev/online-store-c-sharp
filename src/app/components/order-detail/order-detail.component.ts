import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

interface OrderDetailDTO {
  itemCode: string,
  name: string,
  detailId: string,
  qty: number,
  price: number,
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() orderId;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  orderedDetail: {
    orderId: string,
    paymentStatus: string,
    orderStatus: string,
    date: string,
    paymentId: string,
    amount: number,
    detailList: OrderDetailDTO []
  } = {
    amount: 0,
    date: null,
    detailList: [],
    orderId: null,
    orderStatus: null,
    paymentId: null,
    paymentStatus: null
  };

  getOrderDetails() {
    this.http.get<any>(`${environment.baseUrl}/orders/history/details?orderId=${this.orderId}`).subscribe(
      data => {
        if (data) {
          console.log('data ', data);
          this.orderedDetail = data;
        } else {
          this.orderedDetail = null;
        }
      }, error => {
        alert('something went wrong');
        this.orderedDetail = null;
      }, () => {

      }
    );
  }

}
