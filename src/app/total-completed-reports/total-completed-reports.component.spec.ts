import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCompletedReportsComponent } from './total-completed-reports.component';

describe('TotalCompletedReportsComponent', () => {
  let component: TotalCompletedReportsComponent;
  let fixture: ComponentFixture<TotalCompletedReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCompletedReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCompletedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
