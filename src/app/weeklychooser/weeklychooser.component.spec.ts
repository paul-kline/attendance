import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklychooserComponent } from './weeklychooser.component';

describe('WeeklychooserComponent', () => {
  let component: WeeklychooserComponent;
  let fixture: ComponentFixture<WeeklychooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklychooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklychooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
