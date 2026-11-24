import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../../core/services/projects.service';
import { IProject } from '../../../../core/models/project.model';
import { ProjectCard } from '../../shared/project-card/project-card';
@Component({
  selector: 'app-our-works',
  standalone: true,
  imports: [RouterLink, ProjectCard],
  templateUrl: './our-works.html',
  styleUrl: './our-works.css',
})
export class OurWorksComponent implements OnInit {
  private _projectsService = inject(ProjectsService);

  homeProjects: IProject[] = [];

  ngOnInit(): void {
    this.loadFeaturedWorks();
  }

  private loadFeaturedWorks(): void {
    this._projectsService.getAllProjects().subscribe({
      next: (res: any) => {
        const allProjects: IProject[] = Array.isArray(res) ? res : (res.data ?? []);

        const published = allProjects.filter((p) => p.isPublished);
        const inHome = published.filter((p: any) => p.inHome);

        this.homeProjects = (inHome.length > 0 ? inHome : []).slice(0, 6);
      },
      error: (err) => {
        console.error('Error loading featured works:', err);
      },
    });
  }
}
