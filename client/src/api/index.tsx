import { API_BASE_URL } from "../constants";
import {
  TCompletedCustomerRequest,
  TCustomerRequest,
  TRequestResponse,
} from "../type";
import { CheckSessionAvailability } from "../utils";

const getHeaderInfo = () => {
  const header = new Headers({ "Content-Type": "application/json" });
  let sessionAvailable = CheckSessionAvailability();
  if (sessionAvailable) {
    header.append("Authorization", "Bearer " + sessionAvailable);
  }
  return header;
};

type TSignUp = {
  username: string;
  email: string;
  password: string;
};
export const signUpAPI = async (signUpParam: TSignUp) => {
  let data: TRequestResponse | null = null;
  const headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(signUpParam),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          if (res.status === 400) {
            data = {
              success: false,
              message: "입력 하신 이름/패스워드가 너무 길거나 짧습니다.",
            };
          }
        } else {
          data = res;
        }
      });
  } catch (error) {
    data = null;
  }
  return data;
};

type TSignIn = {
  usernameOrEmail: string;
  password: string;
};

export const signInAPI = async (signInParam: TSignIn) => {
  let data: { success: boolean; message: string; accessToken?: string } | null =
    null;
  const headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(signInParam),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          if (res.status === 500) {
            data = {
              success: false,
              message: "입력 하신 정보가 적절하지 않습니다.",
            };
          }
        } else {
          if (res.accessToken) {
            data = {
              success: true,
              accessToken: res.accessToken,
              message: "성공적으로 로그인 했습니다.",
            };
          } else {
            data = res;
          }
        }
      });
  } catch (error) {
    data = null;
  }
  return data;
};

export const getMyInfoAPI = async () => {
  let data = null;
  const headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/user/getMyInfo`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        data = res;
      });
  } catch (e) {
    data = null;
  }
  return data;
};

export const checkEmailAvailabilityAPI = async (email: string) => {
  let exist = false;
  const headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/user/checkEmailAvailability?email=${email}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((res: { available: boolean }) => {
        console.log("res: ", res);
        exist = res.available;
      });
  } catch (e) {
    exist = false;
  }

  return exist;
};

type TNewCustomerRequest = {
  title: string;
  customerId: string;
  contents: string;
};
export const createNewCustomerRequestAPI = async (
  newCustomerRequest: TNewCustomerRequest
) => {
  let data: TRequestResponse | null = null;
  const headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/customerRequests`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newCustomerRequest),
    })
      .then((response) => response.json())
      .then((res) => {
        data = res;
      });
  } catch (error) {
    data = null;
  }
  return data;
};

export const getAllAvailableCustomerRequestsAPI = async () => {
  let data: TCustomerRequest[] | null = null;
  const headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/customerRequests/allRequests`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res: ", res);
        data = res;
      });
  } catch (error) {
    data = null;
  }
  return data;
};

export const getAllSpecificCustomerRequestsAPI = async (customerId: string) => {
  let data: TCustomerRequest[] | null = null;
  const headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/customerRequests?customerId=${customerId}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        data = res;
      });
  } catch (error) {
    data = null;
  }
  return data;
};

export const deleteCustomerRequestAPI = async (param: {
  customerId: string;
  requestId: number;
}) => {
  let data = null;
  const headers = getHeaderInfo();

  try {
    await fetch(
      `${API_BASE_URL}/customerRequests?customerId=${param.customerId}&requestId=${param.requestId}`,
      { method: "DELETE", headers: headers }
    )
      .then((response) => response.json())
      .then((res) => {
        data = res;
      });
  } catch (error) {
    data = null;
  }

  return data;
};

export const assignCustomerRequestAPI = async (param: {
  requestId: number;
}) => {
  let data = null;
  const headers = getHeaderInfo();

  try {
    await fetch(
      `${API_BASE_URL}/customerRequests/updateRequestSelected?requestId=${param.requestId}`,
      { method: "PUT", headers: headers }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("res: ", res);
        data = res;
      });
  } catch (error) {
    data = null;
  }

  return data;
};

export const createCompletedCustomerRequestAPI = async (
  param: TCompletedCustomerRequest
) => {
  let data: TRequestResponse | null = null;
  const headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/completedCustomerRequests`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(param),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res: ", res);
        data = res;
      });
  } catch (error) {
    data = null;
  }
  return data;
};

export const getAllCompletedRequestByCounselor = async (
  counselorId: number
) => {
  let data: TRequestResponse | null = null;
  const headers = getHeaderInfo();

  try {
    await fetch(
      `${API_BASE_URL}/completedCustomerRequests/byCounselor?counselorId=${counselorId}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("res: ", res);
        data = res;
      });
  } catch (error) {
    data = null;
  }
  return data;
};
