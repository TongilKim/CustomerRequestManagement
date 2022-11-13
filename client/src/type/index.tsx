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
};

export type TCompletedCustomerRequest = {
  title: string;
  contents: string;
  customerId: string;
  requestOriginDatetime: string;
  answeredContents: string;
  counselorName: string;
  counselorId: string;
};
