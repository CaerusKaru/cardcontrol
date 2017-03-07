import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCreateBuildingComponent } from './manager-create-building.component';

describe('ManagerCreateBuildingComponent', () => {
  let component: ManagerCreateBuildingComponent;
  let fixture: ComponentFixture<ManagerCreateBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerCreateBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCreateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
