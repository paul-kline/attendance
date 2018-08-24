import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerformComponent } from './organizerform.component';

describe('OrganizerformComponent', () => {
  let component: OrganizerformComponent;
  let fixture: ComponentFixture<OrganizerformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
