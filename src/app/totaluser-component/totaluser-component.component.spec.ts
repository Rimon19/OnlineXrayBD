import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaluserComponentComponent } from './totaluser-component.component';

describe('TotaluserComponentComponent', () => {
  let component: TotaluserComponentComponent;
  let fixture: ComponentFixture<TotaluserComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotaluserComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotaluserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
