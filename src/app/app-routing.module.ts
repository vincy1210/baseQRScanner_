import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegistrationComponent } from './registration/registration.component';
import { AttestationWorkflowComponent } from './shared/components/attestation-workflow/attestation-workflow.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { PdfExportComponent } from './shared/components/pdf-export/pdf-export.component';
import { PdfExportComponent } from './shared/components/pdf-export/pdf-export.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'attestationworkflow',
    component: AttestationWorkflowComponent,
    data: { role: ['Admin', 'User'] },
  },
  {
    path: 'pdfexport',
    component: PdfExportComponent,
    data: { role: ['Admin', 'User'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: ErrorComponent },
  {
    path: 'shared',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  } ,
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
