import React from "react";
import loginImg from "../../assets/images/login-img.svg";
import Icon from "../../assets/images/icon.png";
import { constants } from "../../constants/constants";
function LeftSide() {
 
  return (
    <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
      <div style={{ maxWidth: "25rem" }}>
        <div className="text-center mb-5">
          <img src={Icon} alt="Image" className="left-side-changes-logo" />{" "}
        </div>
        <div className="mb-5">
          <h2 className="color-900 text-center">
            {constants.website_name} Let's Management Better
          </h2>
        </div>
        
        <div className="">
          <img src={loginImg} alt="login-img" />
        </div>
      </div>
    </div>
  );
}
export default LeftSide;
