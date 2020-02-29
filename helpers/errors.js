import _ from 'lodash';
import * as Sentry from 'sentry-expo';

export const throwError = (error = 'unspecified error', filePath = false, functionName = false, context = {}) => {
  let errorMessage = '';
  errorMessage += filePath ? filePath : '';
  errorMessage += filePath && functionName ? ' @ ' : '';
  errorMessage += functionName ? functionName : '';
  errorMessage += filePath || functionName ? ' — ' : '';
  // errorMessage += JSON.stringify(error);
  errorMessage += error;

  console.log(errorMessage);
  // Sentry.captureException(new Error(errorMessage));

  Sentry.withScope(scope => {
    if(_.size(context) && context.tags){
      scope.setTags(context.tags);
    }
    if(_.size(context) && context.extra){
      scope.setExtras(context.extra);
    }
    Sentry.captureException(new Error(errorMessage));
  });
};
