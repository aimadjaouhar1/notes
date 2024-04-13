import {
  APP_INITIALIZER,
  ApplicationConfig,
  Injector,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  provideTranslation,
  translateAppInitializerFactory,
} from './_core/config/translation.config';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { notesReducer, NoteEffects } from './store/notes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(NoteEffects),
    provideStore({ notes: notesReducer }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    {
      provide: APP_INITIALIZER,
      useFactory: translateAppInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
  ],
};
