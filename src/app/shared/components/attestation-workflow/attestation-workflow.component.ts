import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AttestationStatusEnum } from '../../models/attestation-status.model';
import { CommonService } from 'src/service/common.service';
import { ApiService } from 'src/service/api.service';
import { ConstantsService } from 'src/service/constants.service';
@Component({
  selector: 'app-attestation-workflow',
  templateUrl: './attestation-workflow.component.html',
  styleUrls: ['./attestation-workflow.component.css'],
})
export class AttestationWorkflowComponent implements OnInit {
  @Input() selectedAttestations: any[] = [];
  @Input() invoiceamt: number = 0;
  @Input() fineamount: number = 0;
  @Input() totalamount: number = 0;
  @Input() src: any;


  noOfInvoicesSelected: number = 0;
  totalFineAmount: number = 0;
  totalAttestationFee: number = 0;
  totalFee: number = 0;
  previewvisible: boolean = true;
  Timelinevisible: boolean = true;
  // DateTime
  createdDateTime: any;
  approvedDateTime: any;
  paymentDateTime: any;
  attestationDateTime: any;
  completedDateTime: any;
  isLoading=false;
  // src: string = '';
  //
  status0:string='';
  status1:string='';
  status2:string='';
  status3:string='';
  status4:string='';
  isButtonDisabled = false;
  constructor(private common: CommonService, private api:ApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.src);
    if(changes['src']){
      console.log(this.src);
      console.log(changes['src']);
    }
    if (changes['selectedAttestations']) {
      const attestationLists = changes['selectedAttestations'].currentValue;
      this.selectedAttestations = attestationLists;


      if (this.selectedAttestations && this.selectedAttestations.length >= 0) {
         this.noOfInvoicesSelected = this.selectedAttestations.length;
        this.totalFineAmount = this.selectedAttestations.reduce(
          (total: any, item: any) => total + (item.fineamount ? item.fineamount : 0),
          0
        );
        this.totalAttestationFee = this.selectedAttestations.reduce(
          (total: any, item: any) => total + (item.feesamount ? item.feesamount : 0),
          0
        );
        this.totalFee = this.totalFineAmount + this.totalAttestationFee;

        if (this.selectedAttestations.length > 1) {
          this.previewvisible = false;
          this.Timelinevisible = false;
        } else {

          // if(this.selectedAttestations[0]?.attestfilelocation!='' || this.selectedAttestations[0]?.attestfilelocation != null){
          //   this.getimagebase64(this.selectedAttestations[0]?.attestfilelocation);
          //  }


          this.previewvisible = true;
          this.Timelinevisible = true;
          this.createdDateTime = this.common.splitdatetime(
            this.selectedAttestations[0]?.attestreqdate
          );
          this.approvedDateTime = this.common.splitdatetime(
            this.selectedAttestations[0]?.approvedon
          );
          this.paymentDateTime = this.common.splitdatetime(
            this.selectedAttestations[0]?.paidon
          );
          this.attestationDateTime = this.common.splitdatetime(
            this.selectedAttestations[0]?.attestedon
          );
          this.completedDateTime = this.common.splitdatetime(
            this.selectedAttestations[0]?.completedon
          );
          if (this.selectedAttestations[0].statusuno == 0) {
            this.status0 = 'current';
            this.status1 = '';
            this.status2 = '';
            this.status3 = '';
            this.status4 = '';
          } else if (this.selectedAttestations[0].statusuno == 1) {
            this.status0 = 'active';
            this.status1 = 'current';
            this.status2 = '';
            this.status3 = '';
            this.status4 = '';
          } else if (this.selectedAttestations[0].statusuno == 2) {
            this.status0 = 'active';
            this.status1 = 'active';
            this.status2 = 'current';
            this.status3 = '';
            this.status4 = '';
          } else if (this.selectedAttestations[0].statusuno == 3) {
            this.status0 = 'active';
            this.status1 = 'active';
            this.status2 = 'active';
            this.status3 = 'current';
            this.status4 = '';
          } else if (this.selectedAttestations[0].statusuno == 4) {
            this.status0 = 'active';
            this.status1 = 'active';
            this.status2 = 'active';
            this.status3 = 'active';
            this.status4 = 'current';
          } else {
            this.common.showErrorMessage('Something went wrong');
          }
        }
      }
    }
  
}

 
// getimagebase64(attestfilelocation:any){
//   let resp;
//   let data={
//     "attestfilelocation":attestfilelocation,
//     "uuid":this.uuid
//   }
//   this.api.post(this.consts.getAttestationFileContent,data).subscribe({next:(success:any)=>{
//     resp=success;
//     if(resp.dictionary.responsecode==1){
//     this.base64PdfString=resp.data;

//     const source = `data:application/pdf;base64,${this.base64PdfString}`;
//     const link = document.createElement("a");
//     link.href = source;
//     link.download = `attachment.pdf`
//     link.click();
//     this.src=link;
//     }
//     else{
//       this.common.showErrorMessage('Attachment load failed')
//       this.loading=false;
//     }
//   }
// })

//}
}
