import { createContext } from 'react';
import BrokenImage from '../media/broken.jpg';

const accessToken = 'https://20409-gqldemo202212-stage.adobeioruntime.net/api/v1/web/gql-demo-jwt/service-credentials';
const defaultEndpoint = '/content/_cq_graphql/portal/endpoint.json';
const defaultProject = 'trane-portal';
const defaultServiceURL = 'https://publish-p124331-e1227315.adobeaemcloud.com/';
const defaultPlaceholdersExtensionURL = 'https://1154643-geoipplaceholders.adobeio-static.net/api/v1/web/geoip-placeholders';

export const AppContext = createContext({
  auth: sessionStorage.auth || '',
  endpoint: localStorage.endpoint || defaultEndpoint,
  project: localStorage.project || defaultProject,
  serviceURL: localStorage.serviceURL || defaultServiceURL,
  accessToken: accessToken,
  defaultServiceURL: defaultServiceURL,
  placeholdersExtensionURL: localStorage.placeholdersExtensionURL || defaultPlaceholdersExtensionURL,
  brokenImage: BrokenImage,
  screenResponse: {},
  navigationResponse: {}
});
