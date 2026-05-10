import { Component, inject } from '@angular/core';
import { SocialMediaService } from '../services/social-media.service';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts {
  private readonly socialMediaService = inject(SocialMediaService);

  showPosts = this.socialMediaService.showPosts;
  posts = this.socialMediaService.posts;
}
