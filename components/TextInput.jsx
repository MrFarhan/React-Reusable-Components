import React from "react";
import "../styles/components/TextInput.scss";
import DateFnsUtils from "@date-io/date-fns";
import { useTranslation } from 'react-i18next';

import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";

function TextInput({
  type,
  placeHolder,
  value,
  onChange,
  name,
  id,
  helperText,
  className,
  disabled,
  min,
  max,
}) {
  const { t } = useTranslation();

  return (
    <div>
      {type !== "date" ? (
        <input
          type={type}
          className={className ? className + " TextInput" : "TextInput"}
          placeholder={placeHolder ? placeHolder : ""}
          value={value}
          onChange={onChange}
          name={name}
          key={id}
          id={id}
          disabled={disabled}
        />
      ) : (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="inline"
            format="dd/MM/yyyy"
            id="date-picker-inline"
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            className={className ? className + " TextInput" : "TextInput"}
            autoOk
            strictCompareDates="true"
            minDate={min}
            maxDate={max}
          />
        </MuiPickersUtilsProvider>
      )}
      <p className="error">{helperText ? t(helperText) : ""}</p>
    </div>
  );
}
export default TextInput;
