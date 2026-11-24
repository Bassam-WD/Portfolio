import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProfile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiURL = `${environment.apiUrl}/profile`;
  private _http = inject(HttpClient);

  // Get profile data
  getProfileData() {
    return this._http.get<IProfile>(this.apiURL);
  }

  // profile Edit add
  updateProfile(profileData: FormData) {
    return this._http.patch<IProfile>(this.apiURL, profileData);
  }
}
