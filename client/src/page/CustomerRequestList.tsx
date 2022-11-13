import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestList from "../component/RequestList/RequestList";
import CustomerRequest from "../component/RequestItem/CustomerRequest";
import style from "./CustomerRequestList.module.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllSpecificCustomerRequestsAPI } from "../api";
import { setSpecificCustomerRequestList } from "../store/slice/CustomerRequestSlice";
import { setOpenSnackBar, setSnackBarMsg } from "../store/slice/SnackBarSlice";
import { TCustomerRequest } from "../type";
import Loader from "../common/Loader";

export default function CustomerRequestList() {
  // STORE STATE
  const dispatch = useAppDispatch();
  const { specificCustomerRequestList } = useAppSelector(
    (state) => state.customerRequest
  );

  // LOCAL STATE
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const customerId = localStorage.getItem("customerId");

      if (customerId) {
        getAllSpecificCustomerRequestsAPI(customerId).then(
          (
            res: {
              success: boolean;
              message: string;
              resultData: TCustomerRequest[];
            } | null
          ) => {
            setIsLoading(false);

            if (res && res.success) {
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
    fetchData();
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
          {/* <CustomerRequest answered={false} data={null} /> */}
        </RequestList>
        <RequestList title="작성한 문의">
          {specificCustomerRequestList.length > 0
            ? specificCustomerRequestList.map((request, idx) => {
                return (
                  <CustomerRequest
                    key={idx}
                    answered={false}
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
