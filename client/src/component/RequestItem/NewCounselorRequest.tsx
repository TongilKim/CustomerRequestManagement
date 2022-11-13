import React, { useCallback, useState } from "react";
import style from "./NewCounselorRequest.module.css";
import AdditionSvg from "../../assets/addition.svg";
import ActiveAdditionSvg from "../../assets/addition_active.svg";
import WritingModal from "../Modal/WritingModal";
import { Role, TCustomerRequest } from "../../type";
import { assignCustomerRequestAPI } from "../../api";
import { useAppDispatch } from "../../store/hooks";
import {
  setOpenSnackBar,
  setSnackBarMsg,
} from "../../store/slice/SnackBarSlice";
import Loader from "../../common/Loader";
import { setNewCustomerRequestList } from "../../store/slice/CustomerRequestSlice";

type TProps = {
  dataIdx: number;
  data: TCustomerRequest;
};
export default function NewCounselorRequest({ data, dataIdx }: TProps) {
  // STORE STATE
  const dispatch = useAppDispatch();

  // LOCAL STATE
  const [openWritingModal, setOpenWritingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isAssignedRequest =
    data.pending &&
    localStorage.getItem("currentCounselorId") === data.counselorId.toString();
  const answerButtonAvailable = isAssignedRequest && data.pending;

  const closeModal = useCallback(() => {
    setOpenWritingModal(false);
  }, [openWritingModal]);

  const onClickAssignRequest = (id: number) => {
    setIsLoading(true);
    assignCustomerRequestAPI({ requestId: id }).then(
      (
        res: {
          success: boolean;
          message: string;
          resultData: TCustomerRequest[];
        } | null
      ) => {
        setIsLoading(false);

        if (res?.message) {
          dispatch(setNewCustomerRequestList(res.resultData));
          dispatch(setOpenSnackBar(true));
          dispatch(setSnackBarMsg(res.message));
        } else {
          dispatch(setOpenSnackBar(true));
          dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
        }
      }
    );
  };

  if (isLoading) return <Loader />;

  return (
    <div
      className={style.wrapper}
      style={{
        borderColor: isAssignedRequest ? "" : "#00ABFF",
      }}
    >
      <div className={style.titleSection}>
        <div className={style.titleNum}>{dataIdx}</div>
        <div className={style.title}>{data.title}</div>
        <div className={style.optionGroup}>
          <div
            className={style.addButton}
            style={{
              color: answerButtonAvailable ? "#00ABFF" : "",
              cursor:
                answerButtonAvailable && data.pending ? "pointer" : "default",
            }}
            onClick={() => {
              if (isAssignedRequest && data.pending) setOpenWritingModal(true);
            }}
          >
            <img
              src={
                isAssignedRequest && data.pending
                  ? ActiveAdditionSvg
                  : AdditionSvg
              }
              alt="adding_icon"
            />
            답변
          </div>
          <div
            className={style.addButton}
            style={{
              color: isAssignedRequest ? "" : "#00ABFF",
              cursor: isAssignedRequest ? "default" : "pointer",
            }}
            onClick={() => {
              if (!isAssignedRequest) {
                onClickAssignRequest(data.id);
              }
            }}
          >
            <img
              src={isAssignedRequest ? AdditionSvg : ActiveAdditionSvg}
              alt="adding_icon"
            />
            담당자 본인 지정
          </div>
        </div>
      </div>
      {/* titleSection END */}
      <div className={style.requestDescription}>
        <div>{data.contents}</div>
        <div className={style.writtenDate}>
          <div>{`고객 아이디: ${data.customerId}`}</div>
          <div>{`작성날짜: ${new Date(data.createdDateTime).toLocaleString(
            "ko-KR"
          )}`}</div>
        </div>
      </div>

      {openWritingModal && (
        <WritingModal
          role={Role.CounselorRole}
          closeModal={closeModal}
          selectedRequestInfo={data}
        />
      )}
    </div>
  );
}
