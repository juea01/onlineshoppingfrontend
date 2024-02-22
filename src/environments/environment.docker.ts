//for production
// export const environment = {

//   urlProtocol: 'https',
//   urlPort: 443,

//   KeycloakUrl: 'https://hightechdistrict.com',
//   keycloakRedirectUrl: 'https://hightechdistrict.com',
//   keycloakRelam: 'Tech-District',
//   keycloakClientId: 'shoppingdistrictpublicclient',

//   redirectUrlProtocol: 'https',
//   redirectUrlPort: 443


// }
//for dev
//KeycloakUrl: 'http://localhost:8080/keyauthcl',
export const environment = {
  urlProtocol: 'http',
  urlPort: 8765,


  KeycloakUrl: 'http://localhost:8080/keyauthcl',
  keycloakRedirectUrl: 'http://localhost:80',
  keycloakRelam: 'Tech-District',
  keycloakClientId: 'shoppingdistrictpublicclient',

  redirectUrlProtocol: 'http',
  redirectUrlPort: 80


}
