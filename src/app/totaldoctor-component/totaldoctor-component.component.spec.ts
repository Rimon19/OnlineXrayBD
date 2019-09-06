import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaldoctorCOmponentComponent } from './totaldoctor-component.component';

describe('TotaldoctorCOmponentComponent', () => {
  let component: TotaldoctorCOmponentComponent;
  let fixture: ComponentFixture<TotaldoctorCOmponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotaldoctorCOmponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotaldoctorCOmponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
