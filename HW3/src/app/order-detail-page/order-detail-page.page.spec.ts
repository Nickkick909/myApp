import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailPagePage } from './order-detail-page.page';

describe('OrderDetailPagePage', () => {
  let component: OrderDetailPagePage;
  let fixture: ComponentFixture<OrderDetailPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
