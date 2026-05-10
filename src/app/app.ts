import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SocialMediaService } from './services/social-media.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ed');

  private readonly socialMediaService = inject(SocialMediaService);
  showPosts = this.socialMediaService.showPosts;
  showComments = this.socialMediaService.showComments;

}
