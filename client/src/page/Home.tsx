import React, { Fragment } from "react";

import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { CheckSessionAvailability } from "../utils";
import { getAllAvailableCustomerRequestsAPI } from "../api";
import { useAppDispatch } from "../store/hooks";
import { setNewCustomerRequestList } from "../store/slice/CustomerRequestSlice";
import { TCustomerRequest } from "../type";
import { setOpenSnackBar, setSnackBarMsg } from "../store/slice/SnackBarSlice";

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
                getAllAvailableCustomerRequestsAPI().then(
                  (
                    res: {
                      success: boolean;
                      message: string;
                      resultData: TCustomerRequest[];
                    } | null
                  ) => {
                    if (res?.success) {
                      dispatch(setNewCustomerRequestList(res.resultData));
                      navigate("/lookupNewRequests");
                    } else {
                      if (res?.message) {
                        dispatch(setOpenSnackBar(true));
                        dispatch(setSnackBarMsg(res.message));
                      } else {
                        dispatch(setOpenSnackBar(true));
                        dispatch(
                          setSnackBarMsg(
                            "API 요청으로 부터 문제가 발생 했습니다."
                          )
                        );
                      }
                    }
                  }
                );
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
