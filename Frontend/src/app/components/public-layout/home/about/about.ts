import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProfile } from '../../../../core/models/profile.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  @Input() profileData: IProfile | null = null;
  serverUrl = environment.serverUrl;
}
