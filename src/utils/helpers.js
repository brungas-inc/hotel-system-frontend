export const reportErrors = (alert, errorBody) => {
  let statusCode = errorBody.response
    ? parseInt(errorBody.response.status)
    : 500;
  switch (statusCode) {
    case 401: // auth errors
    case 403:
      {
        let data = errorBody.response.data;
        if (data.message) {
          alert && alert.showError(data.message);
        }
      }
      break;
    case 404:
      alert && alert.showError("The requested resource was not found.");
      break;
    case 422:
      {
        // validation errors
        let data = errorBody.response.data;
        if (data.message) {
          alert && alert.showError(data.message);
        } else {
          let errors = [];
          Object.keys(data).forEach((e, i) => errors.push(data[e][0]));
          alert && alert.showError(errors.join("\n"));
        }
      }
      break;
    default:
      alert && alert.showError("Something went wrong.");
      break;
  }
};
