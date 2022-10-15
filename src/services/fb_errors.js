export const firebaseErrors = error => {
  console.error('firebase error', error);
  switch (error) {
    case 'auth/weak-password':
      toast.show('Provided password is weak, try again.');
      break;
    case 'auth/user-disabled':
      toast.show('User is disabled from the application.');
      break;
    case 'auth/wrong-password':
      toast.show('Wrong credentials.');
      break;
    case 'auth/email-already-exists':
      toast.show('Provided email address already exists.');
      break;
    case 'auth/user-not-found':
      toast.show('User not found.');
      break;
    case 'auth/id-token-expired':
      toast.show('The provided ID token is expired.');
      break;
    case 'auth/id-token-revoked':
      toast.show('The provided ID has been revoked.');
      break;
    case 'auth/invalid-id-token':
      toast.show('The provided ID has been revoked.');
      break;
    case 'auth/no-current-user':
      toast.show('No current user available.');
    case 'auth/invalid-email':
      toast.show('Provide email address is invalid.');
      break;
    case 'storage/canceled':
      toast.show('User canceled file operation.');
      break;
    case 'storage/cannot-slice-blob':
      toast.show('Failed to upload because the file has been altered.');
      break;
    default:
      break;
  }
};
// nakamok801@civikli.com
