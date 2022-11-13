import React, { Fragment, useState } from "react";
import ReactDom from "react-dom";
import style from "./WritingModal.module.css";
import Loader from "../../common/Loader";
import { Role } from "../../type";
import { createNewCustomerRequestAPI } from "../../api";
import { useAppDispatch } from "../../store/hooks";
import {
  setOpenSnackBar,
  setSnackBarMsg,
} from "../../store/slice/SnackBarSlice";

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
  // STORE STATE
  const dispatch = useAppDispatch();
  // LOCAL STATE
  const [isLoading, setIsLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [requestTitle, setRequestTitle] = useState("");
  const [requestContents, setRequestContents] = useState("");

  const customerRole = role === Role.CustomerRole;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    createNewCustomerRequestAPI({
      title: requestTitle,
      customerId: customerId,
      contents: requestContents,
    }).then((res: { success: boolean; message: string } | null) => {
      if (res?.success) {
        dispatch(setOpenSnackBar(true));
        dispatch(setSnackBarMsg(res.message));
      } else {
        dispatch(setOpenSnackBar(true));
        dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
      }

      setIsLoading(false);
      closeModal();
    });
  };

  if (isLoading) return <Loader />;

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
          <form onSubmit={(e) => onSubmit(e)}>
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
                  value={customerRole ? customerId : "kkimtt"}
                  style={
                    !customerRole
                      ? {
                          backgroundColor: "#e8e8e8",
                          textOverflow: "ellipsis",
                        }
                      : {}
                  }
                  onChange={(e) => {
                    setCustomerId(e.target.value);
                  }}
                />
              </div>
              <div className={style.userInfo}>
                <label htmlFor="request-title">제목</label>
                <input
                  type="text"
                  id="request-title"
                  value={
                    customerRole
                      ? requestTitle
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
                  onChange={(e) => {
                    setRequestTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={style.requestContent}>
              <label htmlFor="request-Content">내용</label>
              <textarea
                name=""
                id="request-Content"
                onChange={(e) => {
                  setRequestContents(e.target.value);
                }}
              ></textarea>
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
