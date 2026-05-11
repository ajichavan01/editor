import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
  readonly profileForm = form(
    this.profileModel,
    (profile) => {
      required(profile.name, { message: 'Name is required.' });
      min(profile.age, 1, { message: 'Age must be at least 1.' });
      required(profile.password, { message: 'Password is required.' });
      minLength(profile.password, 8, {
        message: 'Password must be at least 8 characters.',
      });
    },
    {
      submission: {
        action: async (profileForm) => {
          this.isSavingProfile.set(true);
          const profileValue = profileForm().value();
          const { isSamePassword } = await firstValueFrom(
            this.profileService.checkPasswordReuse({
              name: profileValue.name,
              password: profileValue.password,
            })
          );

          if (isSamePassword) {
            this.isSavingProfile.set(false);
            return [
              {
                fieldTree: profileForm.password,
                kind: 'server',
                message: 'New password cannot be same as existing.',
              },
            ];
          }

          const profile = await firstValueFrom(this.profileService.createProfile(profileValue));
          this.savedProfiles.update((profiles) => [profile, ...profiles]);
          this.profileModel.set({ name: '', age: 0, password: '' });
          this.formMessage.set('Profile saved.');
          this.isSavingProfile.set(false);
          return undefined;
        },
        onInvalid: () => {
          this.profileForm.name().markAsTouched();
          this.profileForm.age().markAsTouched();
          this.profileForm.password().markAsTouched();
          this.formMessage.set('Fix the highlighted fields before submitting.');
        },
      },
    }
  );
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
}
