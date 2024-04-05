import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectsModule } from './projects/projects.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TasksModule } from './tasks/tasks.module';
import { SharedModule } from './shared/shared.module';

import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';

import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import awsconfig from '../aws-exports';
import { ServiceWorkerModule } from '@angular/service-worker';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AmplifyAuthenticatorModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProjectsModule,
    BrowserAnimationsModule,
    MaterialModule,
    TasksModule,
    SharedModule,
    MatMenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }
