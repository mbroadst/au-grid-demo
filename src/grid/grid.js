import {
  inject, bindable, children, createOverrideContext,
  ViewSlot, ViewCompiler
} from 'aurelia-framework';

@inject(ViewSlot, ViewCompiler)
export class Grid {
  @children('column') columns;
  @bindable rows;
  @bindable class;

  columnViewFactories = [];

  constructor(viewSlot, viewCompiler) {
    this.viewSlot = viewSlot;
    this.rowViewFactory =
      viewCompiler.compile(`<template><content></content></template`);
  }

  bind(bindingContext, overrideContext) {
    this.scrapeColumnViewFactories();
    this.renderHeaders();
    this.render(this.bindingContext, this.overrideContext);
  }

  scrapeColumnViewFactories() {
    for (let i = 0; i < this.columns.length; ++i)
      this.columnViewFactories.push(this.columns[i].viewFactory);
  }

  renderHeaders() {
    let headers = this.columns.map(c => c.header);
    for (let i = 0; i < headers.length; ++i) {
      let headerElement = document.createElement('th');
      let headerNode = document.createTextNode(headers[i]);
      headerElement.appendChild(headerNode);
      this.header.appendChild(headerElement);
    }
  }

  render(bindingContext, overrideContext) {
    let rows = this.rows;
    for (let y = 0, yy = rows.length; y < yy; y++) {
      let rowBindingContext = rows[y];
      let rowOverrideContext = createOverrideContext(rowBindingContext, overrideContext);
      rowOverrideContext.$first = y === 0;
      rowOverrideContext.$last = y === yy - 1;
      rowOverrideContext.$index = y;
      rowOverrideContext.$row = rows[y];

      // add an actual row
      let rowElement = document.createElement('tr');
      this.tbody.appendChild(rowElement);

      let rowView = this.rowViewFactory.create();
      this.viewSlot.add(rowView);
      let rowViewSlot = new ViewSlot(rowElement, true);
      for (let x = 0, xx = this.columnViewFactories.length; x < xx; x++) {
        let cellViewFactory = this.columnViewFactories[x];
        let cellView = cellViewFactory.create();
        rowViewSlot.add(cellView);

        let cellElement = document.createElement('td');
        rowElement.appendChild(cellElement);

        // move the view to the `td` element
        cellView.removeNodes();
        cellView.appendNodesTo(cellElement);
      }

      // bind the whole row at once
      rowViewSlot.bind(rowBindingContext, rowOverrideContext);
    }
  }
}
