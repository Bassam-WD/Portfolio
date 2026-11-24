import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/models/profile.model';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class Public implements OnInit {
  private _profileService = inject(ProfileService);
  profileData = signal<IProfile | null>(null);

  ngOnInit(): void {
    this._profileService.getProfileData().subscribe((res) => {
      this.profileData.set(res);
    });
  }
}
