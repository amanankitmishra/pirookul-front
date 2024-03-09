const url = "http://localhost:5000"


export default {
  meEndpoint: `${url}/users/me`,
  loginEndpoint: `${url}/users/login`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
