import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Comments, Posts } from '../shared/interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private readonly http = inject(HttpClient);

  showComments = signal(false);
  showPosts = signal(false);

  comments = toSignal(this.http.get<Comments[]>('https://jsonplaceholder.typicode.com/comments'), {
    initialValue: [] as Comments[],
  });

  posts = toSignal(this.http.get<Posts[]>('https://jsonplaceholder.typicode.com/posts'), {
    initialValue: [] as Posts[],
  });
}
