import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAreasComponent } from './manager-areas.component';

describe('ManagerAreasComponent', () => {
  let component: ManagerAreasComponent;
  let fixture: ComponentFixture<ManagerAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
