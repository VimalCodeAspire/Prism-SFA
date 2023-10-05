import axios from "axios";
import { API_URL} from "../../constants/api-url"
import Swal from "sweetalert2";


export default async function login(mobile,password){
    try {
        const url = API_URL.backend_url + "authenticate";
        var header = {
            "Content-type": "application/json",        }
      const response =  await axios(
        {
            headers:header,
            url:url,
            method:"POST",
            data:{
                mobile:mobile,
                password:password.toString()
            },

        }
      )
    return {token:response.data.token,statusCode:response.status}
    } catch (err) {
        const error = err.response.data
        if (error.message=='Invalid Mobile Or Password !'){
            Swal.fire({
                title: 'User Not Found',
                text: 'This user in not registered with us.',
                icon: 'error',
                confirmButtonText: 'ok'
              })
        }
        else  if (error.statusCode==400) {
            Swal.fire({
                title: 'Access Denied',
                text: 'Your are forbidden to use this.',
                icon: 'error',
                confirmButtonText: 'ok'
              })
        }
        else{
            Swal.fire({
                title: 'Something Went Wrong',
                text: 'Something Went Wrong Can\'t login.',
                icon: 'error',
                confirmButtonText: 'ok'
              })
        }
       
    }
}
