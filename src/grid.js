import {inject, children, bindable} from 'aurelia-framework';

export class Grid {
  @children('column') columns;
  @bindable options;
  @bindable dataContext;
  @bindable rows;

  bind(bindingContext, overrideContext) {
    this.dataContext = bindingContext;
  }
}
