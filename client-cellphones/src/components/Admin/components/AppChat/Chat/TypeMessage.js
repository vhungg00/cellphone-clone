import React, {useState} from "react";
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from "../AdminChat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function TypeMessage({loading, onSubmit}) {
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!onSubmit || value === "") return;

    onSubmit(value);
    //set value after submit
    setValue("");
  };
  return (
    <div className={cx("formWrapper")}>
      <form onSubmit={handleFormSubmit}>
        <div className={cx("form-group")}>
          <label htmlFor="exampleFormControlTextarea1">Tin nhắn *</label>
          <textarea
            className={cx("form-control")}
            id="exampleFormControlTextarea1"
            rows="3"
            value={value}
            onChange={handleValueChange}
          ></textarea>
        </div>
        <button type="submit">
          { loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}
          <p>Gửi</p></button>
      </form>
  </div>
  );
}

TypeMessage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default TypeMessage;
