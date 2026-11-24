import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile.service';
import { IProfile } from '../../../core/models/profile.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit, OnDestroy {
  private _profileService = inject(ProfileService);
  private serverUrl = environment.apiUrl.replace(/\/api\/?$/, '');
  private blobUrl = '';

  imagePreviewUrl = signal<string>('');
  cvFileName = signal<string>('');
  isSaving = signal<boolean>(false);
  saveSuccess = signal<boolean>(false);

  profileForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    jobTitle: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    location: new FormControl('', { nonNullable: true }),
    shortBio: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    about: new FormControl('', { nonNullable: true }),
    githubUrl: new FormControl('', { nonNullable: true }),
    linkedinUrl: new FormControl('', { nonNullable: true }),
    contactEmail: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    isAvailable: new FormControl(false, { nonNullable: true }),
    profileImage: new FormControl<File | null>(null),
    cvFile: new FormControl<File | null>(null),
  });

  ngOnInit(): void {
    this._profileService.getProfileData().subscribe((profileData: IProfile) => {
      this.profileForm.reset({
        name: profileData.name ?? '',
        jobTitle: profileData.jobTitle ?? '',
        location: profileData.location ?? '',
        shortBio: profileData.shortBio ?? '',
        about: profileData.about ?? '',
        githubUrl: profileData.socialLinks?.github ?? '',
        linkedinUrl: profileData.socialLinks?.linkedin ?? '',
        contactEmail: profileData.contactEmail ?? '',
        isAvailable: profileData.isAvailable ?? false,
        profileImage: null,
        cvFile: null,
      });

      const imgUrl = profileData.profileImage?.url;
      if (imgUrl) {
        this.imagePreviewUrl.set(
          imgUrl.startsWith('http')
            ? imgUrl
            : `${this.serverUrl}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`,
        );
      }

      const existingCv = profileData.cvFile?.name || profileData.cvFile?.url;
      if (existingCv) {
        this.cvFileName.set(existingCv.split('/').pop() ?? existingCv);
      }
    });
  }

  onSave(): void {
    const v = this.profileForm.getRawValue();
    const myData = new FormData();

    myData.append('name', v.name);
    myData.append('jobTitle', v.jobTitle);
    myData.append('location', v.location);
    myData.append('shortBio', v.shortBio);
    myData.append('about', v.about);
    myData.append('isAvailable', String(v.isAvailable));

    myData.append('socialLinks[github]', v.githubUrl);
    myData.append('socialLinks[linkedin]', v.linkedinUrl);
    myData.append('contactEmail', v.contactEmail);

    if (v.profileImage) myData.append('profileImage', v.profileImage);
    if (v.cvFile) myData.append('cvFile', v.cvFile);

    this.isSaving.set(true);
    this.saveSuccess.set(false);

    this._profileService.updateProfile(myData).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.saveSuccess.set(true);
        setTimeout(() => this.saveSuccess.set(false), 3000);
      },
      error: (err) => {
        console.error(err);
        this.isSaving.set(false);
      },
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.profileForm.patchValue({ profileImage: file });
    if (!file) return;

    if (this.blobUrl) URL.revokeObjectURL(this.blobUrl);
    this.blobUrl = URL.createObjectURL(file);
    this.imagePreviewUrl.set(this.blobUrl);
  }

  onCvSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.profileForm.patchValue({ cvFile: file });
    if (file) {
      this.cvFileName.set(file.name);
    }
  }

  ngOnDestroy(): void {
    if (this.blobUrl) URL.revokeObjectURL(this.blobUrl);
  }
}
