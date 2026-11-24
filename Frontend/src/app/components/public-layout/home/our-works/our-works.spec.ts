import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurWorks } from './our-works';

describe('OurWorks', () => {
  let component: OurWorks;
  let fixture: ComponentFixture<OurWorks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurWorks],
    }).compileComponents();

    fixture = TestBed.createComponent(OurWorks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
