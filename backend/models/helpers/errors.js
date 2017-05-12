module.exports = {
  usernameTaken: { type: 'USERNAME_TAKEN', message: 'Username is already taken.' },
  emailUsed: { type: 'EMAIL_USED', message: 'This e-mail is associated with another account.' },
  missingRegistrationFields: { type: 'MISSING_REGISTRATION_FIELDS', message: 'Missing registration fields.' },
  usernameLength: { type: 'USERNAME_LENGTH', message: 'Username is too long.' },
  passwordLenth: { type: 'PASSWORD_LENGTH', message: 'Password is too long.' },
  emailLength: { type: 'EMAIL_LENGTH', message: 'Email is too long.' },
  usernameInvalidCharacters: { type: 'USERNAME_INVALID_CHARACTERS', message: 'Username contains invalid characters.' },
  invalidRegistrationData: { type: 'INVALID_REGISTRATION_DATA', message: 'Registration data contains invalid information.' },
  loginCredentialsInvalid: { type: 'INVALID_LOGIN_CREDENTIALS', message: 'Invalid Username or Password.' },
  noProfileUsername: { type: 'NO_PROFILE_USERNAME', message: 'No profile username specified.'},
  errorFetchingProfile: { type: 'ERROR_FETCHING_PROFILE', message: 'Error fetching profile.'}
}