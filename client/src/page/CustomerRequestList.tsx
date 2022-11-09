import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import RequestList from "../component/RequestList/RequestList";
import CustomerRequest from "../component/RequestItem/CustomerRequest";
import style from "./CustomerRequestList.module.css";

export default function CustomerRequestList() {
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
          <CustomerRequest answered={true} />
        </RequestList>
        <RequestList title="작성한 문의">
          <CustomerRequest answered={false} />
        </RequestList>
      </Fragment>
    </div>
  );
}
