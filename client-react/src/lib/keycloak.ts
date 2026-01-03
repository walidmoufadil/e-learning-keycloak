import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'elearning-realm',
  clientId: 'elearning-client',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
