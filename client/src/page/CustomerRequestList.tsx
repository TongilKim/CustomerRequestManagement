import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AnsweredRequestList from "../component/Customer/List/AnsweredRequestList";
import WrittenRequestList from "../component/Customer/List/WrittenRequestList";
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
        <AnsweredRequestList />
        <WrittenRequestList />
      </Fragment>
    </div>
  );
}
