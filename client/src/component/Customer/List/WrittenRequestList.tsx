import React from "react";
import style from "./WrittenRequestList.module.css";

export default function WrittenRequestList() {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>작성한 문의</div>
      <div className={style.container}></div>
    </div>
  );
}
