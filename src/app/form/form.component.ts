import { TableComponent } from './../table/table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorMessages } from '../error-message'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userData: any[] = [];
  isError: boolean = false;
  isOnEdit: boolean = false;
  user: any = {};
  gendersOption: any = ['male', 'female']
  saveData: any = {}
  currentUserId: any;
  deleteIndex: any;
  deleteName: string = '';
  changeData: any = {};


  // Error Messages 
  idRequired: string = ErrorMessages.ID_REQUIRED;
  idInvalid: string = ErrorMessages.ID_INVALID;
  idMaxLength: string = ErrorMessages.ID_MAX_LENGTH;
  idAlreadyExist: string = ErrorMessages.ID_ALREADY_EXIST;
  nameRequired: string = ErrorMessages.NAME_REQUIRED;
  genderRequired: string = ErrorMessages.GENDER_REQUIRED;
  contactRequired: string = ErrorMessages.CONTACT_REQUIRED;
  contactPattern: string = ErrorMessages.CONTACT_PATTERN;
  addressRequired: string = ErrorMessages.ADDRESS_REQUIRED


  @ViewChild(TableComponent) table!: TableComponent;

  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('Users')!);
  }

  formData = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1), Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.pattern('(([A-Z])*([a-z])*)*')]),
    gender: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    address: new FormControl('', [Validators.required]),
  });

  // add the form data in local storage  
  addUser(user: any) {
    let userData:any = []
    if (localStorage.getItem('Users')) {
      this.userData = JSON.parse(localStorage.getItem('Users')!);
      this.userData = [user, ...this.userData];
    }
    else {
      this.userData = [user]
    }
    localStorage.setItem('Users', JSON.stringify(this.userData));
    this.table.rowCountChange(this.table.rowCount, this.userData)
  }

  onSubmit() {
    console.log(this.formData.value);
    this.user = Object.assign(this.user, this.formData.value);
    this.addUser(this.user);
    this.formData.reset();
  }

  // Modal open with selected row data
  onEdit(item: any) {
    this.isOnEdit = true;
    this.formData.setValue({
      id: item.id,
      name: item.name,
      gender: item.gender,
      contact: item.contact,
      address: item.address,
    });
    this.currentUserId = this.formData.value.id
    this.saveData = this.formData.value
  }

  // delete selected column from the table 
  onDelete(index: any) {
    console.log(index);
    let ind = this.userData.indexOf(this.userData[index]);
    if (ind > -1) {
      this.userData.splice(ind, 1);
    }
    localStorage.setItem('Users', JSON.stringify(this.userData));
    this.table.rowCountChange(this.table.rowCount)
  }

  // it gives index of selected column which we want to delete 
  getDeleteIndex(index: any) {
    this.deleteName = this.userData[index].name
    this.deleteIndex = index
  }


  // for unique id concept. if id repeat then it will show error
  idChange(event: any) {
    this.isError = false;
    this.userData.map((element, index) => {
      if (this.userData[index].id == event.target.value) {
        this.isError = true;
      }
    });
    if (this.isError) {
      this.formData.controls.id.setErrors({ idExist: true });
    }
  }

  // on click Edit button if entry does not change or once change but after it will set to as it is then update button is disable because nothing changed 
  updateDisable() {
    this.changeData = {
      id: this.formData.controls.id.value?.trim(),
      contact: this.formData.controls.contact.value?.trim(),
      name: this.formData.controls.name.value?.trim(),
      gender: this.formData.controls.gender.value?.trim(),
      address: this.formData.controls.address.value?.trim()
    }
    if (JSON.stringify(this.saveData) != JSON.stringify(this.changeData)) {
      return false;
    }
    return true;
  }

  // On edit button we can edit row data and submit using update button
  newData: any
  onUpdate(selectedrow: any) {
    this.userData.forEach((element, index) => {
      if (this.userData[index].id === this.currentUserId) {
        this.userData[index] = selectedrow
        console.log(this.userData[index])
      
      }
    });
    localStorage.setItem('Users', JSON.stringify(this.userData));
    this.formData.reset();
    this.isOnEdit = false;
  }

  // when modal close then it will reset form 
  onClose() {
    this.isOnEdit = false;
    this.formData.reset();
  }

}
