import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillsService } from '../../../../core/services/skills.service';
import { ISkill } from '../../../../core/models/skill.model';

@Component({
  selector: 'app-skill-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './skill-modal.html',
  styleUrl: './skill-modal.css',
})
export class SkillModal implements OnInit {
  private _skillsService = inject(SkillsService);

  skill = input<ISkill | null>(null);
  saved = output<ISkill>();
  closed = output<void>();

  skillForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    isVisible: new FormControl(true, { nonNullable: true }),
  });

  ngOnInit(): void {
    const s = this.skill();
    if (s) this.skillForm.reset({ name: s.name, isVisible: s.isVisible });
  }

  save(): void {
    if (this.skillForm.invalid) {
      this.skillForm.markAllAsTouched();
      return;
    }

    const data = this.skillForm.getRawValue();
    const current = this.skill();

    const request$ = current?._id
      ? this._skillsService.updateSkill(current._id, data)
      : this._skillsService.addSkill(data);

    request$.subscribe((result) => this.saved.emit(result));
  }
}
