import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillModal } from './skill-modal';

describe('SkillModal', () => {
  let component: SkillModal;
  let fixture: ComponentFixture<SkillModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
