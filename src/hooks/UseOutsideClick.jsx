import React from "react";


const UseOutsideClick = (ref, callback) => {
  const clickHandler = (event) => {
    if (!ref?.current?.contains(event.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
  return null;
};

export default UseOutsideClick;
