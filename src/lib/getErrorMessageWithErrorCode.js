import { errorMessages } from "./errorMessages";

export function getErrorMessageWithErrorCode(error) {
    if (error.response) {
        return checkStatusCode(error.response)
      } 
}


function checkStatusCode (errorResponse){
    const status = errorResponse.status;
    const errorCode = errorResponse.data?.errorCode;
    switch (status) {
        case 500:
            return errorMessages.E_DELETE_01;
        case 400:
            if (errorCode === 101) { return errorMessages.E_DELETE_02; }
            else if (errorCode === 102){ return errorMessages.E_DELETE_03; }
            else if (errorCode === 103){ return errorMessages.E_DELETE_04; }
            else if (errorCode === 104){ return errorMessages.E_DELETE_05; }
            else if (errorCode === 105){ return errorMessages.E_DELETE_06; }
            else if (errorCode === 106){ return errorMessages.E_DELETE_07; }
            else if (errorCode === 107){ return errorMessages.E_DELETE_08; }
            else if (errorCode === 108){ return errorMessages.E_DELETE_08; }
            else if (errorCode === 109){ return errorMessages.E_DELETE_09; }
            else if (errorCode === 110){ return errorMessages.E_DELETE_10; }
            else if (errorCode === 111){ return errorMessages.E_DELETE_11; }
            else if (errorCode === 112){ return errorMessages.E_UPDATE_03; }
            else if (errorCode === 113){ return errorMessages.E_UPDATE_04; }
            else if (errorCode === 114){ return errorMessages.E_CREATE_01; }
            else if (errorCode === 115){ return errorMessages.E_DELETE_12; }
            else if (errorCode === 116){ return errorMessages.E_DELETE_13; }
            else if (errorCode === 201){ return errorMessages.W_ACCOUNT_01; }
            else if (errorCode === 202){ return errorMessages.W_PASSWORD_04; }
            else if (errorCode === 203){ return errorMessages.E_INPROGRESS_01; }
            else if (errorCode === 204){ return errorMessages.E_UPDATE_06; }
            else { return errorMessages.E_DELETE_01; }
        default:
            return errorMessages.E_DELETE_01;
    }
}