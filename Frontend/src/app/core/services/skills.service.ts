import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ISkill } from '../models/skill.model';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private _http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/skill`;

  getAllSkills() {
    return this._http.get<ISkill[]>(this.apiURL);
  }

  addSkill(skill: Partial<ISkill>) {
    return this._http.post<ISkill>(this.apiURL, skill);
  }

  updateSkill(id: string, skill: Partial<ISkill>) {
    return this._http.patch<ISkill>(`${this.apiURL}/${id}`, skill);
  }

  deleteSkill(id: string) {
    return this._http.delete<{ message: string }>(`${this.apiURL}/${id}`);
  }
}
