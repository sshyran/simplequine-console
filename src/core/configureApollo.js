import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { apolloUrl } from '../shared/constants/index';
import { getStorageItem } from '../shared/services/localStorage';

const networkInterface = createNetworkInterface({ uri: apolloUrl });

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    if (getStorageItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${getStorageItem('auth0IdToken')}`;
    }
    next();
  },
}]);

const apolloClient = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});

export default apolloClient;
