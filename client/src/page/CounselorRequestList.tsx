import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import CompletedRequestList from "../component/Counselor/List/CompletedRequestList";
import CustomerRequestList from "../component/Counselor/List/CustomerRequestList";
import style from "./CustomerRequestList.module.css";
export default function CounselorRequestList() {
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
        <CompletedRequestList />
        <CustomerRequestList />
      </Fragment>
    </div>
  );
}
