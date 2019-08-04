import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { WaitingReportComponent } from './waiting-report/waiting-report.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    DoctorDashboardComponent,
    LoginComponent,
    SignUpComponent,
    CreateUserComponent,
    CreateDoctorComponent,
    UploadImageComponent,
    WaitingReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
