import { Component, Input } from '@angular/core';
import { IProfile } from '../../../../core/models/profile.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  @Input() profileData: IProfile | null = null;
  serverUrl = environment.serverUrl;
}
