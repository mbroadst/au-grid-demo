import {
  inject,
  noView,
  processContent,
  bindable,
  TargetInstruction,
  InlineViewStrategy
} from 'aurelia-framework';

@noView
@processContent((compiler, resources, element, instruction) => {
  if (!!instruction.attributes.view) {
    instruction.viewModel = instruction.attributes.viewModel;
  } else {
    let html = element.innerHTML;
    if (html !== '') {
      instruction.template =
        new InlineViewStrategy(`<template with="dataContext">${html}</template>`);
    }
  }

  return true;
})
@inject(TargetInstruction)
export class Column {
  @bindable header
  @bindable viewModel
  @bindable field
  @bindable visible = true

  // styles
  @bindable compact

  constructor(targetInstruction) {
    this.template = targetInstruction.elementInstruction.template;
    this.viewModel = targetInstruction.elementInstruction.viewModel;
  }
}
