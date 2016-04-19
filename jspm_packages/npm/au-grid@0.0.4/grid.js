/* */ 
define(['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-binding', 'aurelia-templating-resources', './grid-utilities'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaBinding, _aureliaTemplatingResources, _gridUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Grid = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var Grid = exports.Grid = (_dec = (0, _aureliaTemplating.customElement)('au-grid'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaDependencyInjection.Container, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewCompiler, _aureliaBinding.ObserverLocator, _aureliaTemplatingResources.RepeatStrategyLocator), _dec3 = (0, _aureliaTemplating.children)('au-column'), _dec(_class = _dec2(_class = (_class2 = function (_AbstractRepeater) {
    _inherits(Grid, _AbstractRepeater);

    function Grid(container, viewSlot, viewCompiler, observerLocator, strategyLocator) {
      _classCallCheck(this, Grid);

      var _this = _possibleConstructorReturn(this, _AbstractRepeater.call(this, {
        local: 'row',
        viewsRequireLifecycle: false
      }));

      _initDefineProp(_this, 'columns', _descriptor, _this);

      _initDefineProp(_this, 'rows', _descriptor2, _this);

      _initDefineProp(_this, 'class', _descriptor3, _this);

      _this.columnViewFactories = [];


      _this.container = container;
      _this.viewSlot = viewSlot;
      _this.observerLocator = observerLocator;
      _this.strategyLocator = strategyLocator;
      _this.scope = null;
      _this.strategy = null;
      _this.rowViewFactory = viewCompiler.compile('<template><content></content></template');

      _this.rowViewSlots = [];
      return _this;
    }

    Grid.prototype.bind = function bind(bindingContext, overrideContext) {
      this.scope = { bindingContext: bindingContext, overrideContext: overrideContext };
      this.scrapeColumnViewFactories();
      this.renderHeaders();
      this.rowsChanged();
    };

    Grid.prototype.unbind = function unbind() {
      this.scope = null;
      this.rows = null;
      this.viewSlot.removeAll(true);
      this._stopObservation();
    };

    Grid.prototype.call = function call(context, changes) {
      this[context](this.rows, changes);
    };

    Grid.prototype.scrapeColumnViewFactories = function scrapeColumnViewFactories() {
      for (var i = 0, ii = this.columns.length; i < ii; ++i) {
        this.columnViewFactories.push(this.columns[i].viewFactory);
      }
    };

    Grid.prototype.renderHeaders = function renderHeaders() {
      var headers = this.columns.map(function (c) {
        return c.header;
      });
      for (var i = 0; i < headers.length; ++i) {
        var headerElement = document.createElement('th');
        var headerNode = document.createTextNode(headers[i]);
        headerElement.appendChild(headerNode);
        this.header.appendChild(headerElement);
      }
    };

    Grid.prototype.rowsChanged = function rowsChanged() {
      this._stopObservation();
      if (!this.scope) return;

      var rows = this.rows;
      this.strategy = this.strategyLocator.getStrategy(rows);
      this._observeCollection();
      this.strategy.instanceChanged(this, rows);
    };

    Grid.prototype._stopObservation = function _stopObservation() {
      if (this.collectionObserver) {
        this.collectionObserver.unsubscribe(this.callContext, this);
        this.collectionObserver = null;
        this.callContext = null;
      }
    };

    Grid.prototype._observeCollection = function _observeCollection() {
      var rows = this.rows;
      this.collectionObserver = this.strategy.getCollectionObserver(this.observerLocator, rows);

      if (this.collectionObserver) {
        this.callContext = 'handleCollectionMutated';
        this.collectionObserver.subscribe(this.callContext, this);
      }
    };

    Grid.prototype.handleCollectionMutated = function handleCollectionMutated(collection, changes) {
      this.strategy.instanceMutated(this, collection, changes);
    };

    Grid.prototype.views = function views() {
      return this.rowViewSlots;
    };

    Grid.prototype.view = function view(index) {
      return this.rowViewSlots[index];
    };

    Grid.prototype.viewCount = function viewCount() {
      return this.rowViewSlots.length;
    };

    Grid.prototype.addView = function addView(bindingContext, overrideContext) {
      var rowElement = document.createElement('tr');
      this.tbody.appendChild(rowElement);
      var rowView = this.rowViewFactory.create(this.container);
      this.viewSlot.add(rowView);
      var rowViewSlot = new _aureliaTemplating.ViewSlot(rowElement, true);
      for (var x = 0, xx = this.columnViewFactories.length; x < xx; x++) {
        var cellViewFactory = this.columnViewFactories[x];
        var cellView = cellViewFactory.create(this.container);
        rowViewSlot.add(cellView);

        var cellElement = document.createElement('td');
        rowElement.appendChild(cellElement);

        cellView.removeNodes();
        cellView.appendNodesTo(cellElement);
      }

      rowViewSlot.bind(bindingContext, overrideContext);
      this.rowViewSlots.push(rowViewSlot);
    };

    Grid.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
      var rowElement = document.createElement('tr');
      var existingElement = !!this.rowViewSlots[index] && !!this.rowViewSlots[index].anchor ? this.rowViewSlots[index].anchor : null;
      this.tbody.insertBefore(rowElement, existingElement);
      var rowView = this.rowViewFactory.create(this.container);
      this.viewSlot.insert(index, rowView);
      var rowViewSlot = new _aureliaTemplating.ViewSlot(rowElement, true);
      for (var x = 0, xx = this.columnViewFactories.length; x < xx; x++) {
        var cellViewFactory = this.columnViewFactories[x];
        var cellView = cellViewFactory.create(this.container);
        rowViewSlot.add(cellView);

        var cellElement = document.createElement('td');
        rowElement.appendChild(cellElement);

        cellView.removeNodes();
        cellView.appendNodesTo(cellElement);
      }

      rowViewSlot.bind(bindingContext, overrideContext);
      this.rowViewSlots.splice(index, 0, rowViewSlot);
    };

    Grid.prototype.removeAllViews = function removeAllViews() {
      var length = this.rowViewSlots.length;
      while (length--) {
        var rowViewSlot = this.rowViewSlots.pop();
        var anchor = rowViewSlot.anchor;
        var parentNode = anchor.parentNode;
        rowViewSlot.removeAll(true);
        parentNode.removeChild(anchor);
      }

      this.rowViewSlots = [];
      this.viewSlot.removeAll(true);
    };

    Grid.prototype.removeView = function removeView(index) {
      var rowViewSlots = this.rowViewSlots;
      var anchor = rowViewSlots[index].anchor;
      var parentNode = anchor.parentNode;
      rowViewSlots[index].removeAll(true);
      parentNode.removeChild(anchor);
      rowViewSlots.splice(index, 1);
      this.viewSlot.removeAt(index, true);
    };

    Grid.prototype.updateBindings = function updateBindings(view) {
      var i = view.children.length;
      while (i--) {
        var j = view.children[i].bindings.length;
        while (j--) {
          (0, _gridUtilities.updateOneTimeBinding)(view.children[i].bindings[j]);
        }j = view.children[i].controllers.length;
        while (j--) {
          var k = view.children[i].controllers[j].boundProperties.length;
          while (k--) {
            var binding = view.children[i].controllers[j].boundProperties[k].binding;
            (0, _gridUtilities.updateOneTimeBinding)(binding);
          }
        }
      }
    };

    return Grid;
  }(_aureliaTemplatingResources.AbstractRepeater), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columns', [_dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'rows', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'class', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});