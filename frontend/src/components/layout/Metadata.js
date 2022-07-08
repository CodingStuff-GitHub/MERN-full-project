import React from "react";
import Helmet from "react-helmet";
const Metadata = ({ title }) => {
  return (
    <Helmet>
      <div>{title}</div>
    </Helmet>
  );
};

export default Metadata;
