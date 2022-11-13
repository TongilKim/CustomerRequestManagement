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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getAllSpecificCustomerRequestsAPI(customerId).then(
      (res: TCustomerRequest[] | null) => {
        setIsLoading(false);
        closeModal();

        if (res && res.length > 0) {
          navigate("/lookupWrittenRequests");
          dispatch(setSpecificCustomerRequestList(res));
        } else {
          dispatch(setOpenSnackBar(true));
          dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
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
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
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
                className={style.idInput}
                onChange={(e) => {
                  setCustomerId(e.target.value);
                }}
              />
              <div className={style.buttonContainer}>
                <input type="submit" value="조회" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>,
    document.getElementById("portal") as HTMLElement
  );
}
