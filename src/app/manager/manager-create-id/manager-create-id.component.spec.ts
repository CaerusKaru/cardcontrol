import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCreateIdComponent } from './manager-create-id.component';

describe('ManagerCreateIdComponent', () => {
  let component: ManagerCreateIdComponent;
  let fixture: ComponentFixture<ManagerCreateIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerCreateIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCreateIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
