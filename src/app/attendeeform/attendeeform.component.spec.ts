import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeformComponent } from './attendeeform.component';

describe('AttendeeformComponent', () => {
  let component: AttendeeformComponent;
  let fixture: ComponentFixture<AttendeeformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeeformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
