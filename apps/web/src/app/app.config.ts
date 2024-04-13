import { APP_INITIALIZER, ApplicationConfig, Injector, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideTranslation, translateAppInitializerFactory } from './_core/config/translation.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    {
      provide: APP_INITIALIZER,
      useFactory: translateAppInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
};
