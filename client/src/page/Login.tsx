import React, { Fragment, useCallback, useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { signInAPI, signUpAPI } from "../api";
import { ACCESS_TOKEN } from "../constants";
import { useAppDispatch } from "../store/hooks";
import { setOpenSnackBar, setSnackBarMsg } from "../store/slice/SnackBarSlice";

export default function Login() {
  // STORE STATE
  const dispatch = useAppDispatch();
  // LOCAL STATE
  const [loginBtnActive, setLoginBtnActive] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const navigate = useNavigate();

  const validatePassword = () => {
    return userPassword === userConfirmPassword;
  };
  const onClickSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordValidated = validatePassword();
    if (passwordValidated) {
      signUpAPI({
        username: userName,
        email: userEmail,
        password: userPassword,
      }).then((res: { success: boolean; message: string } | null) => {
        console.log("res: ", res);
        if (res) {
          if (res.success) {
            navigate("/");
          }

          dispatch(setOpenSnackBar(true));
          dispatch(setSnackBarMsg(res.message));
        } else {
          dispatch(setOpenSnackBar(true));
          dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
        }
      });
    } else {
      dispatch(setOpenSnackBar(true));
      dispatch(setSnackBarMsg("패스워드가 일치하지 않습니다."));
    }
  };

  const onClickSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInAPI({
      usernameOrEmail: userEmail,
      password: userPassword,
    }).then(
      (
        res: { success: boolean; message: string; accessToken: string } | null
      ) => {
        if (res) {
          if (res.success) {
            localStorage.setItem(ACCESS_TOKEN, res.accessToken);
            navigate("/");
          }
          dispatch(setOpenSnackBar(true));
          dispatch(setSnackBarMsg(res.message));
        } else {
          dispatch(setOpenSnackBar(true));
          dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
        }
      }
    );
  };

  return (
    <Fragment>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div
            onClick={() => {
              navigate("/");
            }}
            className={style.backBtn}
          >
            {`<`}
          </div>
          <div className={style.buttonBox}>
            <div
              className={style.activeBtn}
              style={loginBtnActive ? { left: 0 } : { left: "110px" }}
            ></div>
            <button
              type="button"
              onClick={() => {
                setLoginBtnActive(true);
              }}
              className={style.toggleBtn}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginBtnActive(false);
              }}
              className={style.toggleBtn}
            >
              회원가입
            </button>
          </div>
          {loginBtnActive ? (
            <form
              onSubmit={(e) => onClickSignIn(e)}
              className={style.loginForm}
            >
              <input
                type="text"
                className={style.inputField}
                placeholder="Email Id"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                required
              />
              <input
                type="password"
                className={style.inputField}
                placeholder="Enter Password"
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                required
              />
              <button type="submit" className={style.submitButton}>
                로그인
              </button>
              <button
                type="submit"
                onClick={() => {
                  navigate("/lookupNewRequests");
                }}
                className={style.submitButton}
              >
                테스트
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => onClickSignUp(e)}
              className={style.registerForm}
            >
              <input
                type="text"
                className={style.inputField}
                placeholder="Name"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required
              />
              <input
                type="email"
                className={style.inputField}
                placeholder="E-mail"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                required
              />
              <input
                type="password"
                className={style.inputField}
                placeholder="Enter Password"
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                required
              />
              <input
                type="password"
                className={style.inputField}
                placeholder="Confirm Password"
                value={userConfirmPassword}
                onChange={(e) => {
                  setUserConfirmPassword(e.target.value);
                }}
                required
              />
              <button className={style.submitButton} type="submit">
                회원가입
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
}
