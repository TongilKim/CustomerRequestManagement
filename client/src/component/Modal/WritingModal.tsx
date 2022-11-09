import React, { Fragment, useState } from "react";
import ReactDom from "react-dom";
import style from "./WritingModal.module.css";
import Loader from "../../common/Loader";
import { Role } from "../../type";

type TProps = {
  closeModal: () => void;
  closeModalByOutside?: boolean;
  role: Role;
};

export default function WritingModal({
  closeModal,
  closeModalByOutside,
  role,
}: TProps) {
  const [isLoading, setIsLoading] = useState(true);
  const customerRole = role === Role.CustomerRole;

  // if (isLoading) return <Loader />;
  return ReactDom.createPortal(
    <Fragment>
      <div
        className={style.modal_overlay}
        onClick={() => {
          if (closeModalByOutside) {
            closeModal();
          }
        }}
      >
        <div className={style.modal_container}>
          <button
            className={style.modal_close_btn}
            onClick={() => {
              closeModal();
            }}
          >
            X
          </button>
          <form action="">
            <div className={style.title}>
              <h2>{customerRole ? "신규 문의 접수" : "문의 답변"}</h2>
              {!customerRole && (
                <div>
                  <div>상담사: Tongil</div>
                  <div>작성 날짜: 2022/11/09</div>
                </div>
              )}
            </div>
            <div className={style.userInfoContainer}>
              <div className={style.userInfo}>
                <label htmlFor="user-id">
                  {customerRole ? "ID" : "고객 ID"}
                </label>
                <input
                  type="text"
                  id="user-id"
                  disabled={!customerRole}
                  value={customerRole ? "" : "kkimtt"}
                  style={
                    !customerRole
                      ? {
                          backgroundColor: "#e8e8e8",
                          textOverflow: "ellipsis",
                        }
                      : {}
                  }
                />
              </div>
              <div className={style.userInfo}>
                <label htmlFor="request-title">제목</label>
                <input
                  type="text"
                  id="request-title"
                  value={
                    customerRole
                      ? ""
                      : "문의요청 타이틀 입니다. alskdjflasjdflkjasldkfjlasf"
                  }
                  disabled={!customerRole}
                  style={
                    !customerRole
                      ? {
                          backgroundColor: "#e8e8e8",
                          textOverflow: "ellipsis",
                        }
                      : {}
                  }
                />
              </div>
            </div>
            <div className={style.requestContent}>
              <label htmlFor="request-Content">내용</label>
              <textarea name="" id="request-Content"></textarea>
            </div>
            <div className={style.buttonContainer}>
              <input type="submit" value="작성 완료" />
              <input
                type="reset"
                onClick={() => {
                  closeModal();
                }}
                value="취소"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>,
    document.getElementById("portal") as HTMLElement
  );
}
