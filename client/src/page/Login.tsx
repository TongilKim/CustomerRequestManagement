import React, { Fragment, useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginBtnActive, setLoginBtnActive] = useState(true);
  const navigate = useNavigate();

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
            <form className={style.loginForm}>
              <input
                type="text"
                className={style.inputField}
                placeholder="Email Id"
                required
              />
              <input
                type="password"
                className={style.inputField}
                placeholder="Enter Password"
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
            <form className={style.registerForm}>
              <input
                type="text"
                className={style.inputField}
                placeholder="Name"
                required
              />
              <input
                type="email"
                className={style.inputField}
                placeholder="E-mail"
                required
              />
              <input
                type="password"
                className={style.inputField}
                placeholder="Enter Password"
                required
              />
              <input
                type="password"
                className={style.inputField}
                placeholder="Confirm Password"
                required
              />
              <button type="submit" className={style.submitButton}>
                회원가입
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
}
