import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SortablejsModule } from 'angular-sortablejs';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SortablejsModule.forRoot({ animation: 150 }),
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
