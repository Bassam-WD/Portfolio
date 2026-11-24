import { Component, Input } from '@angular/core';
import { IProject } from '../../../../core/models/project.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input({ required: true }) project!: IProject;
  serverUrl = environment.serverUrl;

  get proj(): any {
    return this.project;
  }

  get thumbnailUrl(): string | null {
    const img = this.proj?.thumbnail?.url || this.proj?.image?.url || this.proj?.coverImage?.url;
    return img ? this.serverUrl + img : null;
  }

  get categoryName(): string {
    const cat = this.proj?.category;
    if (!cat) return '';
    return typeof cat === 'object' ? cat.name : cat;
  }

  get techList(): string[] {
    const list = this.proj?.technologies || this.proj?.techStack || [];
    return list.map((t: any) => (typeof t === 'object' ? t.name : t));
  }
}
