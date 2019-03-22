import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Link to="/client/add" className="btn btn-danger btn-black">
      <i className="fas fa-plus" />Add New
    </Link>
  );
}
