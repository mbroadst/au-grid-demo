import {
  inject, bindable, children,
  Container, ViewSlot, ViewCompiler, ObserverLocator
} from 'aurelia-framework';
import {AbstractRepeater, RepeatStrategyLocator} from 'aurelia-templating-resources';
import {updateOneTimeBinding} from './grid-utilities';

@inject(Container, ViewSlot, ViewCompiler, ObserverLocator, RepeatStrategyLocator)
export class Grid extends AbstractRepeater {
  @children('column') columns;
  @bindable rows;
  @bindable class;

  columnViewFactories = [];

  constructor(container, viewSlot, viewCompiler, observerLocator, strategyLocator) {
    super({
      local: 'row',
      viewsRequireLifecycle: false
    });

    this.container = container;
    this.viewSlot = viewSlot;
    this.observerLocator = observerLocator;
    this.strategyLocator = strategyLocator;
    this.scope = null;
    this.strategy = null;
    this.rowViewFactory =
      viewCompiler.compile(`<template><content></content></template`);

    this.rowViewSlots = [];
  }

  // life-cycle business
  bind(bindingContext, overrideContext) {
    this.scope = { bindingContext, overrideContext };
    this.scrapeColumnViewFactories();
    this.renderHeaders();
    this.rowsChanged();
  }

  unbind() {
    this.scope = null;
    this.rows = null;
    this.viewSlot.removeAll(true);
    this._stopObservation();
  }

  call(context, changes) {
    this[context](this.rows, changes);
  }

  // view related
  scrapeColumnViewFactories() {
    for (let i = 0, ii = this.columns.length; i < ii; ++i) {
      this.columnViewFactories.push(this.columns[i].viewFactory);
    }
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

  // eventual implementation after strategies are worked out
  rowsChanged() {
    this._stopObservation();
    if (!this.scope) return;

    let rows = this.rows;
    this.strategy = this.strategyLocator.getStrategy(rows);
    this._observeCollection();
    this.strategy.instanceChanged(this, rows);
  }

  // collection observation
  _stopObservation() {
    if (this.collectionObserver) {
      this.collectionObserver.unsubscribe(this.callContext, this);
      this.collectionObserver = null;
      this.callContext = null;
    }
  }

  _observeCollection() {
    let rows = this.rows;
    this.collectionObserver =
      this.strategy.getCollectionObserver(this.observerLocator, rows);

    if (this.collectionObserver) {
      this.callContext = 'handleCollectionMutated';
      this.collectionObserver.subscribe(this.callContext, this);
    }
  }

  handleCollectionMutated(collection, changes) {
    this.strategy.instanceMutated(this, collection, changes);
  }

  // @override AbstractRepeater
  views() { return this.rowViewSlots; }
  view(index) { return this.rowViewSlots[index]; }
  viewCount() { return this.rowViewSlots.length; }

  addView(bindingContext, overrideContext) {
    // console.log('addView(bctx= ', bindingContext, ')');
    let rowElement = document.createElement('tr');
    this.tbody.appendChild(rowElement);
    let rowView = this.rowViewFactory.create(this.container);
    this.viewSlot.add(rowView);
    let rowViewSlot = new ViewSlot(rowElement, true);
    for (let x = 0, xx = this.columnViewFactories.length; x < xx; x++) {
      let cellViewFactory = this.columnViewFactories[x];
      let cellView = cellViewFactory.create(this.container);
      rowViewSlot.add(cellView);

      let cellElement = document.createElement('td');
      rowElement.appendChild(cellElement);

      // move the view to the `td` element
      cellView.removeNodes();
      cellView.appendNodesTo(cellElement);
    }

    rowViewSlot.bind(bindingContext, overrideContext);
    this.rowViewSlots.push(rowViewSlot);
  }

  insertView(index, bindingContext, overrideContext) {
    // console.log('insertView(index=', index, ', bctx= ', bindingContext, ')');
    let rowElement = document.createElement('tr');
    let existingElement =
      (!!this.rowViewSlots[index] && !!this.rowViewSlots[index].anchor) ?
      this.rowViewSlots[index].anchor : null;
    this.tbody.insertBefore(rowElement, existingElement);
    let rowView = this.rowViewFactory.create(this.container);
    this.viewSlot.insert(index, rowView);
    let rowViewSlot = new ViewSlot(rowElement, true);
    for (let x = 0, xx = this.columnViewFactories.length; x < xx; x++) {
      let cellViewFactory = this.columnViewFactories[x];
      let cellView = cellViewFactory.create(this.container);
      rowViewSlot.add(cellView);

      let cellElement = document.createElement('td');
      rowElement.appendChild(cellElement);

      // move the view to the `td` element
      cellView.removeNodes();
      cellView.appendNodesTo(cellElement);
    }

    rowViewSlot.bind(bindingContext, overrideContext);
    this.rowViewSlots.splice(index, 0, rowViewSlot);
  }

  removeAllViews() {
    // console.log('removeAllViews()');
    let length = this.rowViewSlots.length;
    while (length--) {
      let rowViewSlot = this.rowViewSlots.pop();
      let anchor = rowViewSlot.anchor;
      let parentNode = anchor.parentNode;
      rowViewSlot.removeAll(true);
      parentNode.removeChild(anchor);
    }

    this.rowViewSlots = [];
    this.viewSlot.removeAll(true);
  }

  removeView(index) {
    // console.log('removeView(index=', index, ')');
    let rowViewSlots = this.rowViewSlots;
    let anchor = rowViewSlots[index].anchor;
    let parentNode = anchor.parentNode;
    rowViewSlots[index].removeAll(true);
    parentNode.removeChild(anchor);
    rowViewSlots.splice(index, 1);
    this.viewSlot.removeAt(index, true);
  }

  updateBindings(view) {
    // console.log('updateBindings(view=', view, ')');
    let i = view.children.length;
    while (i--) {
      let j = view.children[i].bindings.length;
      while (j--) updateOneTimeBinding(view.children[i].bindings[j]);

      j = view.children[i].controllers.length;
      while (j--) {
        let k = view.children[i].controllers[j].boundProperties.length;
        while (k--) {
          let binding =
            view.children[i].controllers[j].boundProperties[k].binding;
          updateOneTimeBinding(binding);
        }
      }
    }
  }
}
