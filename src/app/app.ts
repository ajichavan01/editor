import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SocialMediaService } from './services/social-media.service';
import { ProfileService } from './services/profile.service';
import { StoredProfile } from './shared/interface';
import { FormField, FormRoot, form, min, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, FormField, FormRoot, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ed');
  readonly profileModel = signal({
    name: '',
    age: 0,
    password: '',
  });
  readonly profileForm = form(this.profileModel, (profile) => {
    required(profile.name);
    min(profile.age, 1);
    required(profile.password);
    minLength(profile.password, 8);
  });
  readonly savedProfiles = signal<StoredProfile[]>([]);
  readonly formMessage = signal('');
  readonly isSavingProfile = signal(false);

  private readonly socialMediaService = inject(SocialMediaService);
  private readonly profileService = inject(ProfileService);
  showPosts = this.socialMediaService.showPosts;
  showComments = this.socialMediaService.showComments;

  togglePosts() {
    this.socialMediaService.togglePosts();
  }

  toggleComments() {
    this.socialMediaService.toggleComments();
  }

  submitProfile(event: SubmitEvent) {
    event.preventDefault();

    this.profileForm.name().markAsTouched();
    this.profileForm.age().markAsTouched();
    this.profileForm.password().markAsTouched();

    if (this.profileForm().invalid()) {
      this.formMessage.set('Fix the highlighted fields before submitting.');
      return;
    }

    this.isSavingProfile.set(true);
    this.formMessage.set('');

    this.profileService.createProfile(this.profileModel()).subscribe({
      next: (profile) => {
        this.savedProfiles.update((profiles) => [profile, ...profiles]);
        this.profileModel.set({ name: '', age: 0, password: '' });
        this.formMessage.set('Profile saved.');
        this.isSavingProfile.set(false);
      },
      error: () => {
        this.formMessage.set('Could not save profile. Make sure the API server is running.');
        this.isSavingProfile.set(false);
      },
    });
  }
}
