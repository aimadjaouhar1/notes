import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('@notes/web/app/features/notes/notes.component').then(c => c.NotesComponent)
    }
];
