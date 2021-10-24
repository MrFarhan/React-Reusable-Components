import React from 'react';
import Button from '@material-ui/core/Button';
// import BackspaceOutlined from '@material-ui/icons/Backup';
import "../styles/FileUpload.scss";
import Loader from './Loader';
import BackspaceOutlined from '@material-ui/icons/BackspaceOutlined';


export default function FileUpload({ onChange, UploadFileName, helperText, className, fileUploadLoader }) {

    return (
        <div className="fileUploadMain">
            <input
                id="contained-button-file"
                type="file"
                onChange={onChange}
                className={className ? className + " TextInput" : "TextInput"}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    {"UPLOAD DOCUMENT"} &nbsp;
                    {fileUploadLoader ? <Loader height="20px" width="20px" /> : <BackspaceOutlined />}

                </Button> &nbsp;
                <span style={{ color: "white" }}>{UploadFileName}</span>
            </label>
            <p className="error">{helperText ? helperText : ""}</p>

        </div>
    );
}
