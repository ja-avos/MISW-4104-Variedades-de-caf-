/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { faker } from '@faker-js/faker';

import { CafeListComponent } from './cafe-list.component';
import { CafeService } from '../../services/cafe.service';
import { HttpClientModule } from '@angular/common/http';
import { Cafe } from '../../models/cafe.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

function generateCafes(length: number = 3): Cafe[] {
  return Array.from({ length }, (_, i) => ({
    id: i + 1,
    nombre: faker.color.human(),
    tipo: faker.number.int() % 2 === 0 ? 'Café de Origen' : 'Blend',
    region: faker.location.city() + " " + faker.location.county(),
    sabor: faker.lorem.words(),
    altura: faker.number.int(),
    imagen: faker.image.url()
  }));
}

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let debug: DebugElement;
  let cafeService: CafeService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CafeListComponent ],
      providers: [ CafeService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;

    cafeService = TestBed.inject(CafeService);
    spyOn(cafeService, 'getCafes').and.returnValue(of(generateCafes()));
    component.ngOnInit();

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a table with length of the cafes", () => {
    expect(debug.queryAll(By.css("table")).length).toEqual(1);
    expect(debug.query(By.css("thead")).childNodes.length).toEqual(1);
    // Header must have #, Nombre, Tipo, Región
    expect(debug.query(By.css("thead")).children[0].childNodes.length).toEqual(4);
    expect(debug.query(By.css("thead")).children[0].childNodes[0].nativeNode.textContent).toEqual("#");
    expect(debug.query(By.css("thead")).children[0].childNodes[1].nativeNode.textContent).toEqual("Nombre");
    expect(debug.query(By.css("thead")).children[0].childNodes[2].nativeNode.textContent).toEqual("Tipo");
    expect(debug.query(By.css("thead")).children[0].childNodes[3].nativeNode.textContent).toEqual("Región");
    expect(debug.query(By.css("tbody")).children.length).toEqual(component.cafes.length);
  });

  it("should calculate the count of cafes by type", () => {
    // Component variables
    expect(component.countCafeOrigen).toEqual(component.cafes.filter(cafe => cafe.tipo === 'Café de Origen').length);
    expect(component.countCafeBlend).toEqual(component.cafes.filter(cafe => cafe.tipo === 'Blend').length);
    // Template
    expect(debug.query(By.css("#cuentaCafeOrigen")).nativeNode.textContent).toEqual("Total café de origen: " + component.countCafeOrigen.toString());
    expect(debug.query(By.css("#cuentaCafeBlend")).nativeNode.textContent).toEqual("Total café blend: " + component.countCafeBlend.toString());
  });

});
