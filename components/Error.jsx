import React from "react";
import "../styles/components/Error.scss";
import { useTranslation } from 'react-i18next';


function Error({ error }) {
  const { t } = useTranslation();
  return <div className="Error">{t(error)}</div>;
}

export default Error;
