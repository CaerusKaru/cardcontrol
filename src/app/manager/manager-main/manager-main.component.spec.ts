import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerHomeComponent } from './manager-main.component';

describe('ManagerHomeComponent', () => {
  let component: ManagerHomeComponent;
  let fixture: ComponentFixture<ManagerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
