import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import OurClients from "../../components/Clients/OurClients";
import PageHeader from "../../components/common/PageHeader";
import {
  addMember,
  getAllDesignation,
  getAllMembers,
  updateMember
} from "../../api/member/member-api";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {emailValidator} from "../../helper/emailValidator"
import {passwordValidator} from "../../helper/passwordValidator"
import mobileValidator from "../../helper/mobileValidator"
function Members() {
  const [isModal, setIsModal] = useState(false);
  const [MembersData, setMembersData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [allDesignations, setAllDesgination] = useState([]);
  const [loading,setloading]=useState(false)
  const Cred = useSelector((state) => state.Cred);
  async function get() {
    try {
      const MembersArrays = await getAllMembers(Cred.token);
      const DesignationArray = await getAllDesignation(Cred.token);

      setMembersData(MembersArrays.status === 200 ? MembersArrays.data : []);
      setAllDesgination(
        DesignationArray.status === 200 ? DesignationArray.data : []
      );
      setDesignation(DesignationArray.status==200?DesignationArray.data[0].id:"")
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: "Can't Fetch Employees. Please try After Some Time",
        icon: "error",
        confirmButtonText: "ok",
        
      })
    }
  }
  useEffect(() => {
    get();
  }, []);
  async function AddMember(browser) {
    browser.preventDefault();
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password)
    const mobileError = mobileValidator(mobile)
    if (mobileError){

        setIsModal(false)
        Swal.fire("Invalid Mobile Number ",mobileError,"error").then((e)=>{
            if (e.isConfirmed){
                setIsModal(true)
            }
          })
        return
    }
    if (!firstName||!lastName||!joiningDate||!mobile||!password||!email||!designation||!employeeId){
        setIsModal(false)
        Swal.fire("Please fill the from ","Make sure you fill each parameters","error").then((e)=>{
            if (e.isConfirmed){
                setIsModal(true)
            }
          })
        return
    }
    if (emailError){
        setIsModal(false)
        Swal.fire("Invalid Email ",emailError,"error").then((e)=>{
            if (e.isConfirmed){
                setIsModal(true)
            }
          })
        return
    }
    if (passwordError){
        setIsModal(false)
        Swal.fire("Invalid Password ",passwordError,"error").then((e)=>{
            if (e.isConfirmed){
                setIsModal(true)
            }
          })
        return
    }
    setloading(true)
    const data = {
      firstName: firstName,
      lastName: lastName,

      designation: designation,
      email: email,
      mobile: mobile,
      joiningDate: joiningDate,
      employeeId: employeeId,
      password: password,
    };
    const resp = await addMember(Cred.token, data);
    if (resp == 201) {
        const allMembers =MembersData;
        allMembers.push(data)
    setMembersData(allMembers);
      setFirstName("");
      setLastName("");
      setDesignation("");
      setEmail("");
      setEmployeeId("");
      setJoiningDate("");
      setMobile("");
      setPassword("")
    }
    setIsModal(false)
    setloading(false)
  }
  async function UpdateMember(data,token){
    const resp = updateMember(data,token);
  }
  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Employee"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-dark btn-set-task w-sm-100 me-2"
                onClick={() => {
                  setIsModal(true);
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Employee
              </button>
            </div>
          );
        }}
      />
      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
        {MembersData.map((data, i) => {

          return (
            <div key={data.mobile} className="col">
              <OurClients
               data={data}
                isMember={true}
                allDesignations={allDesignations}
                updateMember={UpdateMember}
              />
            </div>
          );
        })}
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

            <div className="deadline-form">
              <form>
                <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label
                    className="form-label"
                  >
                    Designation
                  </label>
                  <select
                    className="form-select"
                    value={designation}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setDesignation(selectedValue);
                    }}
                  >
                    {allDesignations.map((value, i) => {
                      return (
                        <option value={value.id} key={value.id}>
                          {value.designationName} ({value.id})
                        </option>
                      );
                    })}
                  </select>
                </div>
                  <div className="col-sm-6">
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
                </div>
                
                <div className="row g-3 mb-3">
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleFormControlInput177"
                      className="form-label"
                    >
                      Mobile
                    </label>
                    <input
                    maxLength={'10'}
                      type="text"
                      className="form-control"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      id="exampleFormControlInput177"
                      placeholder="Mobile"
                    />
                  </div>
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleFormControlInput277"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="Password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="exampleFormControlInput277"
                      placeholder="Password"
                    />
                  </div>
                </div>
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

    {loading? <Spinner
          className="spinner-center"
          animation={"border"}
          color={"dark"}
          size={200}
        />:        <>
    
            <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setIsModal(false);
            }}
          >
            Done
          </button>
          <button type="button" onClick={(e)=>AddMember(e)} className="btn btn-primary">
            Sent
          </button>
          </>}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Members;
