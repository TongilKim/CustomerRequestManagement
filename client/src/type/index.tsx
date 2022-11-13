export enum Role {
  CustomerRole = "customer",
  CounselorRole = "counselor",
}

export type TCustomerRequest = {
  id: number;
  title: string;
  contents: string;
  customerId: string;
  counselorId: string;
  counselorName: string;
  deleted: boolean;
  pending: boolean;
  createdDateTime: string;
  answered: boolean;
};

export type TCompletedCustomerRequest = {
  title: string;
  contents: string;
  customerId: string;
  requestOriginDatetime: string;
  createdDateTime?: string;
  answeredContents: string;
  counselorName: string;
  counselorId: string;
};

export type TRequestResponse = {
  success: boolean;
  message: string;
  resultData?: any[];
};
