import { Component, OnInit, inject, signal } from '@angular/core';
import { Hero } from './hero/hero';
import { ProfileService } from '../../../core/services/profile.service';
import { IProfile } from '../../../core/models/profile.model';
import { About } from './about/about';
import { OurWorksComponent } from './our-works/our-works';
import { SkillsComponent } from './skills/skills';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, OurWorksComponent, SkillsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private _profileService = inject(ProfileService);

  profileData = signal<IProfile | null>(null);

  ngOnInit(): void {
    this._profileService.getProfileData().subscribe((res) => {
      this.profileData.set(res);
    });
  }
}
