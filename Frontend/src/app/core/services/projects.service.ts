import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProject } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private _http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/projects`;

  getAllProjects() {
    return this._http.get<IProject[]>(this.apiURL);
  }

  addProject(data: FormData) {
    return this._http.post<IProject>(this.apiURL, data);
  }

  updateProject(id: string, data: FormData) {
    return this._http.patch<IProject>(`${this.apiURL}/${id}`, data);
  }

  setPublished(id: string, isPublished: boolean) {
    return this._http.patch<IProject>(`${this.apiURL}/${id}`, { isPublished });
  }

  setInHome(id: string, inHome: boolean) {
    return this._http.patch<IProject>(`${this.apiURL}/${id}`, { inHome });
  }

  deleteProject(id: string) {
    return this._http.delete<{ message: string }>(`${this.apiURL}/${id}`);
  }
}
