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

  // Variables para contar tipos de cafés
  countCafeOrigen: number = 0;
  countCafeBlend: number = 0;

  constructor(private cafeService: CafeService) { }

  ngOnInit() {
    this.loadCafes();
  }

  loadCafes() {
    this.cafeService.getCafes().subscribe(cafes => {
      this.cafes = cafes;
      this.countCafeOrigen = this.cafes.filter(cafe => cafe.tipo === 'Café de Origen').length;
      this.countCafeBlend = this.cafes.filter(cafe => cafe.tipo === 'Blend').length;
    });
  }

}
