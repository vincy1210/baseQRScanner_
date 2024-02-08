import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/service/common.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import jspdf from 'jspdf';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/service/auth.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  showSignOutMessage: boolean = false;
  timenow:Date=new Date();
  timestr:any;
  sessionnote:string='';

  data={
    name: "vincy",
    company:"Ducont"
  }
  firsttime:number=1;

  constructor(public common:CommonService,private datePipe: DatePipe, private Router:Router, private auth:AuthService) { 

    

    // sessionStorage.clear();

    // if(this.firsttime==1){
    //  window.location.reload();
    // }
    this.common.getlogoutreason().subscribe(data => {
   

      if(data){
if(data=="session"){
  this.sessionnote='Your session got logged out due to inactivity, we look forward to serve you again';
}
else if(data=="manuallogout"){
  this.sessionnote='You have been successfully logged out, we look forward to serve you again';
}
      }
      });
  
	
  }

  ngOnInit(): void {
    this.timestr = this.datePipe.transform(this.timenow, 'MMM d yyyy h:mm:ss a');
    if(this.sessionnote==''){
      this.sessionnote='Your session got logged out due to inactivity, we look forward to serve you again';

    }
// manual logout will clear the session and redirect
//session idle logout session will be cleared here 
    // this.auth.logout();
    window.history.replaceState({}, document.title, window.location.href);

    if (this.isUserSignedOut()){
      this.showSignOutMessage = true;
    }
    else{
      sessionStorage.clear();
      window.location.reload();
    }
  }

  private isUserSignedOut(): boolean {

    let data11=this.common.getUserProfile();
    let uuid;
    if(data11==null || data11==undefined){
     return true;
    }
    else{
      return false;
    }
  
  }
  redirecttologin(){
    window.location.href = "https://stg-id.uaepass.ae/idshub/logout?redirect_uri=https://mofastg.mofaic.gov.ae/en/Account/Redirect-To-EDAS-V2"
  }

}
