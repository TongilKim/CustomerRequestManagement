/**
 * WRITTEN DATE: 2022/11/09
 * AUTHOR: TONGIL KIM
 * PURPOSE:  Loading circle
 */
import styles from "./Loader.module.css";
import React from "react";

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <div className={styles.ring}></div>
        <span className={styles.loading_text}>Loading...</span>
      </div>
    </div>
  );
}
