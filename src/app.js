export class App {
  configureRouter(config, router) {
    config.title = 'au-grid-demo';

    config.map([
      { route: ['', 'demo'],    name: 'demo',         moduleId: './demo/demo',  nav: true, title: 'demo' },
      { route: 'dbMonster',     name: 'dbMonster',    moduleId: './db-monster/db-monster',   nav: true, title: 'dbMonster' }
    ]);

    this.router = router;
  }
}