import React from "react";

const Message = ({ variant, children }) => {
  return <div className={`alert ${variant} d-flex justify-content-center`}>{children}</div>;
};

Message.defaultProps = {
  variant: "alert-info",
};

export default Message;
