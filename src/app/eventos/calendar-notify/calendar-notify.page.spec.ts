import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNotifyPage } from './calendar-notify.page';

describe('CalendarNotifyPage', () => {
  let component: CalendarNotifyPage;
  let fixture: ComponentFixture<CalendarNotifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNotifyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNotifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
