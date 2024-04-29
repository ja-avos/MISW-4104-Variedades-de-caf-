import { Component, OnInit } from '@angular/core';
import { Cafe } from '../../models/cafe.model';
import { CafeService } from '../../services/cafe.service';

@Component({
  selector: 'app-cafe-list',
  templateUrl: './cafe-list.component.html',
  styleUrls: ['./cafe-list.component.css']
})
export class CafeListComponent implements OnInit {

  cafes: Cafe[] = [];

  constructor(private cafeService: CafeService) { }

  ngOnInit() {
    this.loadCafes();
  }

  loadCafes() {
    this.cafeService.getCafes().subscribe(cafes => {
      this.cafes = cafes;
    });
  }

}
