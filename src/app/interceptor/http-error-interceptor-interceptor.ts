import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {inject} from '@angular/core';

export const httpErrorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 0:
            errorMessage = 'Unable to connect. Please check your internet connection.';
            break;
          case 400:
            errorMessage = 'Something went wrong with your request. Please try again.';
            break;
          case 401:
            errorMessage = 'You are not logged in or your session has expired.';
            break;
          case 403:
            errorMessage = 'You don’t have permission to access this resource.';
            break;
          case 404:
            errorMessage = 'We couldn’t find what you’re looking for.';
            break;
          case 500:
            errorMessage = 'The server encountered an error. Please try again later.';
            break;
          case 503:
            errorMessage = 'Service is temporarily unavailable. Please try again in a few minutes.';
            break;
          default:
            errorMessage = 'Something went wrong. Please try again later.';
            break;
        }

      }
      snackBar.open(errorMessage, 'Close', { duration: 4000 });
      return throwError(() => new Error(errorMessage));
    })
  );
};
