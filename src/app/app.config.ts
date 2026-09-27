import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { loadingInterceptorTsInterceptor } from './core/interceptors/loading.interceptor';
import { myLoadingInterceptor } from './core/interceptors/my-loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(NgxSpinnerModule), provideRouter(routes), MessageService, provideClientHydration(), provideAnimations(),
    // provideHttpClient(withFetch()),
     provideHttpClient(withFetch(), withInterceptors([myLoadingInterceptor]))
  ],
};
