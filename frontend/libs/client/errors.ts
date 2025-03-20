import { HttpStatusCode } from "axios";
import { ServerActionUnknownError } from "../server";

export const SomethingWentWrongResponse = (status: HttpStatusCode) => {
    const error = new ServerActionUnknownError({ status })
    return {
        success: false,
        message: error.message,
        errors: error.errors,
        status: error.status
    }
}