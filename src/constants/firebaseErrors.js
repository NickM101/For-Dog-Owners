let message;

switch (code) {
  case 'auth/email-already-in-use':
    // Thrown if there already exists an account with the given email address.
    message = 'An account already exists with the given email address'
    break;
  case 'auth/invalid-email':
    // Thrown if the email address is not valid.
    message = 'Email address is not valid'
    break;
  case 'auth/operation-not-allowed':
    // Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
    message = 'Account not enabled, contact admin.'
    break;
  case 'auth/weak-password':
    // Thrown if the password is not strong enough.
    message = 'Password is not strong enough.'
    break;
  case 'auth/expired-action-code':
    // Thrown if the pass reset code has expired
    message = 'Reset code has expired, request a new code'
    break;
  case 'auth/user-disabled':
    // Thrown if the user corresponding to the given password reset code has been disabled.
  message = 'You account has been disabled, contact admin.'
    break;
  case 'auth/invalid-action-code':
    // Thrown if the password reset code is invalid. This can happen if the code is malformed or has already been used.
    message = 'Reset code is invalid/used. Request a new code.'
    break;
  case 'auth/user-not-found':
    // Thrown if there is no user corresponding to the password reset code. This may have happened if the user was deleted between when the code was issued and when this method was called.
    message = 'No account is associated with the given email address.'
    break;
  default:
    message = null;
    break;
}


export default message;