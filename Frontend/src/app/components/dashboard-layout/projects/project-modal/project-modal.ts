import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../core/services/projects.service';
import { IProject } from '../../../../core/models/project.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-project-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.css',
})
export class ProjectModal implements OnInit {
  private _projectsService = inject(ProjectsService);
  private serverUrl = environment.apiUrl.replace(/\/api\/?$/, '');

  techStack = signal<string[]>([]);
  previewUrl = signal('');
  coverError = signal(false);
  isSaving = signal(false);

  private coverFile: File | null = null;
  private blobUrl = '';

  techInput = new FormControl('', { nonNullable: true });

  projectForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    shortDescription: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(160)],
    }),
    fullDescription: new FormControl('', { nonNullable: true }),
    liveUrl: new FormControl('', { nonNullable: true }),
    githubUrl: new FormControl('', { nonNullable: true }),
    isPublished: new FormControl(false, { nonNullable: true }),
    inHome: new FormControl(false, { nonNullable: true }),
  });

  @Input() project: IProject | null = null;
  @Output() saved = new EventEmitter<IProject>();
  @Output() closed = new EventEmitter<void>();

  ngOnInit(): void {
    this.projectForm.controls.isPublished.valueChanges.subscribe((published) => {
      const inHomeCtrl = this.projectForm.controls.inHome;
      if (!published) {
        inHomeCtrl.setValue(false);
        inHomeCtrl.disable();
      } else {
        inHomeCtrl.enable();
      }
    });

    const p = this.project;
    if (!p) {
      this.projectForm.controls.inHome.disable();
      return;
    }

    this.projectForm.reset({
      title: p.title,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription ?? '',
      liveUrl: p.liveUrl ?? '',
      githubUrl: p.githubUrl ?? '',
      isPublished: p.isPublished,
      inHome: p.isPublished ? p.inHome : false,
    });

    if (!p.isPublished) {
      this.projectForm.controls.inHome.disable();
    }

    this.techStack.set(p.techStack ?? []);

    const url = p.coverImage?.url;
    if (url) this.previewUrl.set(this.serverUrl + url);
  }

  addTech(event: Event): void {
    event.preventDefault();
    const value = this.techInput.value.trim();
    if (value && !this.techStack().includes(value)) {
      this.techStack.update((list) => [...list, value]);
    }
    this.techInput.reset('');
  }

  removeTech(tech: string): void {
    this.techStack.update((list) => list.filter((t) => t !== tech));
  }

  onCoverSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.coverFile = file;
    if (!file) return;

    if (this.blobUrl) URL.revokeObjectURL(this.blobUrl);
    this.blobUrl = URL.createObjectURL(file);
    this.previewUrl.set(this.blobUrl);
    this.coverError.set(false);
  }


  save(): void {
    const current = this.project;
    const missingCover = !current && !this.coverFile;

    if (this.projectForm.invalid || missingCover) {
      this.projectForm.markAllAsTouched();
      this.coverError.set(missingCover);
      return;
    }

    const v = this.projectForm.getRawValue();
    const data = new FormData();

    data.append('title', v.title);
    data.append('shortDescription', v.shortDescription);
    data.append('fullDescription', v.fullDescription);
    data.append('liveUrl', v.liveUrl);
    data.append('githubUrl', v.githubUrl);
    data.append('isPublished', String(v.isPublished));
    data.append('inHome', String(v.inHome));

    this.techStack().forEach((tech) => data.append('techStack', tech));

    if (this.coverFile) data.append('coverImage', this.coverFile);

    const request$ = current
      ? this._projectsService.updateProject(current._id, data)
      : this._projectsService.addProject(data);

    this.isSaving.set(true);
    request$.subscribe({
      next: (result) => this.saved.emit(result),
      error: () => this.isSaving.set(false),
    });
  }
}
