import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { rootReducer } from './reducers';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { JwtinterceptorService } from './interceptors/jwtinterceptor.service';
import { JwtUnauthorizedInterceptorService } from './interceptors/jwt-unauthorized-interceptor.service';
import { TeamSizeValidatorDirective } from './directives/team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from './directives/client-location-status-validator.directive';
import { ProjectIdUniqueValidatorDirective } from './directives/project-id-unique-validator.directive';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StoreModule } from '@ngrx/store';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    NotFoundComponent,
    ProjectsComponent,
    LoginComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIdUniqueValidatorDirective,
    SignUpComponent,
    ProjectComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return (sessionStorage.getItem("currentUser") ?
            JSON.parse(sessionStorage.getItem("currentUser") as string).token :
            null)
        }
      }
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }), // ToastrModule added
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtinterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnauthorizedInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
