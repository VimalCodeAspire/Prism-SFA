import React, { useEffect, useState } from "react";
import { Switch, withRouter } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AuthIndex from "./screens/AuthIndex";
import MainIndex from "./screens/MainIndex";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { constants } from "./constants/constants";
import Loading from "./components/UI/Loading"
function App(props) {
  const Cred = useSelector((state) => state.Cred);
  const [loading,setloading]=useState(false)
  function activekey() {
    var res = window.location.pathname;
    var baseUrl = process.env.PUBLIC_URL;
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? "/" + res : "/";
    const activeKey1 = res;
    return activeKey1;
  }
  const Dispatch = useDispatch();
  async function getCred() {
    setloading(true)
    try {
      const token = await window.localStorage.getItem(constants.token_store);
      if (token != null) {
        Dispatch({
          type: "setCredentials",
          payload: { token: token },
        });
      } else {
        Dispatch({
          type: "deleteCredentials",
        });
      }
    } catch (error) {
      Dispatch({
        type: "deleteCredentials",
      });
      console.log(error);
    }
    setloading(false)
  }
  useEffect(() => {
    getCred();
  }, []);
  if (loading){
    return  <Loading animation={"border"} color={"yellow"}/>
  }
  return (
    <>
   
 
      {Cred.token ? (
        <div id="mytask-layout" className="theme-indigo">
          <Sidebar activekey={activekey()} history={props.history} />
          <Switch>
            <MainIndex activekey={activekey()} />
          </Switch>
        </div>
      ) : (
        <div id="mytask-layout" className="theme-indigo">
          <Switch>

            <AuthIndex />
          </Switch>
        </div>
      )}

    </>
  );
}

export default withRouter(App);
