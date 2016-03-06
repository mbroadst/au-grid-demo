export class App {
  rows = [
    { one: 'hello', two: 'world', three: 'test' },
    { one: 'goodnight', two: 'moon', three: 'test' }
  ];

  attached() {
    setInterval(() => {
      this.rows = [
        { one: Math.floor(Math.random() * 10), two: Math.floor(Math.random() * 10), three: Math.floor(Math.random() * 10) },
        { one: Math.floor(Math.random() * 10), two: Math.floor(Math.random() * 20), three: Math.floor(Math.random() * 10) }
      ];
    }, 2000);
  }

  showColumnOne = true;
  toggleHidden() { this.showColumnOne = !this.showColumnOne; }

}
