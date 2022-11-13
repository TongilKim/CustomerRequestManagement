import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllAvailableCustomerRequestsAPI,
  getAllCompletedRequestByCounselor,
} from "../api";
import CompletedCounselorRequest from "../component/RequestItem/CompletedCounselorRequest";
import NewCounselorRequest from "../component/RequestItem/NewCounselorRequest";
import RequestList from "../component/RequestList/RequestList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCompletedRequestListForCounselor } from "../store/slice/CompletedCustomerRequestSlice";
import { setNewCustomerRequestList } from "../store/slice/CustomerRequestSlice";
import { setOpenSnackBar, setSnackBarMsg } from "../store/slice/SnackBarSlice";
import { TCompletedCustomerRequest, TCustomerRequest } from "../type";
import style from "./CounselorRequestList.module.css";
export default function CounselorRequestList() {
  // STORE STATE
  const { newCustomerRequestList } = useAppSelector(
    (state) => state.customerRequest
  );
  const { completedRequestListForCounselor } = useAppSelector(
    (state) => state.completedCustomerRequest
  );
  const dispatch = useAppDispatch();

  // LOCAL STATE
  const navigate = useNavigate();

  const fetchAllAvailableRequests = async () => {
    await getAllAvailableCustomerRequestsAPI().then(
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
            dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
          }
        }
      }
    );
  };

  const fetchAllCompletedRequests = async () => {
    await getAllCompletedRequestByCounselor(
      Number(localStorage.getItem("currentCounselorId"))
    ).then(
      (
        res: {
          success: boolean;
          message: string;
          resultData: TCompletedCustomerRequest[];
        } | null
      ) => {
        if (res?.success) {
          dispatch(setCompletedRequestListForCounselor(res.resultData));
        }
      }
    );
  };

  useEffect(() => {
    fetchAllCompletedRequests();
    fetchAllAvailableRequests();
  }, []);

  return (
    <div className={style.wrapper}>
      <div
        onClick={() => {
          navigate("/");
        }}
        className={style.backBtn}
      >
        {"<"}
      </div>
      <Fragment>
        <RequestList title="답변한 문의">
          {completedRequestListForCounselor.length > 0
            ? completedRequestListForCounselor.map((request, idx) => {
                return (
                  <CompletedCounselorRequest
                    key={idx}
                    data={request}
                    dataIdx={idx + 1}
                  />
                );
              })
            : null}
        </RequestList>
        <RequestList title="새로운 문의">
          {newCustomerRequestList.length > 0
            ? newCustomerRequestList.map((request, idx) => {
                return (
                  <NewCounselorRequest
                    key={idx}
                    data={request}
                    dataIdx={idx + 1}
                  />
                );
              })
            : null}
        </RequestList>
      </Fragment>
    </div>
  );
}
