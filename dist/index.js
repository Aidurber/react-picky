'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var isEqual = _interopDefault(require('lodash.isequal'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var debounce = (function (fn, delay) {
  var timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
});

var includes = (function (str, term) {
  return String(str).toLowerCase().indexOf(String(term).toLowerCase()) > -1;
});

var isDataObject = function isDataObject(obj, valueKey, labelKey) {
  return _typeof(obj) === 'object' && obj.hasOwnProperty(valueKey) && obj.hasOwnProperty(labelKey);
};
var generateGuid = function generateGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
var hasItem = function hasItem(all, item, valueKey, labelKey, returnIndex) {
  if (!all || !item) return false;

  if (Array.isArray(all)) {
    if (isDataObject(item, valueKey, labelKey)) {
      var find = all.findIndex(function (opt) {
        return opt[valueKey] === item[valueKey];
      });

      if (returnIndex) {
        return find;
      }

      return find > -1;
    } else {
      var indexOfItem = all.indexOf(item);

      if (returnIndex) {
        return indexOfItem;
      }

      return indexOfItem > -1;
    }
  } else {
    if (isDataObject(item, valueKey, labelKey)) {
      return all[valueKey] === item[valueKey];
    }

    return all === item;
  }
};
var hasItemIndex = function hasItemIndex(all, item, valueKey, labelKey) {
  return hasItem(all, item, valueKey, labelKey, true);
};
var keyExtractor = function keyExtractor(item, valueKey, labelKey) {
  return isDataObject(item, valueKey, labelKey) ? item[valueKey] : item;
};

function split(str) {
  var a = 1;
  var res = '';
  var parts = str.split('%'),
      len = parts.length;

  if (len > 0) {
    res += parts[0];
  }

  for (var i = 1; i < len; i++) {
    if (parts[i][0] === 's' || parts[i][0] === 'd') {
      var value = arguments[a++];
      res += parts[i][0] === 'd' ? Math.floor(value) : value;
    } else if (parts[i][0]) {
      res += '%' + parts[i][0];
    } else {
      i++;
      res += '%' + parts[i][0];
    }

    res += parts[i].substring(1);
  }

  return res;
}

var regex = /%[sdj]/;

function format(message) {
  if (regex.test(message)) return split.apply(null, arguments);
  return Array.from(arguments).join(' ');
}

var isEmptyValue = function isEmptyValue(value) {
  return value === null || value === undefined || Array.isArray(value) && !value.length;
};

var Placeholder =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Placeholder, _React$PureComponent);

  function Placeholder(props) {
    _classCallCheck(this, Placeholder);

    return _possibleConstructorReturn(this, _getPrototypeOf(Placeholder).call(this, props));
  }

  _createClass(Placeholder, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          value = _this$props.value,
          numberDisplayed = _this$props.numberDisplayed,
          multiple = _this$props.multiple,
          valueKey = _this$props.valueKey,
          labelKey = _this$props.labelKey,
          manySelectedPlaceholder = _this$props.manySelectedPlaceholder,
          allSelectedPlaceholder = _this$props.allSelectedPlaceholder,
          allSelected = _this$props.allSelected;
      var message = '';

      if (isEmptyValue(this.props.value)) {
        message = placeholder;
      } else {
        if (Array.isArray(value) && multiple) {
          // If type is array and values length less than number displayed
          // join the values
          if (value.length <= numberDisplayed) {
            message = value.map(function (opt) {
              if (isDataObject(opt, valueKey, labelKey)) {
                return opt[labelKey];
              }

              return opt;
            }).join(', ');
          } else {
            // if many selected and not all selected then use the placeholder
            if (manySelectedPlaceholder && !allSelected) {
              // if it doesn't include the sprintf token then just use the placeholder
              message = includes(manySelectedPlaceholder, '%s') ? format(manySelectedPlaceholder, value.length) : manySelectedPlaceholder; //If all selected and there is an allselectedplaceholder use that
            } else if (allSelected && allSelectedPlaceholder) {
              // if it doesn't include the sprintf token then just use the placeholder
              message = includes(allSelectedPlaceholder, '%s') ? format(allSelectedPlaceholder, value.length) : allSelectedPlaceholder;
            }
          }
        } else {
          var tempValue = Array.isArray(value) ? value[0] : value;

          if (isDataObject(tempValue, valueKey, labelKey)) {
            message = tempValue[labelKey];
          } else {
            message = tempValue;
          }
        }
      }

      return React__default.createElement("span", {
        className: "picky__placeholder",
        "data-test": "picky_placeholder"
      }, message);
    }
  }]);

  return Placeholder;
}(React__default.PureComponent);

