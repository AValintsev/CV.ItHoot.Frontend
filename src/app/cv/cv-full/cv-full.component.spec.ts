import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvFullComponent } from './cv-full.component';

describe('UserCvFullComponent', () => {
  let component: CvFullComponent;
  let fixture: ComponentFixture<CvFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
