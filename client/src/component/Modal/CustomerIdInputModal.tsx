import React, { Fragment, useState } from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";
import { getAllSpecificCustomerRequestsAPI } from "../../api";
import Loader from "../../common/Loader";
import { useAppDispatch } from "../../store/hooks";
import { setSpecificCustomerRequestList } from "../../store/slice/CustomerRequestSlice";
import {
  setOpenSnackBar,
  setSnackBarMsg,
} from "../../store/slice/SnackBarSlice";
import { TCustomerRequest } from "../../type";
import style from "./CustomerIdInputModal.module.css";

type TProps = {
  closeModal: () => void;
  closeModalByOutside?: boolean;
};
export default function CustomerIdInputModal({
  closeModal,
  closeModalByOutside,
}: TProps) {
  // STORE STATE
  const dispatch = useAppDispatch();
  // LOCAL STATE
  const [customerId, setCustomerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getRequests = () => {
    getAllSpecificCustomerRequestsAPI(customerId).then(
      (
        res: {
          success: boolean;
          message: string;
          resultData: TCustomerRequest[];
        } | null
      ) => {
        setIsLoading(false);
        closeModal();

        if (res?.success) {
          localStorage.setItem("customerId", customerId);
          navigate("/lookupWrittenRequests");
        } else {
          if (res?.message) {
            dispatch(setOpenSnackBar(true));
            dispatch(setSnackBarMsg(res.message));
          } else {
            dispatch(setOpenSnackBar(true));
            dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
          }
        }
      }
    );
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

          <div>
            <div className={style.title}>조회할 고객 ID</div>
            <input
              type="text"
              value={customerId}
              autoFocus
              className={style.idInput}
              onChange={(e) => {
                setCustomerId(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (customerId.length > 0) {
                    getRequests();
                  }
                }
                if (e.key === "Escape") {
                  closeModal();
                }
              }}
            />
            <div className={style.buttonContainer}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  getRequests();
                }}
              >
                조회
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>,
    document.getElementById("portal") as HTMLElement
  );
}
