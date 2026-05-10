import { Component, inject } from '@angular/core';
import { SocialMediaService } from '../services/social-media.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [AsyncPipe],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts {
  private readonly socialMediaService = inject(SocialMediaService);

  showPosts = this.socialMediaService.showPosts;
  posts$ = this.socialMediaService.getPosts();
}
