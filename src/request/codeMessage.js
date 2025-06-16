const codeMessage = {
  200: "The server successfully returned the requested data. ",
  201: "Create or modify data successfully. ",
  202: "A request has entered the background queue (asynchronous task). ",
  204: "Delete data successfully. ",
  400: "There was an error in the request sent, and the server did not create or modify data. ",
  401: "you don't not have permission please try to login again. ",
  403: "you are  authorized, but access is forbidden. ",
  404: "The request sent is for a record that does not exist, and the server is not operating. ",
  406: "The requested format is not available. ",
  410: "The requested resource has been permanently deleted and will no longer be available. ",
  422: "When creating an object, a validation error occurred. ",
  500: "An error occurred in the server, please check the server. ",
  502: "Gateway error. ",
  503: "The service is unavailable, the server is temporarily overloaded or maintained. ",
  504: "The gateway has timed out. ",
  1000: "An unknown error occurred, please try again later.",
  1001: "Network error, please check your internet connection.",
  1002: "Request timeout, please try again.",
  1003: "Server is currently down for maintenance, please try again later.",
  1004: "Invalid request format, please check your input.",
};


export default codeMessage;