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
import { DoctorReportViewComponent } from './doctor-report-view/doctor-report-view.component';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { CompletedReportsComponent } from './completed-reports/completed-reports.component';
import { PrintReportComponent } from './print-report/print-report.component';
import { AdminReportPageComponent } from './admin-report-page/admin-report-page.component';
import { DataTableModule } from 'angular5-data-table';
import {NgxPrintModule} from 'ngx-print';
import { TotaluserComponentComponent } from './totaluser-component/totaluser-component.component';
import { TotaldoctorCOmponentComponent } from './totaldoctor-component/totaldoctor-component.component';
import { TotaluploadsComponentComponent } from './totaluploads-component/totaluploads-component.component';
import { TotalCompletedReportsComponent } from './total-completed-reports/total-completed-reports.component';
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
    WaitingReportComponent,
    DoctorReportViewComponent,
    CompletedReportsComponent,
    PrintReportComponent,
    AdminReportPageComponent,
    TotaluserComponentComponent,
    TotaldoctorCOmponentComponent,
    TotaluploadsComponentComponent,
    TotalCompletedReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule,
    NgxPrintModule
  

  ],
  providers: [
    AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
