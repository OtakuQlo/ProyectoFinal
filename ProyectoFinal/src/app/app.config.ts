import { ApplicationConfig, NgModule, NgModuleRef, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ApiTestService } from './Services/api-test.service';

import { HttpClientModule } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  
  providers: [provideRouter(routes), ApiTestService, importProvidersFrom(HttpClientModule)]
};
