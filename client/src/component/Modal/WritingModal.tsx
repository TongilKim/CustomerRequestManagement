import React, { Fragment, useState } from "react";
import ReactDom from "react-dom";
import style from "./WritingModal.module.css";
import Loader from "../../common/Loader";
import {
  Role,
  TCompletedCustomerRequest,
  TCustomerRequest,
  TRequestResponse,
} from "../../type";
import {
  createCompletedCustomerRequestAPI,
  createNewCustomerRequestAPI,
  deleteCustomerRequestAPI,
  getAllCompletedRequestByCounselor,
} from "../../api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setOpenSnackBar,
  setSnackBarMsg,
} from "../../store/slice/SnackBarSlice";
import { setCompletedRequestListForCounselor } from "../../store/slice/CompletedCustomerRequestSlice";
import { setNewCustomerRequestList } from "../../store/slice/CustomerRequestSlice";

type TProps = {
  closeModal: () => void;
  closeModalByOutside?: boolean;
  role: Role;
  selectedRequestInfo?: TCustomerRequest;
};

export default function WritingModal({
  closeModal,
  closeModalByOutside,
  role,
  selectedRequestInfo,
}: TProps) {
  // STORE STATE
  const dispatch = useAppDispatch();
  const { newCustomerRequestList } = useAppSelector(
    (state) => state.customerRequest
  );

  // LOCAL STATE
  const [isLoading, setIsLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [requestTitle, setRequestTitle] = useState("");
  const [requestContents, setRequestContents] = useState("");

  const customerRole = role === Role.CustomerRole;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (customerRole) {
      createNewCustomerRequestAPI({
        title: requestTitle,
        customerId: customerId,
        contents: requestContents,
      }).then((res: TRequestResponse | null) => {
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
    } else {
      if (selectedRequestInfo) {
        // 신규 답변된 문의 생성
        createCompletedCustomerRequestAPI({
          title: selectedRequestInfo.title,
          contents: selectedRequestInfo.contents,
          customerId: selectedRequestInfo.customerId,
          requestOriginDatetime: selectedRequestInfo.createdDateTime,
          answeredContents: requestContents,
          counselorName: selectedRequestInfo.counselorName,
          counselorId: selectedRequestInfo.counselorId,
        }).then((res: TRequestResponse | null) => {
          if (res?.success) {
            // delete 답변한 문의
            deleteCustomerRequestAPI({
              customerId: selectedRequestInfo.customerId,
              requestId: selectedRequestInfo.id,
            }).then(
              (
                res: {
                  success: boolean;
                  message: string;
                  resultData: TCustomerRequest[];
                } | null
              ) => {
                if (res?.success) {
                  const newRequestsAfterDelete = newCustomerRequestList.filter(
                    (request) => {
                      return request.id !== selectedRequestInfo.id;
                    }
                  );

                  dispatch(setNewCustomerRequestList(newRequestsAfterDelete));

                  //fetch 답변한 문의 리스트
                  getAllCompletedRequestByCounselor(
                    Number(localStorage.getItem("currentCounselorId"))
                  ).then((res: TRequestResponse | null) => {
                    if (res?.success) {
                      dispatch(
                        setCompletedRequestListForCounselor(
                          res.resultData as TCompletedCustomerRequest[]
                        )
                      );
                    }
                  });
                }
              }
            );
            dispatch(setOpenSnackBar(true));
            dispatch(setSnackBarMsg(res.message));
          } else {
            dispatch(setOpenSnackBar(true));
            dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
          }
        });
        setIsLoading(false);
        closeModal();
      }
    }
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
                  <div>{`상담사: ${selectedRequestInfo?.counselorName}`}</div>
                  <div>{`작성 날짜: ${new Date().toLocaleString()}`}</div>
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
                  value={
                    customerRole ? customerId : selectedRequestInfo?.customerId
                  }
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
                    customerRole ? requestTitle : selectedRequestInfo?.title
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