Placeholder.defaultProps = {
  placeholder: 'None selected',
  allSelectedPlaceholder: '%s selected',
  manySelectedPlaceholder: '%s selected',
  allSelected: false
};
Placeholder.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.object]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  manySelectedPlaceholder: PropTypes.string,
  allSelectedPlaceholder: PropTypes.string,
  allSelected: PropTypes.bool
};

var Filter =
/*#__PURE__*/
function (_Component) {
  _inherits(Filter, _Component);

  function Filter(props) {
    var _this;

    _classCallCheck(this, Filter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Filter).call(this, props));
    _this.state = {
      filterTerm: ''
    };
    _this.onFilterChange = _this.onFilterChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Filter, [{
    key: "onFilterChange",
    value: function onFilterChange(event) {
      var _this2 = this;

      var query = event.target.value;
      this.setState({
        filterTerm: query
      }, function () {
        _this2.props.onFilterChange(query);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React__default.createElement("div", {
        className: "picky__filter"
      }, React__default.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this3.filterInput = input;
        },
        className: "picky__filter__input",
        "data-test": "picky__filter__input",
        placeholder: "Filter...",
        tabIndex: this.props.tabIndex,
        "aria-label": "filter options",
        value: this.state.filterTerm,
        onChange: this.onFilterChange
      }));
    }
  }]);

  return Filter;
}(React.Component);

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number
};

