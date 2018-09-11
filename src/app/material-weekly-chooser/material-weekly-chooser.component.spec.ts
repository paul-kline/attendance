import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialWeeklyChooserComponent } from './material-weekly-chooser.component';

describe('MaterialWeeklyChooserComponent', () => {
  let component: MaterialWeeklyChooserComponent;
  let fixture: ComponentFixture<MaterialWeeklyChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialWeeklyChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialWeeklyChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
