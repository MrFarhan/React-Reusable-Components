import React from "react";
import ReactLoading from "react-loading";
import "../styles/Loader.scss";

function Loader({ type, color, height, width }) {
  return (
    <div className="Loader">
      <ReactLoading
        type={type ? type : "bars"}
        color={color ? color : "#1181f2"}
        height={height ? height : 64}
        width={width ? width : 64}
      />
    </div>
  );
}
export default Loader;
