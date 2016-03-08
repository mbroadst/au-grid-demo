import {inject, bindable, processContent, noView, ViewCompiler} from 'aurelia-framework';

@noView
@processContent(false)
@inject(Element, ViewCompiler)
export class Column {
  @bindable header

  constructor(element, viewCompiler) {
    let template = `<template>${element.innerHTML}</template>`;
    this.viewFactory = viewCompiler.compile(template);
    element.innerHTML = '';
  }
}
