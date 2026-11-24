import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';
import { IProject } from '../../../core/models/project.model';
import { environment } from '../../../../environments/environment';
import { ProjectModal } from './project-modal/project-modal';

@Component({
  selector: 'app-projects',
  imports: [ProjectModal],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private _projectsService = inject(ProjectsService);
  private cdr = inject(ChangeDetectorRef);

  private serverUrl = environment.apiUrl.replace(/\/api\/?$/, '');

  projects: IProject[] = [];
  searchTerm = '';

  isModalOpen = false;
  editingProject: IProject | null = null;

  get filteredProjects(): IProject[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.projects.filter((p) => p.title.toLowerCase().includes(term));
  }

  ngOnInit(): void {
    this._projectsService.getAllProjects().subscribe((data) => {
      this.projects = data;
      this.cdr.markForCheck();
    });
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  imageUrl(project: IProject): string {
    const url = project.coverImage?.url;
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return this.serverUrl + (url.startsWith('/') ? '' : '/') + encodeURI(url);
  }

  togglePublished(project: IProject): void {
    this._projectsService.setPublished(project._id, !project.isPublished).subscribe((updated) => {
      this.projects = this.projects.map((p) => (p._id === updated._id ? updated : p));
      this.cdr.markForCheck();
    });
  }

  toggleInHome(project: IProject): void {
    if (!project.isPublished) return;

    this._projectsService.setInHome(project._id, !project.inHome).subscribe((updated) => {
      this.projects = this.projects.map((p) => (p._id === updated._id ? updated : p));
      this.cdr.markForCheck();
    });
  }

  deleteProject(project: IProject): void {
    this._projectsService.deleteProject(project._id).subscribe(() => {
      this.projects = this.projects.filter((p) => p._id !== project._id);
      this.cdr.markForCheck();
    });
  }

  openAdd(): void {
    this.editingProject = null;
    this.isModalOpen = true;
  }

  openEdit(project: IProject): void {
    this.editingProject = project;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSaved(saved: IProject): void {
    this.projects = this.projects.some((p) => p._id === saved._id)
      ? this.projects.map((p) => (p._id === saved._id ? saved : p))
      : [...this.projects, saved];

    this.closeModal();
    this.cdr.markForCheck();
  }
}
