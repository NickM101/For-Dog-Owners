export const firebaseErrors = error => {
  switch (error) {
    case 'auth/email-already-exists':
      toast.show('Provided email address already exists.');
      break;
    case 'auth/user-not-found':
      toast.show('User not found.');
      break;
    case 'auth/id-token-expired':
      toast.show('The provided ID token is expired.');
    case 'auth/id-token-revoked':
      toast.show('The provided ID has been revoked.');
    case 'auth/invalid-id-token':
      toast.show('The provided ID has been revoked.');
    case 'auth/invalid-email':
      toast.show('Provide email address is invalid.');
    case 'storage/canceled':
      toast.show('User canceled file operation.');
    case 'storage/cannot-slice-blob':
      toast.show('Failed to upload because the file has been altered.');
    default:
      break;
  }
};
// nakamok801@civikli.com
