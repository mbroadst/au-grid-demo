import {bootstrap} from 'aurelia-bootstrapper-webpack';
import {Promise, P} from 'bluebird';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../styles/styles.css';

bootstrap(function(aurelia) {
  window.Promise = Promise;
  window.P = P;

  Promise.config({ warnings: false });

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('au-grid');

  aurelia.start()
    .then(() => aurelia.setRoot('app', document.body));
});
