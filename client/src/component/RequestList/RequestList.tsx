import React from "react";
import style from "./RequestList.module.css";

type Tprops = {
  title: string;
  children: any;
};
export default function RequestList({ title, children }: Tprops) {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>{title}</div>
      <div className={style.container}>{children}</div>
    </div>
  );
}
