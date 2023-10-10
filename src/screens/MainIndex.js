import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Header from "../components/common/Header";
import Expenses from "./Accounts/Expenses";
import Invoices from "./Accounts/Invoices";
import Payments from "./Accounts/Payments";
import HrDashboard from "./Dashboard/HrDashboard";
import ProjectDashboard from "./Dashboard/ProjectDashboard";
import Attendance from "./Employee/Attendance";
import AttendanceEmployees from "./Employee/AttendanceEmployees";
import Departments from "./Employee/Departments";
import EmployeeProfile from "./Employee/EmployeeProfile";
import Holidays from "./Employee/Holidays";
import LeaveRequest from "./Employee/LeaveRequest";
import Members from "./Employee/Members";
import ClientProfile from "./Our Clients/ClientProfile";
import Clients from "./Our Clients/Clients";
import Salaryslip from "./Payroll/Salaryslip";
import Leaders from "./Projects/Leaders";
import Projects from "./Projects/Projects";
import Tasks from "./Projects/Tasks";
import Timesheet from "./Projects/Timesheet";
import TicketsDetail from "./Tickets/TicketsDetail";
import TicketsView from "./Tickets/TicketsView";
import Alerts from "./UIComponents/Alerts";
import Calendar from "./App/Calendar";
import ChatApp from "./App/ChatApp";
import ApexCharts from "./OtherPages/ApexCharts";
import FormsExample from "./OtherPages/FormsExample";
import TablesExample from "./OtherPages/TablesExample";
import ReviewsPage from "./OtherPages/ReviewsPage";
import Icons from "./OtherPages/Icons";
import Widgets from "./OtherPages/Widgets";
import Badges from "./UIComponents/Badges";
import Breadcrumb from "./UIComponents/Breadcrumb";
import Buttons from "./UIComponents/Buttons";
import Cards from "./UIComponents/Cards";
import Carousel from "./UIComponents/Carousel";
import Collapse from "./UIComponents/Collapse";
import Dropdowns from "./UIComponents/Dropdowns";
import ListGroup from "./UIComponents/ListGroup";
import ModalUI from "./UIComponents/ModalUI";
import NavsUI from "./UIComponents/NavsUI";
import NavbarUI from "./UIComponents/NavbarUI";
import PaginationUI from "./UIComponents/PaginationUI";
import PopoversUI from "./UIComponents/PopoversUI";
import ProgressUI from "./UIComponents/ProgressUI";
import Scrollspy from "./UIComponents/Scrollspy";
import SpinnersUI from "./UIComponents/SpinnersUI";
import ToastsUI from "./UIComponents/ToastsUI";
import StaterPage from "./Stater/StaterPage";
import PageHeader1 from "../components/common/PageHeader1";
import Documentation from "./Documentation/Documentation";
import Changelog from "./Changelog/Changelog";
import Help from "./Dashboard/Help";
import { constants } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { getMemberDetail } from "../api/member/member-api";
function MainIndex(props) {
  const Dispatch = useDispatch();
  const Cred = useSelector((state) => state.Cred);
  async function get() {
    try {
      const decode = await jwtDecode(Cred.token);
      const expTime = new Date(decode.exp * 1000);
      const currentTime = new Date();
      if (currentTime > expTime) {
        window.localStorage.removeItem(constants.token_store);
        Dispatch({
          type: "deleteCredentials",
        });
      } else {
        getMemberDetail(decode.sub, Cred.token);
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem(constants.token_store);
      Dispatch({
        type: "deleteCredentials",
      });
    }
  }
  useEffect(() => {
    get();
    return () => {};
  }, []);

  const { activekey } = props;
  return (
    <div className="main px-lg-4 px-md-4">
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={Members} />{" "}
    </div>
  );
}

export default MainIndex;
