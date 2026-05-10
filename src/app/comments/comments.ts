import { Component, inject } from '@angular/core';
import { SocialMediaService } from '../services/social-media.service';

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  private readonly socialMediaService = inject(SocialMediaService);

  // Read the signal value in template or computed
  comments = this.socialMediaService.comments; // reference the signal
  showComments = this.socialMediaService.showComments;
}
