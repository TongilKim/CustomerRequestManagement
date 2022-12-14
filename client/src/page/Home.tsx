import React, { Fragment } from "react";

import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { CheckSessionAvailability } from "../utils";
import { useAppDispatch } from "../store/hooks";
import { getMyInfoAPI } from "../api";

export default function Home() {
  // STORE STATE
  const dispatch = useAppDispatch();

  // LOCAL STATE
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className={style.container}>
        <div className={style.title}>문의 접수</div>
        <div>
          <button
            onClick={() => {
              navigate("/customerOptions");
            }}
            className={style.submitButton}
          >
            고객
          </button>
          <button
            onClick={() => {
              const loggedIn = CheckSessionAvailability();
              if (loggedIn) {
                getMyInfoAPI().then(
                  (res: { id: number; username: string } | null) => {
                    if (res) {
                      localStorage.setItem(
                        "currentCounselorId",
                        res.id.toString()
                      );
                    }
                  }
                );
                navigate("/lookupNewRequests");
              } else {
                navigate("/login");
              }
            }}
            className={style.submitButton}
          >
            상담사
          </button>
        </div>
      </div>
    </Fragment>
  );
}
