import {
  // StatusEnums,
  CompanyStatusEnums,
  AttestationStatusEnums,
} from '../constants/status-enum';

export type FilterTypeCompany = {
  uuid?: string;
  id:
    | CompanyStatusEnums.Pending
    | CompanyStatusEnums.Approved
    | CompanyStatusEnums.Rejected;
  value: 'Pending' | 'Approved' | 'Rejected';
  startnum?: number;
  rows?: number;
  Startdate?: Date;
  Enddate?: Date;
  StartdateStr?: string;
  EnddateStr?: string;
};

export type FilterTypeAttestation = {
  uuid?: string;
  id:
    | AttestationStatusEnums.InDraft
    | AttestationStatusEnums.InRisk
    | AttestationStatusEnums.Payment
    | AttestationStatusEnums.InReview
    | AttestationStatusEnums.Pending
    | AttestationStatusEnums.Approved
    | AttestationStatusEnums.Returned
    | AttestationStatusEnums.OnHold
    | AttestationStatusEnums.Attested
    | AttestationStatusEnums.Completed;
  value:
    | 'InDraft'
    | 'InRisk'
    | 'Payment'
    | 'InReview'
    | 'Pending'
    | 'Approved'
    | 'Returned'
    | 'OnHold'
    | 'Attested'
    | 'Completed';
  startnum?: number;
  rows?: number;
  Startdate?: Date;
  Enddate?: Date;
  StartdateStr?: string;
  EnddateStr?: string;
};

export type SortFilterType = {
  sortOrder: number | undefined;
  sortField: string | undefined;
};

export type ViewDataType = {
  key?: string;
  label: string;
  value: string;
};

export type FilterTypeGeneric = {
  uuid?: string;
  companyuno?: number;
};

export interface GlossaryEntry {
  title: string;
  content: GlossaryContentElement[];
  title_ar?: string; // Arabic title
  content_ar?: GlossaryContentElement[]; // Arabic content
}

export type GlossaryContentElement = {
  type: 'paragraph' | 'list' | 'steps';
  value: string | string[];
};

export interface QRCodeType {
  edasreqno: string;
  docname: string;
  docissuedate: string;
  docexpirydate: string;
  entityname: string;
  docstatus: string;
  viewmoredatas: ViewDataType[];
}
