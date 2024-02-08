import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  VERSION,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/service/common.service';
import { MenuItem } from 'primeng/api';

import { MessageService } from 'primeng/api';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { BarcodeFormat } from '@zxing/library';
import { ApiService } from 'src/service/api.service';
import { AuthService } from 'src/service/auth.service';
import { ConstantsService } from 'src/service/constants.service';
import { TranslateService } from '@ngx-translate/core';
import { QRCodeType } from '../shared/models/filetype-model';
import { catchError, throwError } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  items: MenuItem[];
  activeIndex: number = 0;
  edasreqno = '';
  desiredDevice: any;
  torch = false;
  scannerEnabled = true;
  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
  ];
  uuid: string = '1222';
  isSearchResult: boolean = false;
  searchResults: QRCodeType[] = [];
  isMaximized: boolean = false;
  IsFileFound: boolean = false;
  src: string = '';
  fileContentEncode: any;
  isLoading: boolean = false;
  showLockScreen: boolean = true;
  showLockScreenText: string = '';
  allowScanning = true;
  isScanned: boolean = false;
  private permissionCheckInterval: any;
  public cameraPermissionGranted = false;
  @ViewChild('stepbody') stepbody!: ElementRef;
  @ViewChild('videocontrol') videocontrol!: ElementRef;

  constructor(
    private router: Router,
    private apiservice: ApiService,
    public common: CommonService,
    private consts: ConstantsService,
    private auth: AuthService,
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    sessionStorage.setItem('token', '');
    this.items = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
      { label: 'Step 4' },
    ];
  }
  indexchange(event: any) {
    // console.log(event);
  }
  scanNow() {
    // Add your scan logic here
    console.log('Scanning now...');
  }

  goToPrevstep(number: number) {
    this.activeIndex = number;
    if (this.activeIndex < 2) {
      this.clear(false);
    }
  }

  clear(isScanned: boolean = false) {
    this.edasreqno = '';
    this.isScanned = isScanned;
    this.isSearchResult = false;
  }

  goToNextstep(number: number) {
    // this.activeIndex = 1;
    if (this.activeIndex === 1) {
      this.activeIndex += 1;
    } else if (this.activeIndex < 3) {
      this.activeIndex = number; // this.activeIndex + 1;
    } else if (this.activeIndex === 3) {
      this.activeIndex = 0;
      this.clear();
    }
    //
    if (this.activeIndex > 3) {
      this.activeIndex = 3;
    }
  }

  ngOnInit(): void {
    if (!this.common.isMobile() && !this.common.isTablet()) {
      // this.common.showSweetAlert('Warning', 'Open in mobile device');
      this.showLockScreen = true;
      this.showLockScreenText = this.translate.instant('ServiceProvidedMofa');
    } else {
      this.showLockScreen = false;
      // this.checkCameraPermissions();
    }
  }

  scanSuccessHandler(event: any) {
    // console.log(event);
    if (this.allowScanning) {
      this.isScanned = true;
      this.edasreqno = event;
      const inValidList: string[] = this.isValidCriterias(this.edasreqno);
      if (inValidList && inValidList.length > 0) {
        this.clear(true);
        const inValidMsg: string = inValidList.at(0) || '';
        // this.common.showErrorMessage(inValidMsg);
        this.scrollToBottom();
      } else {
        this.getDocDataForQRcode();
        //
        this.allowScanning = false;
        setTimeout(() => {
          this.allowScanning = true;
        }, 4000);
      }
    }
  }

  onPermissionResponse(permission: boolean): void {
    if (permission) {
      // console.log('Camera permission granted.');
      this.cameraPermissionGranted = true;
    } else {
      console.error('Camera permission denied.');
      this.cameraPermissionGranted = false;
    }
    if (!this.cameraPermissionGranted) {
      this.checkCameraPermissions();
    }
  }

  checkCameraPermissions() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.cameraPermissionGranted = true;
      })
      .catch((error) => {
        this.cameraPermissionGranted = false;
        this.showLockScreen = true;
        this.showLockScreenText = this.translate.instant('CameraNotGranted');
        // this.common.showSweetAlert(
        //   'Warning',
        //   'Camera access is not granted. Please allow access and refresh the page'
        // );
      });
    //
    this.clearIntervals();
  }

  scanErrorHandler(event: any) {
    // console.log(event);
  }

  scanFailureHandler(event: any) {
    // console.log(event);
  }

  scanCompleteHandler(event: any) {
    // console.log(event);
  }

  handleError(error: any) {
    // console.error('ZXing Scanner Error:', error);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    // console.log(devices);
    if (devices && devices.length > 0) {
      // Cameras found, enable scanning
      this.scannerEnabled = true;
    } else {
      // No cameras found, disable scanning
      this.scannerEnabled = false;
    }
  }

  isValidCriterias(edasreqno: string): string[] {
    const inValidList: string[] = [];
    const startList: string[] = ['AECI', 'COO', 'LCC'];
    if (edasreqno.length > 25) {
      inValidList.push('Size exceeds');
    }
    if (edasreqno.length > 5) {
      const searchString = edasreqno.substring(0, 3);
      const isInclude: boolean = startList.some((item) =>
        item.includes(searchString)
      );
      if (!isInclude) {
        inValidList.push('Not valid request');
      }
    }
    if (edasreqno.length <= 5) {
      inValidList.push('Too short');
    }
    return inValidList;
  }

  getDocDataForQRcode() {
    this.isSearchResult = false;
    let resp;
    let data = {
      uuid: this.uuid,
      edasreqno: this.edasreqno,
    };
    this.common.showLoading();
    this.apiservice.post(this.consts.getDocDataForQRcode, data).subscribe({
      next: (success: any) => {
        this.common.hideLoading();
        resp = success;
        if (`${resp.responsecode}` == '1') {
          this.searchResults = resp.data;
          if (this.searchResults && this.searchResults.length > 0) {
            this.searchResults.map((item) => {
              item.docissuedate = moment(item.docissuedate).format(
                'DD-MMM-YYYY'
              );
              item.docexpirydate = moment(item.docexpirydate).format(
                'DD-MMM-YYYY'
              );
              //
              item.viewmoredatas = [];
              item.viewmoredatas.push({
                label: 'Request Number',
                value: item.edasreqno,
              });
              // item.viewmoredatas.push({
              //   label: 'DOCUMENT NAME',
              //   value: item.docname,
              // });
              item.viewmoredatas.push({
                label: 'Issue Date',
                value: item.docissuedate,
              });
              item.viewmoredatas.push({
                label: 'Expiry Date',
                value: item.docexpirydate,
              });
              item.viewmoredatas.push({
                label: 'Entity Name',
                value: item.entityname,
              });
              item.viewmoredatas.push({
                label: 'Status',
                value: item.docstatus,
              });
            });
            const firstrecord: QRCodeType =
              this.searchResults.at(0) || ({} as QRCodeType);
            if (firstrecord?.docstatus === 'Valid') {
              this.isSearchResult = true;
              // setTimeout(() => {
              this.goToNextstep(this.activeIndex);
              // }, 1000);
            } else {
              this.isSearchResult = false;
              this.scrollToBottom();
            }
          }
          this.validateSteps();
        } else {
          this.clear(true);
          // this.common.showWarningMessage(
          //   this.translate.instant('Not valid QR Code')
          // );
          // this.loading = false;
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.common.showErrorMessage(error.error.data);
        this.common.hideLoading();
      },
    });
  }

  validateSteps() {
    if (this.edasreqno && this.isSearchResult) {
      if (this.activeIndex === 1) {
        // this.activeIndex += 1;
        // this.common.showSuccessMessage('Record validated');
      }
    } else {
      // this.common.showWarningMessage('Record not exists');
    }
  }

  getFileDetForQRCode(param: any) {
    let resp,
      entityname = '';
    if (this.searchResults && this.searchResults.length > 0) {
      entityname = this.searchResults[0]?.entityname;
    }
    let data = {
      uuid: this.uuid,
      edasreqno: param.edasreqno,
      entityname: entityname,
    };
    this.common.showLoading();
    this.apiservice.post(this.consts.getFileDetForQRCode, data).subscribe({
      next: (success: any) => {
        this.common.hideLoading();
        resp = success;
        if (`${resp.responsecode}` == '1') {
          const fileDetails: any[] = resp.data;
          if (fileDetails && fileDetails.length > 0) {
            const firstrecord: { edasreqno: string; filepath: string } =
              fileDetails.at(0) || ({} as any);
            if (firstrecord?.filepath) {
              this.fileContentEncode = firstrecord?.filepath;
              this.downloadFileContent(true);
            } else {
              this.common.showWarningMessage('No file found');
            }
          }
          // this.validateSteps();
        } else {
          this.common.showWarningMessage(this.translate.instant('Not valid'));
          // this.loading = false;
        }
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.common.showErrorMessage(error.error.data);
        this.common.hideLoading();
      },
    });
  }

  downloadFileContent(fromHtml: boolean) {
    this.IsFileFound = true;
    const data = {
      attestfilelocation: this.fileContentEncode,
      uuid: this.uuid,
    };
    this.apiservice
      .post(this.consts.getAttestationFileContent, data)
      .pipe(
        catchError((error) => {
          // this.common.showErrorMessage(error?.message);
          // this.loading = false;
          this.common.hideLoading();
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        const dictionary = response;
        if (`${dictionary.responsecode}` === '1') {
          if (fromHtml) {
            this.common.downloadFile(dictionary?.data, 'preview-file.pdf');
          } else {
            this.src = `data:application/pdf;base64,${dictionary?.data}`;
          }
          if (!dictionary?.data) {
            this.IsFileFound = false;
          }
        } else {
          this.IsFileFound = false;
          this.common.showErrorMessage(this.translate.instant('label.error'));
        }
      });
  }

  scrollToBottom() {
    const stepbody1 = this.stepbody.nativeElement;
    stepbody1.scrollTop = stepbody1.scrollHeight;
    const videocontrol1 = this.videocontrol.nativeElement;
    videocontrol1.scrollTop = videocontrol1.scrollHeight;
  }

  maximizeFile() {
    this.isMaximized = !this.isMaximized;
  }

  clearIntervals() {
    if (this.permissionCheckInterval) {
      clearInterval(this.permissionCheckInterval);
    }
  }

  ngOnDestroy() {
    this.clearIntervals();
  }
}
