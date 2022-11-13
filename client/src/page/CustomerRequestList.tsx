import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import RequestList from "../component/RequestList/RequestList";
import CustomerRequest from "../component/RequestItem/CustomerRequest";
import style from "./CustomerRequestList.module.css";
import { useAppSelector } from "../store/hooks";

export default function CustomerRequestList() {
  // STORE STATE
  const { specificCustomerRequestList } = useAppSelector(
    (state) => state.customerRequest
  );
  console.log("specificCustomerRequestList: ", specificCustomerRequestList);
  // LOCAL STATE
  const navigate = useNavigate();

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
