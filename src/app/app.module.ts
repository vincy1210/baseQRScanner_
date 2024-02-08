import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { RegistrationComponent } from './registration/registration.component';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { ToolbarModule } from 'primeng/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {RecaptchaModule,
  RECAPTCHA_SETTINGS,RecaptchaSettings,RecaptchaFormsModule,RECAPTCHA_V3_SITE_KEY,RecaptchaV3Module,} from 'ng-recaptcha';
import { DialogModule } from 'primeng/dialog';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalPopupService } from 'src/service/modal-popup.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { LeftMenuDrawerComponent } from './shared/components/left-menu-drawer/left-menu-drawer.component';
import { AttestationWorkflowComponent } from './shared/components/attestation-workflow/attestation-workflow.component';

import { TagModule } from 'primeng/tag';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
const RECAPTCHA_V3_STACKBLITZ_KEY = environment.recaptcha.siteKey;
const RECAPTCHA_V2_DUMMY_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { AuthGuard } from './auth.guard';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PdfExportComponent } from './shared/components/pdf-export/pdf-export.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TrimInputDirective } from './trim-input.directive';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimingInterceptor } from '../assets/BasicAuthInterceptor'

import {StepsModule} from 'primeng/steps';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// import { PdfExportComponent } from './shared/components/pdf-export/pdf-export.component';

// Define the custom date format
const customDateFormats: MatDateFormats = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [PdfExportComponent,
    AppComponent,
    ErrorComponent,
    LeftMenuDrawerComponent,
    AttestationWorkflowComponent,
    LoginComponent,
    UnauthorizedComponent,
    PageNotFoundComponent,
    TrimInputDirective,
    // PdfExportComponent

  ],

  imports: [
    NgIdleKeepaliveModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RecaptchaModule,
    NgxOtpInputModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatMenuModule,
    LayoutModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    PdfViewerModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    TagModule,
    NgIdleKeepaliveModule,
    TabViewModule,StepsModule,ZXingScannerModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    MatNativeDateModule,
    MatMomentDateModule,
    MatDialogModule,MatAutocompleteModule, MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimingInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: customDateFormats,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },

    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: RECAPTCHA_V2_DUMMY_KEY,
      } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: RECAPTCHA_V3_STACKBLITZ_KEY,
    },

    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ModalPopupService,
    DatePipe,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  // exports: [
  //   PhoneMaskDirective
  // ],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
