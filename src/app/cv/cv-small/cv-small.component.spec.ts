import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvSmallComponent } from './cv-small.component';

describe('UserCvSmallComponent', () => {
  let component: CvSmallComponent;
  let fixture: ComponentFixture<CvSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
