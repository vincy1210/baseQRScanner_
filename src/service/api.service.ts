import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { attachmentResponse } from 'src/app/attestations';
import { environment } from 'src/environments/environment';
// import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseURL = environment.baseURL;
  authTokenURL = environment.authTokenURL;
  //sauthTokenURL="https://mofastg.mofaic.gov.ae/en/Account/"

  //Company/RegisterCompany

  // setHttpOptions() {
  //   const bearerToken = this.getCookie("Bearer");
  //   httpOptions = {
  //     headers: new HttpHeaders({
  //       Authorization: "Bearer " + bearerToken,
  //     }),
  //   };
  // }

  constructor(private http: HttpClient, private json: AppConfigService) {
    
  }

  get(servicename: any) {
    return this.http
      .get(this.baseURL + servicename)
      .pipe(catchError(this.handleError));
  }

  post(servicename: any, data: any) {
    return this.http
      .post(this.baseURL + servicename, data)
      .pipe(catchError(this.handleError));
  }
  postWH(servicename: any, data: any, header: any) {
    return this.http
      .post(this.baseURL + servicename, data, header)
      .pipe(catchError(this.handleError));
  }
  // sPassAuthGetUserprofile(param1: any, param3: any) {
  //   const email = encodeURIComponent(param3.trim());
  //   let email2 = encodeURIComponent(email);

  //   console.log(email);
  //   console.log(email2);
  //   let data={
  //     "Code":param1,"Email":email2
  //   }

  //   // let Url =this.baseURL +`Common/CheckUAEPassLogin?sAuthCode=${param1}&sEmail=${email2}`;
  //   let Url =this.baseURL +`Common/CheckUAEPassLogin`;

  //   console.log(Url);

  //   return this.http.post(Url,data, this.headerOptions).pipe(catchError(this.handleError));
  // }

  handleError(error: HttpErrorResponse) {
    console.log('error');

    return throwError(error);
  }

  headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('eDASUserV2:eD@$125478'), //username:password
    }),
  };

  registerCompanyAttachment(
    servicename: any,
    file: File,
    jsonData: any
  ): Observable<any> {
    const formData = new FormData();
    formData.append('Attachment', file);
    formData.append('Data', JSON.stringify(jsonData));
    return this.http.post(this.baseURL + servicename, formData);
  }

  // GetAuthToken(param1: any, param3: any) {
  //   const email = encodeURIComponent(param3?.trim());
  //   console.log(email);
  //   let Url =
  //     this.authTokenURL +
  //     `EDASGetAccessTokenV2?AuthenticationCode=${param1}&email=${email}`;

  //   return this.http.get(Url, this.headerOptions);
  // }
  // getUserToken(accessToken: any, param3: any) {
  //   const email2 = encodeURIComponent(param3);
  //   let Url =
  //     this.authTokenURL +
  //     `EDASGetProfileByAccessTokenV2?AccessToken=${accessToken}&email=${email2}`;
  //   return this.http.get(Url, this.headerOptions);
  // }
  getattestations(skip: number): Observable<attachmentResponse> {
    let data = {
      companyuno: '1',
      uuid: '123',
    };
    const pendingattestation = 'Company/lcapendingAttestList';

    // return this.http.post(this.baseURL + pendingattestation, data)
    // .pipe(
    //   catchError(this.handleError)
    // );
    return this.http.get<attachmentResponse>(
      `http://4.227.215.219/mofa/edasapi/api/Company/lcapendingAttestList?limit=10&skip=${skip}`
    );
  }

  postXML(serviceUrl: any, soapRequest: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'Sign',
      TwsAuthN: 'urn:safelayer:tws:policies:authentication:oauth:clients',
    });

    return this.http
      .post(serviceUrl, soapRequest, { headers, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  loadarabicval() {
    return this.http.get('http://localhost:3000/txnlog');
  }
}
