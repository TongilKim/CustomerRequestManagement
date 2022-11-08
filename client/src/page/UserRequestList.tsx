import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AnsweredRequestList from "../component/Customer/List/AnsweredRequestList";
import WrittenRequestList from "../component/Customer/List/WrittenRequestList";
import style from "./UserRequestList.module.css";

export default function UserRequestList() {
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
        <WrittenRequestList />
        <AnsweredRequestList />
      </Fragment>
    </div>
  );
}
