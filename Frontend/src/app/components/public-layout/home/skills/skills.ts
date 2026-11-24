import { Component, OnInit, inject, signal } from '@angular/core';
import { SkillsService } from '../../../../core/services/skills.service';
import { ISkill } from '../../../../core/models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent implements OnInit {
  private _skillsService = inject(SkillsService);

  visibleSkills = signal<ISkill[]>([]);

  ngOnInit(): void {
    this.loadSkills();
  }

  private loadSkills(): void {
    this._skillsService.getAllSkills().subscribe({
      next: (skills) => {
        this.visibleSkills.set(skills.filter((s) => s.isVisible));
      },
      error: (err) => {
        console.error('Error loading skills:', err);
      },
    });
  }

 
  isImageUrl(icon?: string): boolean {
    if (!icon) return false;
    return icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('assets/');
  }
}
