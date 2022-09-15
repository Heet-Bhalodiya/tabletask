import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { GenderfilterPipe } from './pipes/genderfilter.pipe'
import { TableComponent } from './table/table.component';
import { SearchFilterPipe } from './pipes/serachfilter.pipe';
import { IndividualsearchPipe } from './pipes/individualsearch.pipe';
import { FormComponent } from './form/form.component';
  

@NgModule({
  declarations: [
    AppComponent,
    SearchFilterPipe,
    IndividualsearchPipe,
    GenderfilterPipe,
    TableComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
