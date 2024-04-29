import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeListComponent } from './components/cafe-list/cafe-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [CafeListComponent],
  declarations: [CafeListComponent, CafeListComponent]
})
export class CafeModule { }
