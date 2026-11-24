import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects.service';
import { IProject } from '../../../core/models/project.model';
import { ProjectCard } from '../shared/project-card/project-card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private _projectsService = inject(ProjectsService);

  private publishedProjects = signal<IProject[]>([]);
  selectedTech = signal<string>('All');
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(true);

  // استخراج كل التقنيات الفريدة من المشاريع المنشورة للفلترة
  technologies = computed<string[]>(() => {
    const allTechs = this.publishedProjects().flatMap((p) => p.techStack ?? []);
    return ['All', ...Array.from(new Set(allTechs))];
  });

  
  filteredProjects = computed<IProject[]>(() => {
    const activeTech = this.selectedTech();
    const query = this.searchQuery().trim().toLowerCase();

    return this.publishedProjects().filter((project) => {
      const matchesTech =
        activeTech === 'All' || (project.techStack?.includes(activeTech) ?? false);

      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        (project.techStack?.some((t) => t.toLowerCase().includes(query)) ?? false);

      return matchesTech && matchesSearch;
    });
  });

  ngOnInit(): void {
    this.loadAllPublishedProjects();
  }

  private loadAllPublishedProjects(): void {
    this._projectsService.getAllProjects().subscribe({
      next: (projects) => {
        this.publishedProjects.set(projects.filter((p) => p.isPublished));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading all projects:', err);
        this.isLoading.set(false);
      },
    });
  }

  selectTech(tech: string): void {
    this.selectedTech.set(tech);
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }
}
