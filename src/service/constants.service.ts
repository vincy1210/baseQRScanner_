import { Injectable } from '@angular/core';

export const ActionConstants = {
  load: 'Load',
  destroy: 'Destroy',
  submit: 'Submit',
  workflowview: 'View Workflow',
  addcompany: 'Add Company',
  viewcompany: 'View Company',
  editcompany: 'Edit Company',
  deletecompany: 'Delete Company',
};

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}
  Updatecompanyuser = 'Company/Updatecompanyuser';
  getPaymentReceipt = 'payment/getPaymentReceipt';
  registercompany = 'Company/RegisterCompany';
  CheckCompanyRegStatus = 'Company/checkCompanyRegnStatus';
  GetLegalTypes = 'Company/getLegalTypes';
  SendOTPForCompanyRegn = 'Company/saveOTPforCompanyRegn';
  validateOTPforCompanyRegn = 'Company/validateOTPforCompanyRegn';
  getFreezonetypes = 'Company/getFreezonetypes';
  pendingattestation = 'User/lcaMypendingAttestList';
  //UAEPassprofile="Company/lcapendingAttestList"
  getInvoiceAttestations = 'User/getMyInvoiceAttestations'; // invoice attest lists
  invoiceAttestation = 'Common/invoiceAttestation'; // invoice attest request // invoice attest request
  getCooRequests = 'User/getMyCOORequests'; // completed attest lists
  updateCOORequests = 'Company/updateCOORequests'; // completed attest update
  lcaCompletedAttestList = 'User/lcaMyCompletedAttestList';
  sendMailGeneric = 'Company/sendMailGeneric';
  getcompletedCOORequests = 'User/getMycompletedCOORequests'; // completed COO Request
  getAttestationFileContent = 'Company/getAttestationFileContent';
  getCompanyList = 'User/getMyCompanyList';
  getInReviewCOOReq = 'User/getInReviewCOOReq';
  getInReviewAttestReq = 'User/getInReviewAttestReq';
  checkCompanyUser = 'user/checkCompanyUser';

  mpaypurchaseRequest = 'lca/mpaypurchaseRequest';
  LCAmpayinquiryTransaction = 'lca/mpayinquiryTransaction';
  mpayinquiryTransactionForPayAll = 'lca/mpayinquiryTransactionForPayAll';

  getPhysicalAttestpaymentdetails = 'entity/getPhysicalAttestpaymentdetails';
  getCOOAttestpaymentdetails = 'entity/getCOOAttestpaymentdetails';

  getcompletedInvoiceAttestList = 'User/getMycompletedInvoiceAttestList';

  managecompanyuser = 'Admin/managecompanyuser'; //manage user
  getCompanyUserList = 'Admin/getCompanyUserList';

  eSealSoapGatewayUrl = 'https://stg-id.uaepass.ae/trustedx-gw/SoapGateway';

  //payment

  getLCAPaymentdetails = 'LCA/getLCAPaymentdetails';

  //dashboard
  getDailyStatistics = 'dashboard/getDailyStatistics';
  getWeeklyStatistics = 'dashboard/getWeeklyStatistics';
  getMonthlyStatistics = 'dashboard/getMonthlyStatistics';
  saveSiteAnalytics = '/dashboard/saveSiteAnalytics';
  getLCAStatistics = 'dashboard/getLCAStatistics';

  // this.consts.getDailyStatistics: filterType === "weekly"? this.consts.getWeeklyStatistics: this.consts.getMonthlyStatistics;

  getFinesReport = 'lca/getFinesReport';

  requestAttestationFromExcelImport = 'lca/requestAttestationFromExcelImport';
  getPendingReqforlcauser = 'lca/getPendingReqforlcauser';
  getCompletedReqforlcauser = 'lca/getCompletedReqforlcauser';
  getCompanyListForLcaUser = 'lca/getCompanyListForLcaUser';
  getInRiskReqforlcauser = 'lca/getInRiskReqforlcauser';

  getcoolistforlcaattestno = 'user/getcoolistforlcaattestno';
  getlcalistforcoodeclaration = 'user/getlcalistforcoodeclaration';
  getListOfValues = 'user/getListOfValues';
  getSettlementList = 'payment/getSettlementList';
  getServerTime = 'Common/getServerTime';
  getLCAOverdueCount = 'Admin/getLCAOverdueCount';
  getCOOgroupPaymentDetails = 'payment/getCOOgroupPaymentDetails';
  lcaMyAttestListForAllStatus = 'User/lcaMyAttestListForAllStatus';

  getFinesReportForAllStatus = 'lca/getFinesReportForAllStatus';
  getMyInvoiceAttestationsForAllS = 'User/getMyInvoiceAttestationsForAllStatus';
  getMyCOORequestsForAllStatus = 'User/getMyCOORequestsForAllStatus';

  //pay all

  getCOOgroupPayallPaymentDetails = 'payment/getCOOgroupPayallPaymentDetails';
  getpendingcntlcaforcompany = 'payment/getpendingcntlcaforcompany';

  //   {
  //     "companyuno": "626",
  //     "uuid": "bbbb11121nnn1"
  // }
  // getImportReportForLCA='getImportReportForLCA' /// dummy
  getImportReportForLCA = 'dashboard/getImportReportForLCA';

  //getPreprocessLCARequests
  getPreprocessLCARequests = 'User/getPreprocessLCARequests';
  //
  updateCompanyProfile = 'Admin/updateCompanyProfile';

  // getListOfValues='user/getListOfValues';
  getAttestStatisticsForCustomer = 'dashboard/getAttestStatisticsForCustomer';
  CheckUAEPassLogin = 'Common/CheckUAEPassLogin';
  getEmbassywiseAttestationCount = 'dashboard/getEmbassywiseAttestationCount';

  // QR Code
  getDocDataForQRcode = 'user/getDocDataForQRcode';
  getFileDetForQRCode = 'user/getFileDetForQRCode';
  saveOTPtoReadFile = 'user/saveOTPtoReadFile';
  validateOTPtoReadFile = 'user/validateOTPtoReadFile';
}
