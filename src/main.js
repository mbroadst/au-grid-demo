import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('au-grid');

  aurelia.start().then(() => aurelia.setRoot());
}
