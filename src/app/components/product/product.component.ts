import {Component, OnInit, ViewChild} from '@angular/core';

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

  constructor() { }

  ngOnInit() {
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


}
