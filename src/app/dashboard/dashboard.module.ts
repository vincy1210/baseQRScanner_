import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { UserslistComponent } from './userslist/userslist.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { PhoneMaskDirective } from '../phone-mask.directive';
import { PhoneMaskDirective } from './userslist/phone-mask.directive';
import { EidFormatterPipe } from '../eid-formatter.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { PayallComponent } from './payall/payall.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatChipsModule } from '@angular/material/chips';
import { TagModule } from 'primeng/tag';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuard } from '../auth.guard';
import { MatButtonModule } from '@angular/material/button';
import { PdfExportComponent } from './pdf-export/pdf-export.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GlossaryComponent } from './glossary/glossary.component';

 import { MatCardModule } from '@angular/material/card';
 import { MatExpansionModule } from '@angular/material/expansion';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { role: ['Admin', 'User'], name: 'dashboard' },
    canActivate: [AuthGuard],
  },
  {
    path: 'userslist',
    component: UserslistComponent,
    data: { role: ['Admin', 'User'], name: 'userslist' },
    canActivate: [AuthGuard],
  },
  {
    path: 'payall',
    component: PayallComponent,
    data: { role: ['Admin', 'User'], name: 'payall' },
    canActivate: [AuthGuard],
  },
  {
    path: 'companyprofile',
    component: CompanyProfileComponent,
    data: { role: ['Admin', 'User'], name: 'companyprofile' },
    canActivate: [AuthGuard],
  },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    data: { role: ['Admin', 'User'], name: 'userprofile' },
    canActivate: [AuthGuard],
  },
  {
    path: 'glossary',
    component: GlossaryComponent,
    data: { role: ['Admin', 'User'], name: 'glossary' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    PayallComponent,
    DashboardComponent,
    UserslistComponent,
    PhoneMaskDirective,
    EidFormatterPipe,
    CompanyProfileComponent, PdfExportComponent, UserProfileComponent, GlossaryComponent
    
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    TagModule,
    MatChipsModule,
    PdfViewerModule,
    MatTabsModule,
    RouterModule,
    TableModule,
    ToolbarModule,
    MatDatepickerModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    TranslateModule,
    MatRadioModule,
    TooltipModule,
    CommonModule,
    ConfirmDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    NgxEchartsModule,MatExpansionModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
  exports: [PhoneMaskDirective],
})
export class DashboardModule {}
