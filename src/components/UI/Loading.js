import React from "react";
import { Spinner } from "react-bootstrap";
import Icon from "../../assets/images/icon.png";
export default function Loading({ color, animation }) {
  return (
    <div>
      <img src={Icon} alt="Image" className="loader-img" />
      <div className="loader-div">
        <Spinner
          className="spinner-center"
          animation={animation}
          color={color}
          size={200}
        />
      </div>
    </div>
  );
}
