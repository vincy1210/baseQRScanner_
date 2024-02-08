export enum CompanyAttestationEnums {
  Company = 1,
  Physical,
  Lca,
  Coo,
  Entity,
}

export enum CompanyStatusEnums {
  Pending = 1,
  Approved = 2,
  New = 3,
  Rejected = 4,
}

export enum AttestationStatusEnums {
  InDraft = 1,
  InRisk = 2,
  Payment = 3,
  InReview = 4,
  Pending = 5,
  Approved = 6,
  Returned = 7,
  OnHold = 8,
  Attested = 9,
  Completed = 10,
}

export enum RoleEnums {
  Admin = 1,
  User,
  ReadOnlyUser,
  ReportUser,
  ConfigUser,
  FinanceAdmin,
  FinanceReportUser,
  RiskAdmin,
  RiskMonitor,
  RiskReportUser,
  LcaAdmin,
  LcaUser,
}

export enum PermissionEnums {
  All = 1,
  View,
  Add,
  Edit,
  Delete,
}

export enum TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  QUESTION = 'question',
}
