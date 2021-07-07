import React from "react";
import Select, { components } from "react-select";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import CheckIcon from "@material-ui/icons/Check";
import "../styles/components/Dropdown.scss";
import { useTranslation } from "react-i18next";

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

function Dropdown({ options, id, onChange, placeholder, className, defaultValue, name, helperText, onFocus, value }) {
  const { Option } = components;
  const IconOption = (props) => {
    return (
      <Option {...props}>
        {props.isSelected && <CheckIcon style={{ fontSize: widthScreen < 500 ? 10 : 20 }} className="option-icon" />}
        {props.data.label}
      </Option>
    );
  };

  const widthScreen = window.screen.width;

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#6c7075",
      backgroundColor: "none",
      marginLeft: state.isSelected ? "0px" : widthScreen < 500 ? "17px" : "23px",
      width: "80%",
      display: "flex",
      alignSelf: "flex-start",
      flexDirection: "row",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return {
        ...provided,
        opacity,
        transition,
        fontSize: widthScreen < 500 ? 10 : 14,
        color: "#6c7075",
        fontWeight: 700,
      };
    },
    menuList: (provided) => ({
      ...provided,
      fontSize: widthScreen < 500 ? 10 : 14,
      textAlign: "left",
      overflowX: "auto",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: 14,
      fontFamily: "Arial",
      display: "flex",
      flexDirection: "column",
      width: "calc(100% + 25px)",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "1em",
      fontWeight: 400,
    }),
  };

  const { t } = useTranslation();
  return (
    <div>
      <div
        className={className ? className + " Dropdown" : "Dropdown"}
        style={helperText ? { marginBottom: 10 } : { marginBottom: 20 }}
      >
        <Select
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          defaultValue={defaultValue}
          styles={customStyles}
          components={{ Option: IconOption, Placeholder }}
          name={name}
          onBlur={onFocus}
          value={value}
        />
        <UnfoldMoreIcon />
      </div>
      <p className="error">{helperText ? t(helperText) : ""}</p>
    </div>
  );
}

export default Dropdown;
