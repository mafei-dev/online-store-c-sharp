import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public openSidebar: boolean = false;
  public listView: boolean = false;
  public col: string = '3';

  // @ViewChild("quickView") QuickView: QuickViewComponent;

  categories = [];
  items = [];
  private category: string;

  constructor(private http: HttpClient, private route: ActivatedRoute,) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['cat'];
      this.getItemListForCategory(this.category);
    });
    this.getAllCategoryList();
    this.sidebarToggle();
  }

  sidebarToggle() {
    this.openSidebar = !this.openSidebar;
    this.col = '3';
  }

  toggleListView(val) {
    this.listView = val;
  }

  gridColumn(val) {
    this.col = val;
  }


  private getAllCategoryList() {
    this.http.get<any>(`${environment.baseUrl}/category/list`).subscribe(
      data => {
        if (data) {
          console.log('data ', data);
          this.categories = data;
        } else {
          this.categories = [];
        }
      }, error => {
        this.categories = [];
      }, () => {

      }
    );
  }

  private getItemListForCategory(category: string) {
    this.http.get<any>(`${environment.baseUrl}/item/view?categoryId=${category == undefined ? '0' : category}`).subscribe(
      data => {
        if (data) {
          console.log('data ', data);
          this.items = data;
        } else {
          this.items = [];
        }
      }, error => {
        this.items = [];
      }, () => {

      }
    );
  }

  addCartItem(item: any) {
    // console.log("item ",item);
    let cart = localStorage.getItem('cart');
    let cartOb;
    if (!cart) {
      cartOb = [];
    } else {
      cartOb = JSON.parse(cart);
    }
    let find = cartOb.find(({itemCode}) => itemCode === item?.itemCode);
    // console.log("find ",find);
    if (find === undefined) {
      cartOb.push(item);
    }
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cartOb));
    // console.log(localStorage.getItem('cart'));
  }
}
