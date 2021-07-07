import { Grid } from "@material-ui/core";
import React from "react";
import "../styles/components/Form.scss";
import TextInput from "./TextInput";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { useTranslation } from 'react-i18next';
import FileUpload from "./FileUpload";

function Form({
  fields,
  button,
  id,
  handleFormData,
  data,
  submitForm,
  errors,
  touched,
  errorMessage,
  loading,
  temp,
  fileRef,
  UploadFileName,
  fileUploadLoader
}) {
  const { t } = useTranslation();
  return (
    <div className="form" id={id}>
      <form onSubmit={submitForm}>
        <div className="error-message">{errorMessage?.length ? `${t(errorMessage)} ${data?.date ? data?.date?.toDateString() : ""}` : ""} </div>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Grid
              item
              xs={12}
              sm={10}
              className="text-input"
              id={`${id} - text`}
            >

              {fields.map(
                (field) =>
                  !!(field.input === "text" && field?.side !== "right") ? (
                    <TextInput
                      placeHolder={field.placeholder}
                      type={field.type}
                      value={data[field.name]}
                      name={field.name}
                      helperText={touched[field.name] ? errors[field.name] : ""}
                      onChange={(e) => handleFormData(field.name, e)}
                      id={field.id ? field.id : `${id} - ${field.name}`}
                      disabled={field.disabled}
                      key={field.id ? field.id : `${id} - ${field.name}`}
                      max={field.max}
                      min={field.min}
                    />
                  ) :
                    !!(field.name === "file" && field?.side === "left") ? (
                      <FileUpload
                        UploadFileName={UploadFileName ? UploadFileName : null}
                        placeHolder={field.placeholder}
                        type={field.type}
                        file={field.name}
                        name={field.name}
                        helperText={touched[field.name] ? errors[field.name] : ""}
                        onChange={(e) => handleFormData(field.name, e)}
                        id={field.id ? field.id : `${id} - ${field.name}`}
                        fileUploadLoader={fileUploadLoader}
                      />
                    ) : null
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className="select-input"
            id={`${id} - dropdown`}
          >
            <Grid xs={12} sm={10} item>
              {fields.map(
                (field) =>
                  !!(field.input === "dropdown") &&
                  (field.type === "date" ? (
                    <TextInput
                      placeHolder={field.placeholder}
                      type={field.type}
                      value={data[field.name]}
                      name={field.name}
                      helperText={touched[field.name] ? errors[field.name] : ""}
                      onChange={(e) => handleFormData(field.name, e)}
                      id={field.id ? field.id : `${id} - ${field.name}`}
                      key={field.id ? field.id : `${id} - ${field.name}`}
                      min={field.min}
                      max={field.max}
                    />
                  ) : (
                    !field.hide && (
                      <Dropdown
                        placeholder={field.placeholder}
                        options={field.options}
                        className="dropdown"
                        value={data[field.name]}
                        onChange={(val) =>
                          handleFormData(field.name, val, field.input)
                        }
                        id={field.id ? field.id : `${id} - ${field.name}`}
                        helperText={
                          touched[field.name] && errors[field.name]
                            ? errors[field.name]["value"]
                            : ""
                        }
                        key={field.id ? field.id : `${id} - ${field.name}`}
                      />
                    )
                  ))
              )}
              {fields.map(
                (field) =>
                  !!(field?.input === "text" && field.side === "right") ? (
                    <TextInput
                      placeHolder={field.placeholder}
                      type={field.type}
                      value={data[field.name]}
                      name={field.name}
                      helperText={touched[field.name] ? errors[field.name] : ""}
                      onChange={(e) => handleFormData(field.name, e)}
                      id={field.id ? field.id : `${id} - ${field.name}`}
                      disabled={field.disabled}
                      key={field.id ? field.id : `${id} - ${field.name}`}
                      max={field.max}
                      min={field.min}
                    />
                  ) : !!(field.name === "file" && field?.side === "right") ? (
                    <FileUpload
                      UploadFileName={UploadFileName ? UploadFileName : null}
                      placeHolder={field.placeholder}
                      type={field.type}
                      file={field.name}
                      name={field.name}
                      helperText={touched[field.name] ? errors[field.name] : ""}
                      onChange={(e) => handleFormData(field.name, e)}
                      id={field.id ? field.id : `${id} - ${field.name}`}
                    />
                  ) : null
              )}
            </Grid>
          </Grid>
        </Grid>

        <Button
          title={button.title}
          type={button.type}
          className="button"
          disabled={loading}
          loader={loading}
        />
      </form>
    </div>
  );
}

export default Form;
