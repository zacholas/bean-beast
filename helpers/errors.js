import Sentry from "sentry-expo";

export const throwError = (error = 'unspecified error', filePath = false, functionName = false) => {
  let errorMessage = '';
  errorMessage += filePath ? filePath : '';
  errorMessage += filePath && functionName ? ' @ ' : '';
  errorMessage += functionName ? functionName : '';
  errorMessage += filePath || functionName ? ' — ' : '';
  // errorMessage += JSON.stringify(error);
  errorMessage += error;

  console.log(errorMessage);
  Sentry.captureException(new Error(errorMessage));
};
