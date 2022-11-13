export enum Role {
  CustomerRole = "customer",
  CounselorRole = "counselor",
}

export type TCustomerRequest = {
  id: number;
  title: string;
  contents: string;
  customerId: string;
  deleted?: boolean;
  pending?: boolean;
  createdDateTime: string;
};
