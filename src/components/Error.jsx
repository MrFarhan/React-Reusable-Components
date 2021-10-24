import React from "react";
import "../styles/Error.scss";


function Error({ error }) {
  return <div className="Error">{error}</div>;
}

export default Error;
