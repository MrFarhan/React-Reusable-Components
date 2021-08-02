import React, { useState } from "react";
import * as styles from "./CopyTextButton.scss";

const CopyTextButton = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyCodeFunc = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className='Code'>
      <pre>
        <button onClick={copyCodeFunc} className={styles.copyBtn}>
          {copied ? "Copied" : "Copy"}
        </button>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CopyTextButton;
