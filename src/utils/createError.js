export const createError = (code,status,msg,data) => {
    const error = new Error();
    error.statusCode = code;
    error.message = msg;
    error.status = status;
    error.data = data;
    return error;
}
