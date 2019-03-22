import React from "react";
import Clients from "../client/Clients";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-10">
        <Clients />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
}
