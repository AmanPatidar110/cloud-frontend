import React from "react";

const Loader = ({ title }) => {
  return (
    <div className="loader">
      <div className="loader-imagecontainer">
        <img
          className="loader-imagecontainer-image"
          src={"./resources/logo-mini.webp"}
          alt="In-House Cloud. loading"
        />
      </div>

      <p className="loader-text">{title}</p>
    </div>
  );
};

export default Loader;
