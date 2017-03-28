import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMainComponent } from './manager-main.component';

describe('ManagerMainComponent', () => {
  let component: ManagerMainComponent;
  let fixture: ComponentFixture<ManagerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
