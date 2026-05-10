import { Component, inject } from '@angular/core';
import { SocialMediaService } from '../services/social-media.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [AsyncPipe],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  private readonly socialMediaService = inject(SocialMediaService);

  // Read the signal value in template or computed
  comments$ = this.socialMediaService.getComments(); // reference the signal
  showComments = this.socialMediaService.showComments;
}
