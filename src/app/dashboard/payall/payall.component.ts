import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  VERSION,
  Inject,
  Input,
} from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ApiService } from 'src/service/api.service';
import { CommonService } from 'src/service/common.service';
import { ConstantsService } from 'src/service/constants.service';
import { LazyLoadEvent } from 'primeng/api';
// import * as FileSaver from 'file-saver';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { HttpClient } from '@angular/common/http';
import { MatToolbar } from '@angular/material/toolbar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
// import {MatDialog, MatDialogModule} from '@angular/material/dialog';
// import {MatButtonModule} from '@angular/material/button';
// import { MatDialog } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
// import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/service/auth.service';

import { FormControl, Validators, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { formatDate } from '@angular/common';

import { saveAs } from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-payall',
  templateUrl: './payall.component.html',
  styleUrls: ['./payall.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PayallComponent implements OnInit {
  loading: boolean = true;
  uuid: string = '';
  user_mailID: string = '';
  contactno: string = '';

  invoiceunoresponse: number = 0;
  currentcompany: any;
  payment_button_isdisabled: boolean = true;
 
  processname:string='COOLCA';
  processname_set:string='COOLCA'
  payallcount:number=0;

  // noOfInvoicesSelected:number=0;    //new


  noofattest:number=0;
  coocount:number=0;
  nooffines:number=0;
  invoicefeesamount:number=0;
  coofeesamount:number=0;
  fineamount:number=0;
  totalamount:number=0;



  constructor(
    private router: Router,
    private apicall: ApiService,
    public common: CommonService,
    private consts: ConstantsService,
    private auth: AuthService
  ) {

  

  }

  ngOnInit() {

    console.log('calling getselected company');
    let currcompany = this.auth.getSelectedCompany();
    if (currcompany) {
      this.currentcompany = currcompany.companyuno || '';

      if (
        this.currentcompany == null ||
        this.currentcompany == undefined ||
        this.currentcompany === ''
      ) {
        console.log('to landing page from payall page line 122');
        this.router.navigateByUrl('/landingpage');
      }
    } else {
      this.common.redirecttologin();
      return;
    }
    this.invoicefeesamount = 0.0;
    this.coofeesamount = 0.0;
    this.fineamount = 0.0;
    this.invoicefeesamount=0.0;
    this.loading = true;
    let data11 = this.common.getUserProfile();
    let uuid;
    if (data11 != null || data11 != undefined) {
      data11 = JSON.parse(data11);
      console.log(data11.Data);
      uuid = data11.Data.uuid;
      this.uuid = uuid;
      this.user_mailID = data11.Data.email;
      this.contactno = data11.Data.mobile;

    }

 this.callpayallmethod();
if(this.uuid){
  this.checkcounts();  // after setting uuid and currentcompany in other variables

}

    //this.cols;
  }




  AttestationPay() {
    let data = {
    
      servicedata: [
        {
          noOfTransactions: '1',
          merchantId: '',
          serviceId: '',
          amount: this.totalamount.toString(),
        },
      ],
      responseURL: '',
      errorURL: '',
      udf1: this.currentcompany.toString(),
      udf2: this.user_mailID,
      udf3: this.contactno,
      udf4: '',
      udf5: '',
      udf6: '',
      udf7: '',
      udf8: '',
      udf9: this.uuid,
      udf10: this.processname,
      action: 1,
      correlationid: this.invoiceunoresponse.toString(),
      langid: 'EN',
      currencyCode: '784',
      version: '1.0.1',
    };

    let resp;

    let header = {
      uuid: this.uuid,
      processname: this.processname,
    };
    this.common.showLoading();
    this.apicall
      .postWH(this.consts.mpaypurchaseRequest, data, { header })
      .subscribe({
        next: (success: any) => {
          this.common.hideLoading();

          resp = success;
          if (resp.status === '1') {
            let token = resp.tokenid;
            let parts = token.split(':');
            let code = parts[0];
            let site = parts[1] + ':' + parts[2];
            let data = {
              invoiceID: this.invoiceunoresponse,
              paymentID: code,
              processname: this.processname_set,
              ispayall:1
            };
            this.common.setpaymentdetails(data);

            window.location.href = site + '?PaymentID=' + code;
            // this.router.navigateByUrl(site);
          } else {
            this.common.showErrorMessage(
              'Something went wrong. Please try again later.'
            );
            return;
          }
        },
      });
  }

 

  callpayallmethod(){
    let data={
      "companyuno": this.currentcompany,
      "uuid": this.uuid,
      "invoiceuno":0
  }
  let resp;
  this.common.showLoading();
    this.apicall.post(this.consts.getCOOgroupPayallPaymentDetails, data).subscribe({
      next: (success: any) => {
        this.common.hideLoading();
        this.loading = false;
        resp = success;
        console.log(resp)
        if (resp.status === '1') {
          this.noofattest=resp.invoicecount;
          this.coocount=resp.coocount;
          this.nooffines=resp.nooffines;
          this.invoicefeesamount=resp.invoicefeesamount ;
          if (typeof resp.invoicefeesamount === 'object') {
            this.invoicefeesamount = 0.0;
        }
        this.coofeesamount=resp.coofeesamount;
        if (typeof resp.coofeesamount === 'object') {
          this.coofeesamount = 0.0;
        }
          
          this.fineamount=resp.fineamount;
          this.totalamount=resp.totalamount;
          this.invoiceunoresponse=resp.invoiceuno;
         
        } else {
          this.common.showErrorMessage('Something went wrong');
          this.loading = false;
        }
      },
    });


  }

  checkcounts(){
  let data = {
    uuid: this.uuid,
    "companyuno": this.currentcompany
  };
  let resp;
  this.apicall.post(this.consts.getpendingcntlcaforcompany, data).subscribe({
    next: (success: any) => {
      this.common.hideLoading();

      resp = success;
      console.log(resp);
      if (resp) {
          let totalcount=resp.totalrequest || 0;

          this.payallcount=totalcount;
          console.log(totalcount);
          // this.common.setpayallcount(totalcount);
        return;
      } else {
        // this.CompanyListforAdmin = null;
      }
      // this.isanycompanyavailable = this.CompanyListforAdmin !== null;
    },
  });


  }

}
