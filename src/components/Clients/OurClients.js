import React, { useEffect, useState } from "react";
import lgAvatar3 from "../../assets/images/lg/avatar3.jpg";
import { Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { emailValidator } from "../../helper/emailValidator";
import Swal from "sweetalert2";
import { updateMember } from "../../api/member/member-api";

function OurClients(props) {
  const isMember = props.isMember;
  const [isModal, setIsModal] = useState(false);
  const [MembersData, setMembersData] = useState([]);
  const [firstName, setFirstName] = useState(props.data.firstName);
  const [lastName, setLastName] = useState(props.data.lastName);
  const [email, setEmail] = useState(props.data.email);
  const [mobile, setMobile] = useState(props.data.mobile);
  const [joiningDate, setJoiningDate] = useState(props.data.joiningDate);
  const [designation, setDesignation] = useState(props.data.designation);
  const [employeeId, setEmployeeId] = useState(props.data.employeeId);
  const [loading, setloading] = useState(false);
  const Cred = useSelector((state) => state.Cred);
  return (
    <>
      <div className="card teacher-card">
        <div className="card-body  d-flex">
          <div className="profile-av pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
            <img
              src={lgAvatar3}
              alt=""
              className="avatar xl rounded-circle img-thumbnail shadow-sm"
            />
            <div className="about-info d-flex align-items-center mt-1 justify-content-center flex-column">
              <h6 className="mb-0 fw-bold d-block fs-6 mt-2">{employeeId}</h6>
            </div>
          </div>
          <div className="teacher-info border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
            {isMember ? (
              <span className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-11 mb-0 mt-1">
                {firstName + " " + lastName}
              </span>
            ) : (
              <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted">
                {firstName + " " + lastName}
              </span>
            )}
            <div className="video-setting-icon mt-3 pt-3 border-top">
              <p>Joining Date : {joiningDate}</p>
            </div>
            {isMember ? (
              <div className="d-flex flex-wrap align-items-center ct-btn-set">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModal(true);
                  }}
                  href="chat-app"
                  className="btn btn-dark btn-sm mt-1 me-1"
                >
                  <i className="icofont-edit me-2 fs-6"></i>Edit
                </a>
                <a href="client-profile" className="btn btn-dark btn-sm mt-1">
                  <i className="icofont-invisible me-2 fs-6"></i>Profile
                </a>
              </div>
            ) : (
              <div className="d-flex flex-wrap align-items-center ct-btn-set">
                <a href="chat-app" className="btn btn-dark btn-sm mt-1 me-1">
                  <i className="icofont-ui-text-chat me-2 fs-6"></i>Chat
                </a>
                <a href="client-profile" className="btn btn-dark btn-sm mt-1">
                  <i className="icofont-invisible me-2 fs-6"></i>Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        centered
        show={isModal}
        size="lg"
        onHide={() => {
          setIsModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput877"
                className="form-label"
              >
                Employee First Name
              </label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="exampleFormControlInput877"
                placeholder="First Name"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput878"
                className="form-label"
              >
                Employee Last Name
              </label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="exampleFormControlInput878"
                placeholder="Last Name"
              />
            </div>

                <div className="mb-3">

                    <label
                      htmlFor="exampleFormControlInput2778"
                      className="form-label"
                    >
                      Joining Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={joiningDate}
                      onChange={(e) => setJoiningDate(e.target.value)}
                      id="exampleFormControlInput2778"
                    />

                </div>
            <div className="deadline-form">
              <form>
                <div className="row g-3 mb-3">
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleFormControlInput777"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput777"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Id"
                    />
                  </div>
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleFormControlInput879"
                      className="form-label"
                    >
                      Employee ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      id="exampleFormControlInput879"
                      placeholder="ID"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Spinner
              className="spinner-center"
              animation={"border"}
              color={"dark"}
              size={200}
            />
          ) : (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsModal(false);
                }}
              >
                Done
              </button>
              <button onClick={async ()=>{
                const emailError = emailValidator(email)
                if (emailError){
                    setIsModal(false)
                    Swal.fire("Invalid Email ",emailError,"error").then((e)=>{
                        if (e.isConfirmed){
                            setIsModal(true)
                        }
                      })
                    return
                }
                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    designation: designation,
                    email: email,
                    mobile: mobile,
                    joiningDate: joiningDate,
                    employeeId: employeeId,
                    id:props.data.id
                  };
                  setloading(true)
                  console.log(data)
                try {
                    const resp = await updateMember(data,Cred.token)
                    setIsModal(false)
                } catch (error) {
                    console.log(error)
                }
                setloading(false)
              }} type="button" className="btn btn-primary">
                Update
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OurClients;
