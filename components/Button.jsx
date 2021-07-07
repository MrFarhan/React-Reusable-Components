import React from "react";
import ReactLoading from "react-loading";
import "../styles/components/Button.scss";
import { Button } from "@material-ui/core";

function BtnPrimary({
  title,
  backgroundColor,
  type,
  loader,
  color,
  onClick,
  disabled,
  loaderColour,
  className,
  border,
  order,
  basket,
  icon
}) {
  return (
    <Button
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#1181F2",
        color: color ? color : "#fff",
        border: border,
      }}
      className={className ? className + " Button" : "Button"}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {loader ? (
        <div
          className="loader-span"
          style={{ width: order ? "104px" : "auto" }}
        >
          <ReactLoading
            type="bars"
            color={loaderColour ? loaderColour : "#fff"}
            width={40}
            height={40}
          />
        </div>
      ) : (
        <div
          className="title"
          style={{
            fontWeight: order || basket ? "700" : "400",
            fontFamily: order || basket ? "sanFranciscoPro" : "Arial",
          }}
        >
          {title}
          <span className="icon">
            &nbsp;
            {icon}
          </span>
        </div>
      )}
    </Button>
  );
}

export default BtnPrimary;
