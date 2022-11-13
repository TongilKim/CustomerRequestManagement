import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAvailableCustomerRequestsAPI } from "../api";
import CounselorRequest from "../component/RequestItem/CounselorRequest";
import RequestList from "../component/RequestList/RequestList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setNewCustomerRequestList } from "../store/slice/CustomerRequestSlice";
import { setOpenSnackBar, setSnackBarMsg } from "../store/slice/SnackBarSlice";
import { TCustomerRequest } from "../type";
import style from "./CustomerRequestList.module.css";
export default function CounselorRequestList() {
  // STORE STATE
  const { newCustomerRequestList } = useAppSelector(
    (state) => state.customerRequest
  );
  const dispatch = useAppDispatch();

  // LOCAL STATE
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
                setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다.")
              );
            }
          }
        }
      );
    };
    fetchData();
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
          {/* <CounselorRequest answered={true} />
          <CounselorRequest answered={true} /> */}
        </RequestList>
        <RequestList title="새로운 문의">
          {newCustomerRequestList.length > 0
            ? newCustomerRequestList.map((request, idx) => {
                return (
                  <CounselorRequest
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
