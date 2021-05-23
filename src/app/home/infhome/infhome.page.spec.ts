import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfhomePage } from './infhome.page';

describe('InfhomePage', () => {
  let component: InfhomePage;
  let fixture: ComponentFixture<InfhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfhomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
