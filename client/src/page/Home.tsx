import React, { Fragment } from "react";

import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.title}>문의 접수</div>
          <div>
            <button type="submit" className={style.submitButton}>
              고객
            </button>
            <button
              type="submit"
              onClick={() => {
                navigate("/login");
              }}
              className={style.submitButton}
            >
              상담사
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
