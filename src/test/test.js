export class Test {
  people = [
    { firstName: 'Rob', lastName: 'Eisenberg', value: 0 },
    { firstName: 'Jeremy', lastName: 'Danyow', value: 0 },
    { firstName: 'Matt', lastName: 'Broadstone', value: 0 }
  ];

  attached() {
    const source = [
      { firstName: 'Richard', lastName: 'Pryor', value: 0 },
      { firstName: 'Mitch', lastName: 'Hedberg', value: 0 },
      { firstName: 'Bobcat', lastName: 'Goldthwait', value: 0 }
    ];

    setInterval(() => {
      let idx = Math.floor(Math.random() * this.people.length),
          srcIdx = Math.floor(Math.random() * source.length);

      let person = source[srcIdx];
      person.value = Math.floor(Math.random() * 1000);
      this.people.splice(idx, 1, source[srcIdx]);
    }, 50);
  }
}
