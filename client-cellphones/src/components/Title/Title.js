import React, { useEffect } from "react";
import PropTypes from 'prop-types';

const Title = ({ title }) => {
  useEffect(() => {
    document.title = title;
  });

  return <></>;
};

Title.propTypes = {
  title: PropTypes.string,
}

export default Title;