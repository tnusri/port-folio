import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyFooter } from './journey-footer';

describe('JourneyFooter', () => {
  let component: JourneyFooter;
  let fixture: ComponentFixture<JourneyFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
