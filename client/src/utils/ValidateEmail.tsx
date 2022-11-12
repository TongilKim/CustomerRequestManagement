import React from "react";
import { EMAIL_MAX_LENGTH } from "../constants";

export default function ValidateEmail(email: string) {
  if (!email) {
    return {
      validateStatus: "error",
      errorMsg: "이메일은 필수 값 입니다.",
    };
  }

  const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
  if (!EMAIL_REGEX.test(email)) {
    return {
      validateStatus: "error",
      errorMsg: "유효하지 않은 이메일 형식 입니다.",
    };
  }

  if (email.length > EMAIL_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `이메일 길이가 너무 깁니다. (최대 ${EMAIL_MAX_LENGTH} 글자수만 가능 합니다.)`,
    };
  }

  return {
    validateStatus: "good",
    errorMsg: "",
  };
}
