import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBuildingsComponent } from './manager-buildings.component';

describe('ManagerBuildingsComponent', () => {
  let component: ManagerBuildingsComponent;
  let fixture: ComponentFixture<ManagerBuildingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBuildingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
