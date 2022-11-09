import React, { Fragment, useCallback, useState } from "react";
import style from "./CustomerOptions.module.css";
import { useNavigate } from "react-router-dom";
import WritingModal from "../component/Modal/WritingModal";
import { Role } from "../type";

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
            문의 접수
          </button>
        </div>
      </div>

      {openNewRequest && (
        <WritingModal
          role={Role.CustomerRole}
          closeModal={closeModal}
          closeModalByOutside={false}
        />
      )}
    </Fragment>
  );
}
