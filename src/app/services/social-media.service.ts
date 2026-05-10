import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Comments, Posts } from '../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private readonly apiBaseUrl = 'http://localhost:8080/api';
  private readonly http = inject(HttpClient);

  private commentsRequest$?: Observable<Comments[]>;
  private postsRequest$?: Observable<Posts[]>;

  showComments = signal(false);
  showPosts = signal(false);

  comments = signal<Comments[]>([]);
  posts = signal<Posts[]>([]);

  toggleComments() {
    this.showComments.update((value) => !value);
  }

  togglePosts() {
    this.showPosts.update((value) => !value);
  }

  getComments(): Observable<Comments[]> {
    if (!this.commentsRequest$) {
      this.commentsRequest$ = this.http
        .get<Comments[]>(`${this.apiBaseUrl}/comments`)
        .pipe(
          tap((comments) => {
            this.comments.set(comments);
          }),
          shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    return this.commentsRequest$;
  }

  getPosts(): Observable<Posts[]> {
    if (!this.postsRequest$) {
      this.postsRequest$ = this.http
        .get<Posts[]>(`${this.apiBaseUrl}/posts`)
        .pipe(
          tap((posts) => {
            this.posts.set(posts);
          }),
          shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    return this.postsRequest$;
  }
}
