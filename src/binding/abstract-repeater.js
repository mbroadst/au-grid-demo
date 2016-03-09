export class AbstractRepeater {
  constructor(options) {
    Object.assign(this, options);
  }

  childCount() {
    throw new Error('subclass must implement this method');
  }

  addView(bindingContext, overrideContext) {
    throw new Error('subclass must implement this method');
  }

  insertView(index, bindingContext, overrideContext) {
    throw new Error('subclass must implement this method');

    /*
    let view = repeat.viewFactory.create();
    view.bind(overrideContext.bindingContext, overrideContext);
    repeat.viewSlot.insert(addIndex, view);
    */
  }

  removeAllViews() {
    throw new Error('subclass must implement this method');
  }

  removeView(index) {
    throw new Error('subclass must implement this method');
  }

  views() {
    throw new Error('subclass must implement this method');
  }

  view(index) {
    throw new Error('subclass must implement this method');
  }

}
