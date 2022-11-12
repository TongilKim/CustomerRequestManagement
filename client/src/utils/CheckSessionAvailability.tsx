import React from "react";
import { ACCESS_TOKEN } from "../constants";

export default function CheckSessionAvailability() {
  return localStorage.getItem(ACCESS_TOKEN);
}
