import React, { Fragment, useCallback, useState } from "react";
import style from "./CustomerOptions.module.css";
import { useNavigate } from "react-router-dom";
import NewRequestModal from "../component/Modal/NewRequestModal";

export default function CustomerOptions() {
  const navigate = useNavigate();
  const [openNewRequest, setOpenNewRequest] = useState(false);

  const closeModal = useCallback(() => {
    setOpenNewRequest(false);
  }, []);

  return (
    <Fragment>
      <div className={style.container}>
        <div
          onClick={() => {
            navigate("/");
          }}
          className={style.backBtn}
        >
          {"<"}
        </div>
        <div className={style.title}>고객 문의</div>
        <div>
          <button
            type="submit"
            onClick={() => {
              navigate("/lookupWrittenRequests");
            }}
            className={style.submitButton}
          >
            문의 목록 조회
          </button>
          <button
            type="submit"
            onClick={() => {
              setOpenNewRequest(true);
            }}
            className={style.submitButton}
          >
            문의 작성
          </button>
        </div>
      </div>

      {openNewRequest && (
        <NewRequestModal closeModal={closeModal} closeModalByOutside={false} />
      )}
    </Fragment>
  );
}
