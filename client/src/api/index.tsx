import { API_BASE_URL } from "../constants";
import { CheckSessionAvailability } from "../utils";

const getHeaderInfo = () => {
  const header = new Headers({ "Content-Type": "application/json" });
  let sessionAvailable = CheckSessionAvailability();
  if (sessionAvailable) {
    header.append("Authorization", "Bearer " + sessionAvailable);
  }
  return header;
};

type SignUp = {
  username: string;
  email: string;
  password: string;
};
export const signUpAPI = async (signUpParam: SignUp) => {
  let data = null;
  let headers = getHeaderInfo();
  console.log("headers: ", headers);

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
              message: "패스워드 길이가 적절치 않습니다.",
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

type SignIn = {
  usernameOrEmail: string;
  password: string;
};
export const signInAPI = async (signInParam: SignIn) => {
  let data = null;
  let headers = getHeaderInfo();

  try {
    await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(signInParam),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res: ", res);
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
