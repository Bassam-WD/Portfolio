import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SkillsService } from '../../../core/services/skills.service';
import { ISkill } from '../../../core/models/skill.model';
import { SkillModal } from './skill-modal/skill-modal';

@Component({
  selector: 'app-skills',
  imports: [SkillModal],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  private _skillsService = inject(SkillsService);

  skills = signal<ISkill[]>([]);
  search = signal('');

  isModalOpen = signal(false);
  editingSkill = signal<ISkill | null>(null);

  filteredSkills = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.skills().filter((s) => s.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this._skillsService.getAllSkills().subscribe((data) => this.skills.set(data));
  }

  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  toggleVisibility(skill: ISkill): void {
    if (!skill._id) return;

    this._skillsService
      .updateSkill(skill._id, { isVisible: !skill.isVisible })
      .subscribe((updated) => {
        this.skills.update((list) => list.map((s) => (s._id === updated._id ? updated : s)));
      });
  }

  openAdd(): void {
    this.editingSkill.set(null);
    this.isModalOpen.set(true);
  }

  openEdit(skill: ISkill): void {
    this.editingSkill.set(skill);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onSaved(saved: ISkill): void {
    this.skills.update((list) =>
      list.some((s) => s._id === saved._id)
        ? list.map((s) => (s._id === saved._id ? saved : s))
        : [...list, saved],
    );
    this.closeModal();
  }

  deleteSkill(skill: ISkill): void {
    if (!skill._id) return;

    this._skillsService.deleteSkill(skill._id).subscribe(() => {
      this.skills.update((list) => list.filter((s) => s._id !== skill._id));
    });
  }
}
