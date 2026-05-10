import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'comments',
        loadComponent: () => import('./comments/comments').then(m => m.Comments) 
    },
    {
        path: 'posts',
        loadComponent: () => import('./posts/posts').then(m => m.Posts)
    }
];
