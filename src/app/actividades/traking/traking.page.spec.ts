import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrakingPage } from './traking.page';

describe('TrakingPage', () => {
  let component: TrakingPage;
  let fixture: ComponentFixture<TrakingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrakingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrakingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
