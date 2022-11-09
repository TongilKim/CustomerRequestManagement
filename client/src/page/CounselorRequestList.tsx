import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import CounselorRequest from "../component/RequestItem/CounselorRequest";
import RequestList from "../component/RequestList/RequestList";
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
        <RequestList title="답변한 리스트">
          <CounselorRequest answered={true} />
        </RequestList>
        <RequestList title="새로운 문의">
          <CounselorRequest answered={false} />
        </RequestList>
      </Fragment>
    </div>
  );
}
