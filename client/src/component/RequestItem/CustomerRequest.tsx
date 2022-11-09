import React, { useState } from "react";
import style from "./CustomerRequest.module.css";
import AdditionSvg from "../../assets/addition.svg";
import DeleteSvg from "../../assets/delete.svg";
import ArrowDownSvg from "../../assets/arrow_down.svg";
import ArrowUpSvg from "../../assets/arrow_up.svg";

type TProps = {
  answered: boolean;
};
export default function CustomerRequest({ answered }: TProps) {
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div className={style.wrapper}>
      <div className={style.titleSection}>
        <div className={style.titleNum}>1</div>
        <div className={style.title}>문의요청 타이틀 입니다.</div>
        <div className={style.optionGroup}>
          {!answered && (
            <div className={style.addButton} onClick={() => {}}>
              <img src={DeleteSvg} alt="delete_icon" />
              삭제
            </div>
          )}
        </div>
      </div>
      {/* titleSection END */}
      <div className={style.requestDescription}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
        <div className={style.writtenDate}>작성날짜: 2022/11/09</div>
      </div>
      {answered && (
        <div
          className={style.expandDetail}
          onClick={() => {
            setOpenDetail(!openDetail);
          }}
        >
          답변내용
          <img src={openDetail ? ArrowDownSvg : ArrowUpSvg} alt="arrowIcon" />
        </div>
      )}

      {openDetail && (
        <div className={style.detailDescription}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className={style.answeredDate}>상담사: 김통일</div>
          <div className={style.answeredDate}>작성날짜: 2022/11/09</div>
        </div>
      )}
    </div>
  );
}
