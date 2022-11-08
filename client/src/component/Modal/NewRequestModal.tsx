import React, { Fragment, useState } from "react";
import ReactDom from "react-dom";
import style from "./NewRequestModal.module.css";
import Loader from "../../common/Loader";

type TProps = {
  closeModal: () => void;
  closeModalByOutside?: boolean;
};

export default function NewRequestModal({
  closeModal,
  closeModalByOutside,
}: TProps) {
  const [isLoading, setIsLoading] = useState(true);

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
              <h2>신규 문의 접수</h2>
            </div>
            <div className={style.userInfoContainer}>
              <div className={style.userInfo}>
                <label htmlFor="user-id">ID</label>
                <input type="text" id="user-id" />
              </div>
              <div className={style.userInfo}>
                <label htmlFor="request-title">제목</label>
                <input type="text" id="request-title" />
              </div>
            </div>
            <div className={style.requestContent}>
              <label htmlFor="request-Content">문의</label>
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
