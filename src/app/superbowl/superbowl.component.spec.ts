import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperbowlComponent } from './superbowl.component';

describe('SuperbowlComponent', () => {
  let component: SuperbowlComponent;
  let fixture: ComponentFixture<SuperbowlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperbowlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperbowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
