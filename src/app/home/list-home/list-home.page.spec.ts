import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHomePage } from './list-home.page';

describe('ListHomePage', () => {
  let component: ListHomePage;
  let fixture: ComponentFixture<ListHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
