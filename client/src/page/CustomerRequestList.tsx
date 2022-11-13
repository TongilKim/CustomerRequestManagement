import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestList from "../component/RequestList/RequestList";
import WrittenCustomerRequest from "../component/RequestItem/WrittenCustomerRequest";
import style from "./CustomerRequestList.module.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getAllCompletedRequestByCustomer,
  getAllSpecificCustomerRequestsAPI,
} from "../api";
import { setSpecificCustomerRequestList } from "../store/slice/CustomerRequestSlice";
import { setOpenSnackBar, setSnackBarMsg } from "../store/slice/SnackBarSlice";
import { TCompletedCustomerRequest, TCustomerRequest } from "../type";
import Loader from "../common/Loader";
import { setCompletedRequestListForCustomer } from "../store/slice/CompletedCustomerRequestSlice";
import CompletedWrittenCustomerRequest from "../component/RequestItem/CompletedWrittenCustomerRequest";

export default function CustomerRequestList() {
  // STORE STATE
  const dispatch = useAppDispatch();
  const { specificCustomerRequestList } = useAppSelector(
    (state) => state.customerRequest
  );
  const { completedRequestListForCustomer } = useAppSelector(
    (state) => state.completedCustomerRequest
  );
  // LOCAL STATE
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const fetchAllCompletedRequests = async () => {
    const customerId = localStorage.getItem("customerId");

    if (customerId) {
      await getAllCompletedRequestByCustomer(customerId).then(
        (
          res: {
            success: boolean;
            message: string;
            resultData: TCompletedCustomerRequest[];
          } | null
        ) => {
          if (res?.success) {
            dispatch(setCompletedRequestListForCustomer(res.resultData));
          }
        }
      );
    }
  };

  const fetchAllWrritenCustomerRequests = async () => {
    const customerId = localStorage.getItem("customerId");

    if (customerId) {
      await getAllSpecificCustomerRequestsAPI(customerId).then(
        (
          res: {
            success: boolean;
            message: string;
            resultData: TCustomerRequest[];
          } | null
        ) => {
          setIsLoading(false);

          if (res?.success) {
            dispatch(setSpecificCustomerRequestList(res.resultData));
            navigate("/lookupWrittenRequests");
          } else {
            if (res?.message) {
              dispatch(setOpenSnackBar(true));
              dispatch(setSnackBarMsg(res.message));
            } else {
              dispatch(setOpenSnackBar(true));
              dispatch(
                setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다.")
              );
            }
          }
        }
      );
    }
  };

  useEffect(() => {
    fetchAllCompletedRequests();
    fetchAllWrritenCustomerRequests();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={style.wrapper}>
      <div
        onClick={() => {
          navigate("/customerOptions");
        }}
        className={style.backBtn}
      >
        {"<"}
      </div>
      <Fragment>
        <RequestList title="답변된 문의">
          {completedRequestListForCustomer?.length > 0
            ? completedRequestListForCustomer.map((request, idx) => {
                return (
                  <CompletedWrittenCustomerRequest key={idx} data={request} />
                );
              })
            : null}
        </RequestList>
        <RequestList title="작성한 문의">
          {specificCustomerRequestList?.length > 0
            ? specificCustomerRequestList.map((request, idx) => {
                return (
                  !request.answered && (
                    <WrittenCustomerRequest key={idx} data={request} />
                  )
                );
              })
            : null}
        </RequestList>
      </Fragment>
    </div>
  );
}
