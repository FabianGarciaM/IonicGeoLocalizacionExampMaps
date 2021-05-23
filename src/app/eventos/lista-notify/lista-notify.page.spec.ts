import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotifyPage } from './lista-notify.page';

describe('ListaNotifyPage', () => {
  let component: ListaNotifyPage;
  let fixture: ComponentFixture<ListaNotifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaNotifyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNotifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
