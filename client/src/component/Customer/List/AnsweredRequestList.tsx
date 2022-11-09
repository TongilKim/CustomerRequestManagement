import React from "react";
import RequestItem from "../../RequestItem/RequestItem";
import style from "./AnsweredRequestList.module.css";

export default function AnsweredRequestList() {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>답변한 문의</div>
      <div className={style.container}>
        <RequestItem answered={true} />
        <RequestItem answered={true} />
      </div>
    </div>
  );
}
