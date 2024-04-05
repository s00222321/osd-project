export const environment = {
  production: false,
  apiUri: 'https://4tj9hau93k.execute-api.eu-west-1.amazonaws.com/v1',

  auth0:
  {
    domain: 'dev-jl8ld3tgrb7d0gqc.us.auth0.com',
    clientId: 'WQKwsB73p3PBHYRm1QhI25Ha2KojRWwh',
    scope: 'openid profile email',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'Assignment'
    }
  }
};