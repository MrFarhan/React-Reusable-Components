import React from "react";
import "../styles/components/Textarea.scss";

function Textarea({ value, onChange, name, id, placeholder, disabled }) {
  return (
    <textarea
      className="Textarea"
      value={value}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      id={id}
      disabled={disabled}
    />
  );
}

export default Textarea;
