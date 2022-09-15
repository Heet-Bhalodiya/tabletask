import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  isError: boolean = false;
  isOnEdit: boolean = false;
  globalSearch: string = '';
  nameSearch: string = '';
  contactSearch: any = ''
  idSearch: any = '';
  genderSearch: string = '';
  orderId: boolean = true;
  orderName: boolean = true;
  orderContact: boolean = true;
  checkSortingKey: string = '';
  user: any = {};
  gendersOption: any = ['male', 'female']
  directionLinks: boolean = true;
  autoHide: boolean = false;
  responsive: boolean = false;
  rowCount: number = 1;
  page: PaginationInstance = {
    itemsPerPage: 3,
    currentPage: 1,
  };
  labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
  };


  @Input() userRecords: any[] = []
  @Output() selectedFormValue = new EventEmitter<any>()
  @Output() selectedRow = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
    this.rowCountChange(this.rowCount)
  }

  // disable text while searching is or contact, it only allows number
  keyPressNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  // disable number while typing name only allow text  
  keyPressName(event: any) {
    return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122;
  }

  // it send the selected column index to the parent element 
  sendIndex(index: any) {
    this.selectedRow.emit(index)
  }

  // it will send the data to parent Component-"form-component" 
  onEdit(item: any) {
    this.selectedFormValue.emit(item)
  }

  // while changing the page it will update the current page number 
  onPageChange(number: number) {
    this.page.currentPage = number;
    this.rowCountChange(number)
  }

  rowCountChange(number: number, totalRecord?: any) {
    let totalData = totalRecord ? totalRecord.length : this.userRecords.length;
    let num = Math.floor(totalData / this.page.itemsPerPage);
    let module = totalData % this.page.itemsPerPage;
    if (totalData < this.page.itemsPerPage) {
      this.rowCount = (totalData % this.page.itemsPerPage)
    }
    else {
      this.userRecords.forEach((element: any) => {
        if (this.page.currentPage <= num) {
          this.rowCount = this.page.itemsPerPage;
        }
        else {
          this.rowCount = module;
        }
      });
    }
  }

  onPageBoundsCorrection(number: number) {
    this.page.currentPage = number;
  }

  // for sorting table column : ID
  sortId() {
    let data: any[] = this.userRecords.slice((this.page.currentPage - 1) * this.page.itemsPerPage, (this.page.currentPage * this.page.itemsPerPage));
    if (this.orderId) {
      data.sort((a, b) => a.id - b.id);
    }
    else {
      data.sort((a, b) => b.id - a.id);
    }
    data.forEach((element: any, index: any) => {
      this.userRecords.splice(((this.page.currentPage - 1) * this.page.itemsPerPage) + index, 1, data[index]);
    });
    this.orderId = !this.orderId;
  }

  // for sorting table column : contact
  sortContact() {
    let data: any[] = this.userRecords.slice((this.page.currentPage - 1) * this.page.itemsPerPage, (this.page.currentPage * this.page.itemsPerPage));
    if (this.orderContact) {
      data.sort((a, b) => a.contact - b.contact);
    } else {
      data.sort((a, b) => b.contact - a.contact);
    }
    data.forEach((element: any, index: any) => {
      this.userRecords.splice(((this.page.currentPage - 1) * this.page.itemsPerPage) + index, 1, data[index]);
    })
    this.orderContact = !this.orderContact;
  }

  // for sorting table column : Name and Address
  sortName(value: any) {
    this.orderName = !this.orderName;
    let direction = this.orderName ? 1 : -1;
    let data: any[] = this.userRecords.slice((this.page.currentPage - 1) * this.page.itemsPerPage, (this.page.currentPage * this.page.itemsPerPage));
    data.sort(function (a: string, b: string) {
      if (a[value] < b[value]) {
        return -1 * direction;
      }
      else if (a[value] > b[value]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    })
    data.forEach((element: any, index: any) => {
      this.userRecords.splice(((this.page.currentPage - 1) * this.page.itemsPerPage) + index, 1, data[index]);
    });
  }

}