var Option = function Option(props) {
  var id = props.id,
      item = props.item,
      isSelected = props.isSelected,
      labelKey = props.labelKey,
      valueKey = props.valueKey,
      selectValue = props.selectValue,
      style = props.style,
      multiple = props.multiple,
      tabIndex = props.tabIndex;
  var cssClass = isSelected ? 'option selected' : 'option';
  var body = isDataObject(item, labelKey, valueKey) ? item[labelKey] : item;
  var inputType = multiple ? 'checkbox' : 'radio';

  var select = function select() {
    return selectValue(item);
  };

  return React__default.createElement("div", {
    tabIndex: tabIndex,
    id: id,
    role: "option",
    style: style,
    "data-test": "option",
    "data-selected": isSelected ? 'selected' : '',
    "aria-selected": isSelected,
    className: cssClass,
    onClick: select,
    onKeyPress: function onKeyPress(e) {
      e.preventDefault();
      selectValue(item);
    }
  }, React__default.createElement("input", {
    type: inputType,
    readOnly: true,
    onClick: select,
    tabIndex: -1,
    checked: isSelected,
    "aria-label": body
  }), body);
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  id: PropTypes.string,
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  style: PropTypes.object,
  selectValue: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

var Picky =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Picky, _React$PureComponent);

  function Picky(props) {
    var _this;

    _classCallCheck(this, Picky);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Picky).call(this, props));
    _this.state = {
      selectedValue: props.value || (props.multiple ? [] : null),
      open: props.open,
      filtered: false,
      filteredOptions: [],
      id: generateGuid(),
      allSelected: false
    };
    _this.toggleDropDown = _this.toggleDropDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleSelectAll = _this.toggleSelectAll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onFilterChange = _this.onFilterChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.selectValue = _this.selectValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.allSelected = _this.allSelected.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.isItemSelected = _this.isItemSelected.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusFilterInput = _this.focusFilterInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Picky, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      var allSelected = this.allSelected();
      this.setState({
        allSelected: allSelected
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.focusFilterInput(this.state.open);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.options !== nextProps.options || this.state.selectedValue !== nextProps.value) {
        this.setState({
          allSelected: this.allSelected()
        });
      }

      if (!isEqual(nextProps.value, this.state.selectedValue)) {
        this.setState({
          selectedValue: nextProps.value,
          allSelected: this.allSelected(nextProps.value)
        });
      }
    }
  }, {
    key: "selectValue",
    value: function selectValue(val) {
      var _this2 = this;

      var valueLookup = this.isControlled() ? this.props.value : this.state.selectedValue;

      if (this.props.multiple && Array.isArray(valueLookup)) {
        var itemIndex = hasItemIndex(valueLookup, val, this.props.valueKey, this.props.labelKey);
        var selectedValue = [];

        if (itemIndex > -1) {
          selectedValue = _toConsumableArray(valueLookup.slice(0, itemIndex)).concat(_toConsumableArray(valueLookup.slice(itemIndex + 1)));
        } else {
          selectedValue = _toConsumableArray(this.state.selectedValue).concat([val]);
        }

        this.setState({
          selectedValue: selectedValue,
          allSelected: this.allSelected(selectedValue)
        }, function () {
          _this2.props.onChange(_this2.state.selectedValue);
        });
      } else {
        this.setState({
          selectedValue: val
        }, function () {
          _this2.props.onChange(_this2.state.selectedValue);
        });
      }
    }
    /**
     * Determine whether all items are selected
     *
     * @returns {Boolean}
     * @memberof Picky
     */

  }, {
    key: "allSelected",
    value: function allSelected(overrideSelected) {
      var selectedValue = overrideSelected || this.state.selectedValue;
      var options = this.props.options;
      var copiedOptions = options.slice(0);
      var copiedSelectedValue = Array.isArray(selectedValue) ? selectedValue.slice(0) : [];
      return isEqual(copiedOptions, copiedSelectedValue);
    }
    /**
     * Toggles select all
     *
     * @memberof Picky
     */

  }, {
    key: "toggleSelectAll",
    value: function toggleSelectAll() {
      var _this3 = this;

      this.setState({
        selectedValue: !this.state.allSelected ? this.props.options : [],
        allSelected: !this.state.allSelected
      }, function () {
        // Call onChange prop with new values
        _this3.props.onChange(_this3.state.selectedValue);
      });
    }
    /**
     * Determine whether the user is treating this as a controlled component or not.
     *
     * @returns
     * @memberof Picky
     */

  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.props.value != null;
    }
  }, {
    key: "isItemSelected",
    value: function isItemSelected(item) {
      var value = this.isControlled() ? this.props.value : this.state.selectedValue;
      return hasItem(value, item, this.props.labelKey, this.props.valueKey);
    }
    /**
     * Renders a non-virtualised list.
     *
     * @param {any} items
     * @returns
     * @memberof Picky
     */

  }, {
    key: "renderPlainList",
    value: function renderPlainList(items) {
      var _this4 = this;

      var _this$props = this.props,
          labelKey = _this$props.labelKey,
          valueKey = _this$props.valueKey,
          multiple = _this$props.multiple,
          render = _this$props.render,
          tabIndex = _this$props.tabIndex,
          renderList = _this$props.renderList;

      if (renderList) {
        return renderList({
          items: items,
          selected: this.state.selectedValue,
          multiple: multiple,
          tabIndex: tabIndex,
          getIsSelected: this.isItemSelected,
          selectValue: this.selectValue
        });
      }

      return items.map(function (item, index) {
        // Create a key based on the options value
        var key = keyExtractor(item, valueKey, labelKey);

        var isSelected = _this4.isItemSelected(item); // If render prop supplied for items call that.


        if (typeof render === 'function') {
          return render({
            index: index,
            item: item,
            isSelected: isSelected,
            selectValue: _this4.selectValue,
            labelKey: labelKey,
            valueKey: valueKey,
            multiple: multiple
          });
        } else {
          // Render a simple option
          return React__default.createElement(Option, {
            key: key,
            item: item,
            isSelected: isSelected,
            selectValue: _this4.selectValue,
            labelKey: labelKey,
            valueKey: valueKey,
            multiple: multiple,
            tabIndex: tabIndex,
            id: _this4.state.id + '-option-' + index
          });
        }
      });
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var options = this.props.options;
      var items = this.state.filtered ? this.state.filteredOptions : options;
      return this.renderPlainList(items);
    }
    /**
     * Called when Filter term changes. Sets filteredOptions and filtered state.
     *
     * @param {any} term
     * @returns
     * @memberof Picky
     */

  }, {
    key: "onFilterChange",
    value: function onFilterChange(term) {
      var _this5 = this;

      if (!term.trim()) {
        return this.setState({
          filtered: false,
          filteredOptions: []
        });
      }

      var filteredOptions = this.props.options.filter(function (option) {
        var val = option;

        if (isDataObject(option, _this5.props.labelKey, _this5.props.valueKey)) {
          val = option[_this5.props.labelKey];
        }

        return includes(val, term);
      });
      this.setState({
        filtered: true,
        filteredOptions: filteredOptions
      }, function () {
        if (_this5.props.onFiltered) {
          _this5.props.onFiltered(filteredOptions);
        }
      });
    }
    /**
     *
     * Called by a click event listener. Used to determine any clicks that occur outside of the component.
     * @param {MouseEvent} e
     * @returns
     * @memberof Picky
     */

  }, {
    key: "handleOutsideClick",
    value: function handleOutsideClick(e) {
      // If keep open then don't toggle dropdown
      // If radio and not keepOpen then auto close it on selecting a value
      var keepOpen = this.props.keepOpen || this.props.multiple;

      if (this.node && this.node.contains(e.target) && keepOpen) {
        return;
      }

      this.toggleDropDown();
    }
  }, {
    key: "focusFilterInput",
    value: function focusFilterInput(isOpen) {
      if (isOpen && this.props.defaultFocusFilter) {
        if (this.filter && this.filter.filterInput) {
          this.filter.filterInput.focus();
        }
      }
    }
    /**
     * Toggle state of dropdown
     *
     * @memberof Picky
     */

  }, {
    key: "toggleDropDown",
    value: function toggleDropDown() {
      var _this6 = this;

      if (!this.state.open) {
        // Add event listener to listen for clicks to determine if click occured outside the component or not
        document.addEventListener('click', this.handleOutsideClick, false);
      } else {
        // Remove
        document.removeEventListener('click', this.handleOutsideClick, false);
      }

      this.setState({
        // Toggle open state
        open: !this.state.open
      }, function () {
        var isOpen = _this6.state.open; // Prop callbacks

        _this6.focusFilterInput(isOpen);

        if (isOpen && _this6.props.onOpen) {
          _this6.props.onOpen();
        } else if (!isOpen && _this6.props.onClose) {
          _this6.props.onClose();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          placeholder = _this$props2.placeholder,
          value = _this$props2.value,
          multiple = _this$props2.multiple,
          numberDisplayed = _this$props2.numberDisplayed,
          includeSelectAll = _this$props2.includeSelectAll,
          includeFilter = _this$props2.includeFilter,
          filterDebounce = _this$props2.filterDebounce,
          valueKey = _this$props2.valueKey,
          labelKey = _this$props2.labelKey,
          tabIndex = _this$props2.tabIndex,
          dropdownHeight = _this$props2.dropdownHeight,
          renderSelectAll = _this$props2.renderSelectAll;
      var open = this.state.open;
      var ariaOwns = '';

      if (open) {
        ariaOwns += this.state.id + '-list';
      }

      var buttonId = "".concat(this.state.id, "__button");
      var dropdownStyle = {
        maxHeight: dropdownHeight,
        overflowY: 'scroll'
      };
      return React__default.createElement("div", {
        ref: function ref(node) {
          _this7.node = node;
        },
        className: ['picky', className].join(' '),
        id: this.state.id,
        role: "combobox",
        "aria-controls": buttonId,
        "aria-expanded": open,
        "aria-haspopup": open,
        "aria-owns": ariaOwns,
        tabIndex: tabIndex
      }, React__default.createElement("button", {
        id: "".concat(this.state.id, "__button"),
        type: "button",
        className: "picky__input",
        "data-test": "picky-input",
        onClick: this.toggleDropDown
      }, React__default.createElement(Placeholder, {
        allSelected: this.state.allSelected,
        placeholder: placeholder,
        manySelectedPlaceholder: this.props.manySelectedPlaceholder,
        allSelectedPlaceholder: this.props.allSelectedPlaceholder,
        value: this.isControlled() ? value : this.state.selectedValue,
        multiple: multiple,
        numberDisplayed: numberDisplayed,
        valueKey: valueKey,
        labelKey: labelKey,
        "data-test": "placeholder-component"
      })), open && React__default.createElement("div", {
        className: "picky__dropdown",
        "data-test": "dropdown",
        id: this.state.id + '-list',
        style: dropdownStyle
      }, includeFilter && React__default.createElement(Filter, {
        ref: function ref(filter) {
          return _this7.filter = filter;
        },
        onFilterChange: filterDebounce > 0 ? debounce(this.onFilterChange, filterDebounce) : this.onFilterChange
      }), renderSelectAll && renderSelectAll({
        filtered: this.state.filtered,
        allSelected: this.state.allSelected,
        toggleSelectAll: this.toggleSelectAll,
        tabIndex: tabIndex,
        multiple: multiple
      }), !renderSelectAll && includeSelectAll && multiple && !this.state.filtered && React__default.createElement("div", {
        tabIndex: tabIndex,
        role: "option",
        "data-test": "selectall",
        id: this.state.id + '-option-' + 'selectall',
        "data-selectall": "true",
        "aria-selected": this.state.allSelected,
        className: this.state.allSelected ? 'option selected' : 'option',
        onClick: this.toggleSelectAll,
        onKeyPress: this.toggleSelectAll
      }, React__default.createElement("input", {
        type: "checkbox",
        readOnly: true,
        onClick: this.toggleSelectAll,
        tabIndex: -1,
        checked: this.state.allSelected,
        "aria-label": "select all"
      }), React__default.createElement("span", {
        "data-test": "select-all-text"
      }, this.props.selectAllText)), this.renderOptions()));
    }
  }]);

  return Picky;
}(React__default.PureComponent);

Picky.defaultProps = {
  numberDisplayed: 3,
  options: [],
  filterDebounce: 150,
  dropdownHeight: 300,
  onChange: function onChange() {},
  tabIndex: 0,
  keepOpen: true,
  selectAllText: 'Select all'
};
Picky.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.object]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  includeSelectAll: PropTypes.bool,
  includeFilter: PropTypes.bool,
  filterDebounce: PropTypes.number,
  dropdownHeight: PropTypes.number,
  onFiltered: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  render: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keepOpen: PropTypes.bool,
  manySelectedPlaceholder: PropTypes.string,
  allSelectedPlaceholder: PropTypes.string,
  selectAllText: PropTypes.string,
  renderSelectAll: PropTypes.func,
  defaultFocusFilter: PropTypes.bool,
  className: PropTypes.string,
  renderList: PropTypes.func
};

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


      var thisArg = arguments[1]; // 5. Let k be 0.

      var k = 0; // 6. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];

        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        } // e. Increase k by 1.


        k++;
      } // 7. Return -1.


      return -1;
    }
  });
}

module.exports = Picky;
