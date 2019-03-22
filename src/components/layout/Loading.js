import React from "react";
import loader from "./loading.gif";

export default function Loading() {
  return (
    <div>
      <img
        src={loader}
        alt="Loading..."
        style={{ width: "250px", margin: "auto", display: "block" }}
      />
    </div>
  );
}
