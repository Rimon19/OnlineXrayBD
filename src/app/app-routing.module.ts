import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { WaitingReportComponent } from './waiting-report/waiting-report.component';
import { DoctorReportViewComponent } from './doctor-report-view/doctor-report-view.component';
import { CompletedReportsComponent } from './completed-reports/completed-reports.component';
import { PrintReportComponent } from './print-report/print-report.component';
import { AdminReportPageComponent } from './admin-report-page/admin-report-page.component';
import { TotaldoctorCOmponentComponent } from './totaldoctor-component/totaldoctor-component.component';
import { TotaluserComponentComponent } from './totaluser-component/totaluser-component.component';
import { TotaluploadsComponentComponent } from './totaluploads-component/totaluploads-component.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent
  },
  {
    path: 'doctor-dashboard',
    component: DoctorDashboardComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'create-doctor',
    component: CreateDoctorComponent
  },
  {
    path: 'upload-image',
    component: UploadImageComponent
  },
  {
    path: 'upload-image/:id',
    component: UploadImageComponent
  },
  {
    path: 'waiting-report',
    component: WaitingReportComponent
  },
  {
    path: 'doctor_report_view/:id',
    component: DoctorReportViewComponent
  },
  {
    path: 'complete-reports',
    component: CompletedReportsComponent
  }
  ,
  {
    path: 'print-report',
    component: PrintReportComponent
  },
  {
    path: 'print-report/:id',
    component: PrintReportComponent
  },
  {
    path: 'admin-report',
    component: AdminReportPageComponent
  },
  {
    path: 'app-totaldoctor-component',
    component: TotaldoctorCOmponentComponent
  },
  {
    path: 'app-totaluser-component',
    component: TotaluserComponentComponent
  }
  ,
  {
    path: 'app-totaluploads-component',
    component: TotaluploadsComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
