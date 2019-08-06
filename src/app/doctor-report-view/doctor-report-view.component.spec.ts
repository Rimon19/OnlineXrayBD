import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReportViewComponent } from './doctor-report-view.component';

describe('DoctorReportViewComponent', () => {
  let component: DoctorReportViewComponent;
  let fixture: ComponentFixture<DoctorReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
