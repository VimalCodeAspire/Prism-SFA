import {createReducer} from  "@reduxjs/toolkit"

const  CredentialsIntialState = {
}
export const Credentials = createReducer(CredentialsIntialState,{
    setCredentials:(state,action)=>{
         return {...action.payload}
    },
    deleteCredentials:(state,action)=>{
        return CredentialsIntialState
    }
})