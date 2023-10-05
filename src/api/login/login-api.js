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
    return response.data.token
    } catch (error) {
        console.log(error)
        Swal.fire({
            title: 'User Not Found',
            text: 'This user in not registered with us.',
            icon: 'error',
            confirmButtonText: 'ok'
          })
    }
}
