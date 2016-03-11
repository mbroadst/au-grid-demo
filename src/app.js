export class App {
  configureRouter(config, router) {
    config.title = 'grid-component';
    config.map([
      { route: ['', 'test'],    name: 'test',         moduleId: './test/test',  nav: true, title: 'test' },
      { route: 'dbMonster',     name: 'dbMonster',    moduleId: 'db-monster',   nav: true, title: 'dbMonster' }
    ]);

    this.router = router;
  }
}