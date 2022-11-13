import React, { useState } from "react";
import { TCompletedCustomerRequest } from "../../type";
import style from "./CompletedWrittenCustomerRequest.module.css";
import ArrowDownSvg from "../../assets/arrow_down.svg";
import ArrowUpSvg from "../../assets/arrow_up.svg";

type TProps = {
  data: TCompletedCustomerRequest;
};
export default function CompletedWrittenCustomerRequest({ data }: TProps) {
  // LOCAL STATE
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div className={style.wrapper}>
      <div className={style.titleSection}>
        <div className={style.title}>{data.title}</div>
      </div>
      {/* titleSection END */}
      <div className={style.requestDescription}>
        <div>{data.contents}</div>
        <div className={style.writtenDate}>
          <div>{`고객 아이디: ${data.customerId}`}</div>
          <div>{`작성날짜: ${new Date(
            data.requestOriginDatetime
          ).toLocaleString("ko-KR")}`}</div>
        </div>
      </div>
      <div
        className={style.expandDetail}
        onClick={() => {
          setOpenDetail(!openDetail);
        }}
      >
        답변내용
        <img src={openDetail ? ArrowDownSvg : ArrowUpSvg} alt="arrowIcon" />
      </div>

      {openDetail && (
        <div className={style.detailDescription}>
          <p>{data.answeredContents}</p>
          <div
            className={style.answeredDate}
          >{`상담사: ${data.counselorName}`}</div>
          <div className={style.answeredDate}>{`작성날짜: ${new Date(
            data.createdDateTime as string
          ).toLocaleString("ko-KR")}`}</div>
        </div>
      )}
    </div>
  );
}
