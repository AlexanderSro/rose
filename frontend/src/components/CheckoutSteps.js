import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";

const DynamicProgressBar = ({ step }) => {
  const renderLabel = (label, isActive, isClickable, path) => {
    const style = {
      textDecoration: "none", // Remove underline
      cursor: isClickable ? "pointer" : "default", // Change cursor if clickable
    };

    return isActive ? (
      isClickable ? (
        <Link to={path} style={style}>
          {label}
        </Link>
      ) : (
        <span style={style}>{label}</span>
      )
    ) : (
      label
    );
  };

  return (
    <div className="justify-content-center my-3">
      <ProgressBar>
        <ProgressBar
          label={renderLabel("Informatii", true, step >= 1, "/shipping")}
          animated={step === 1}
          variant={step >= 1 ? "info" : "secondary"}
          now={34}
          key={1}
        />
        <ProgressBar
          label={renderLabel("Sumar", true, step >= 2, "/summary")}
          animated={step === 2}
          variant={step >= 2 ? "warning" : "warning"}
          now={34}
          key={2}
        />
        <ProgressBar
          label={renderLabel("Plata", true, step >= 3, "/placeorder")}
          animated={step === 3}
          variant={step >= 3 ? "danger" : "danger"}
          now={34}
          key={3}
        />
      </ProgressBar>
    </div>
  );
};

export default DynamicProgressBar;

