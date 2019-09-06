import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaluploadsComponentComponent } from './totaluploads-component.component';

describe('TotaluploadsComponentComponent', () => {
  let component: TotaluploadsComponentComponent;
  let fixture: ComponentFixture<TotaluploadsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotaluploadsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotaluploadsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
