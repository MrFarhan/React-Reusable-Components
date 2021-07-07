import React from 'react';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import "../styles/components/FileUpload.scss";
import { useTranslation } from 'react-i18next';
import Loader from './Loader';


export default function FileUpload({ onChange, UploadFileName, helperText, className, fileUploadLoader }) {
    const { t } = useTranslation();

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
                    {t("UPLOAD DOCUMENT")} &nbsp;
                    {fileUploadLoader ? <Loader  height="20px" width="20px"/> : <BackupIcon />}

                </Button> &nbsp;
                <span style={{ color: "white" }}>{UploadFileName}</span>
            </label>
            <p className="error">{helperText ? t(helperText) : ""}</p>

        </div>
    );
}
