import axios from "axios";
import { API_URL } from "../../constants/api-url";
import Swal from "sweetalert2";
export async function getMemberDetail(id, token) {
  try {
    const url = API_URL.backend_url + `api/members/${id}`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await axios({
      headers: header,
      url: url,
      method: "GET",
    });
  } catch (error) {}
}

export async function getAllMembers(token) {
  try {
    const url = API_URL.backend_url + `api/members?page=0&size=20`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await axios({
      headers: header,
      url: url,
      method: "GET",
    });
    console.log(response.data._embedded.members[0])
    return { data: response.data._embedded.members, status: response.status };
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Your Session is Expired Please Login Again!",
      text: "Can't Fetch Employees. Please try After Some Time",
      icon: "error",
      confirmButtonText: "ok",
    });
  }
}

export async function addMember(token, data) {
  try {
    const url = API_URL.backend_url + `api/members`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await axios({
      headers: header,
      url: url,
      method: "POST",
      data: data,
    });
    return response.status;
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Something went wrong!",
      text: "Can't Add Employee. Please enter valid details, make sure that employee id is unique, then  try",
      icon: "error",
      confirmButtonText: "ok",
    });
  }
}

export async function getAllDesignation(token) {
  try {
    const url = API_URL.backend_url + `api/designations?page=0&size=30`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await axios({
      headers: header,
      url: url,
      method: "GET",
    });
    return {
      data: response.data._embedded.designations,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Something went wrong!",
      text: "Can't fetch Designation's. Try after some times",
      icon: "error",
      confirmButtonText: "ok",
    });
  }
}

export async function updateMember(data,token) {
  try {
    const url = API_URL.backend_url + `api/members`;
    var header = {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    };
    const resp =  await axios({
      headers: header,
      url: url,
      method: "PUT",
      data:data
    });
    console.log(resp.statusText,resp.status,resp.data)
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Something went wrong!",
      text: "Can't Update Employee. Please enter valid details, make sure that employee id is unique, then  try",
      icon: "error",
      confirmButtonText: "ok",
    });
  }
}
