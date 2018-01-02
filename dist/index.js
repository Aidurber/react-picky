'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var debounce = _interopDefault(require('lodash.debounce'));
var reactVirtualized = require('react-virtualized');
var isEqual = _interopDefault(require('lodash.isequal'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isDataObject = function isDataObject(obj, valueKey, labelKey) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.hasOwnProperty(valueKey) && obj.hasOwnProperty(labelKey);
};

var generateGuid = function generateGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// NEEDS REFACTOR
var isEmptyValue = function isEmptyValue(value) {
  return value === null || value === undefined || Array.isArray(value) && !value.length;
};

var Placeholder = function (_React$PureComponent) {
  _inherits$1(Placeholder, _React$PureComponent);

  function Placeholder(props) {
    _classCallCheck$1(this, Placeholder);

    return _possibleConstructorReturn$1(this, (Placeholder.__proto__ || Object.getPrototypeOf(Placeholder)).call(this, props));
  }

  _createClass$1(Placeholder, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          placeholder = _props.placeholder,
          value = _props.value,
          numberDisplayed = _props.numberDisplayed,
          multiple = _props.multiple,
          valueKey = _props.valueKey,
          labelKey = _props.labelKey;


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
            //If more than numberDisplayed then show "length selected"
            message = value.length + ' selected';
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

      return React__default.createElement(
        'span',
        { className: 'picky__placeholder' },
        message
      );
    }
  }]);

  return Placeholder;
}(React__default.PureComponent);

Placeholder.defaultProps = {
  placeholder: 'None selected'
};
Placeholder.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.object]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string
};

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_Component) {
  _inherits$2(Filter, _Component);

  function Filter() {
    _classCallCheck$2(this, Filter);

    return _possibleConstructorReturn$2(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).apply(this, arguments));
  }

  _createClass$2(Filter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React__default.createElement(
        'div',
        { className: 'picky__filter' },
        React__default.createElement('input', {
          type: 'text',
          className: 'picky__filter__input',
          placeholder: 'Filter...',
          tabIndex: this.props.tabIndex,
          'aria-label': 'filter options',
          onChange: function onChange(event) {
            return _this2.props.onFilterChange(event.target.value);
          }
        })
      );
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
  return React__default.createElement(
    'div',
    {
      tabIndex: tabIndex,
      id: id,
      role: 'option',
      style: style,
      'aria-selected': isSelected,
      className: cssClass,
      onClick: select,
      onKeyPress: function onKeyPress(e) {
        e.preventDefault();
        selectValue(item);
      }
    },
    React__default.createElement('input', {
      type: inputType,
      readOnly: true,
      onClick: select,
      tabIndex: -1,
      checked: isSelected,
      'aria-label': body
    }),
    body
  );
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import VirtualList from 'react-tiny-virtual-list';]
var Picky$1 = function (_React$PureComponent) {
  _inherits(Picky, _React$PureComponent);

  function Picky(props) {
    _classCallCheck(this, Picky);

    var _this = _possibleConstructorReturn(this, (Picky.__proto__ || Object.getPrototypeOf(Picky)).call(this, props));

    _this.state = {
      selectedValue: props.value || (props.multiple ? [] : null),
      open: props.open,
      filtered: false,
      filteredOptions: [],
      id: generateGuid(),
      allSelected: false
    };
    _this.cellMeasurerCache = new reactVirtualized.CellMeasurerCache({
      defaultHeight: props.itemHeight || 35,
      fixedWidth: false
    });
    _this.toggleDropDown = _this.toggleDropDown.bind(_this);
    _this.selectAll = _this.selectAll.bind(_this);
    _this.onFilterChange = _this.onFilterChange.bind(_this);
    _this.selectValue = _this.selectValue.bind(_this);
    _this.allSelected = _this.allSelected.bind(_this);
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_this);
    return _this;
  }

  _createClass(Picky, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var allSelected = this.allSelected();
      this.setState({
        allSelected: allSelected
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.options !== nextProps.options || this.state.selectedValue !== nextProps.value) {
        this.setState({
          allSelected: this.allSelected()
        });
      }
    }
  }, {
    key: 'selectValue',
    value: function selectValue(val) {
      var _this2 = this;

      var valueLookup = this.isControlled() ? this.props.value : this.state.selectedValue;

      if (this.props.multiple && Array.isArray(valueLookup)) {
        if (valueLookup.includes(val)) {
          var currIndex = valueLookup.indexOf(val);
          // Remove
          this.setState({
            selectedValue: [].concat(_toConsumableArray(valueLookup.slice(0, currIndex)), _toConsumableArray(valueLookup.slice(currIndex + 1)))
          }, function () {
            _this2.props.onChange(_this2.state.selectedValue);
          });
        } else {
          this.setState({
            selectedValue: [].concat(_toConsumableArray(this.state.selectedValue), [val])
          }, function () {
            _this2.props.onChange(_this2.state.selectedValue);
          });
        }
      } else {
        this.setState({
          selectedValue: val
        }, function () {
          _this2.props.onChange(_this2.state.selectedValue);
        });
      }
    }
  }, {
    key: 'allSelected',
    value: function allSelected() {
      var selectedValue = this.state.selectedValue;
      var options = this.props.options;

      var copiedOptions = options.slice(0);
      var copiedSelectedValue = Array.isArray(selectedValue) ? selectedValue.slice(0) : [];
      return isEqual(copiedOptions, copiedSelectedValue);
    }
  }, {
    key: 'selectAll',
    value: function selectAll() {
      var _this3 = this;

      this.setState({
        selectedValue: !this.state.allSelected ? this.props.options : [],
        allSelected: !this.state.allSelected
      }, function () {
        _this3.props.onChange(_this3.state.selectedValue);
      });
    }
  }, {
    key: 'isControlled',
    value: function isControlled() {
      return this.props.value != null;
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this4 = this;

      var _props = this.props,
          options = _props.options,
          value = _props.value,
          dropdownHeight = _props.dropdownHeight,
          labelKey = _props.labelKey,
          valueKey = _props.valueKey,
          multiple = _props.multiple,
          tabIndex = _props.tabIndex;

      var items = this.state.filtered ? this.state.filteredOptions : options;

      return React__default.createElement(
        reactVirtualized.AutoSizer,
        null,
        function (_ref) {
          var width = _ref.width;
          return React__default.createElement(reactVirtualized.List, {
            height: dropdownHeight || 300,
            width: width,
            rowCount: items.length,
            rowHeight: _this4.cellMeasurerCache.rowHeight,
            rowRenderer: function rowRenderer(_ref2) {
              var index = _ref2.index,
                  key = _ref2.key,
                  parent = _ref2.parent,
                  style = _ref2.style;

              var item = items[index];

              var isSelected = false;
              if (_this4.isControlled()) {
                isSelected = Array.isArray(value) && value.includes(item) || !Array.isArray(value) && value === item;
              } else {
                isSelected = Array.isArray(_this4.state.selectedValue) && _this4.state.selectedValue.includes(item) || !Array.isArray(_this4.state.selectedValue) && _this4.state.selectedValue === item;
              }

              return React__default.createElement(
                reactVirtualized.CellMeasurer,
                {
                  cache: _this4.cellMeasurerCache,
                  columnIndex: 0,
                  key: key,
                  parent: parent,
                  rowIndex: index
                },
                _this4.props.render ? _this4.props.render({
                  index: index,
                  style: style,
                  item: item,
                  isSelected: isSelected,
                  selectValue: _this4.selectValue,
                  labelKey: labelKey,
                  valueKey: valueKey,
                  multiple: multiple
                }) : React__default.createElement(Option, {
                  key: key,
                  style: style,
                  item: item,
                  isSelected: isSelected,
                  selectValue: _this4.selectValue,
                  labelKey: labelKey,
                  valueKey: valueKey,
                  multiple: multiple,
                  tabIndex: tabIndex,
                  id: _this4.state.id + '-option-' + index
                })
              );
            }
          });
        }
      );
    }
  }, {
    key: 'onFilterChange',
    value: function onFilterChange(term) {
      var _this5 = this;

      if (!term.trim()) {
        return this.setState({
          filtered: false,
          filteredOptions: []
        });
      }
      var filteredOptions = this.props.options.filter(function (option) {
        if (isDataObject(option, _this5.props.labelKey, _this5.props.valueKey)) {
          return String(option[_this5.props.labelKey]).toLowerCase().includes(term.toLowerCase());
        }
        return String(option).toLowerCase().includes(term.toLowerCase());
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
  }, {
    key: 'handleOutsideClick',
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
    key: 'toggleDropDown',
    value: function toggleDropDown() {
      var _this6 = this;

      if (!this.state.open) {
        // attach/remove event handler
        document.addEventListener('click', this.handleOutsideClick, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
      }

      this.setState({
        open: !this.state.open
      }, function () {
        var isOpen = _this6.state.open;
        if (isOpen && _this6.props.onOpen) {
          _this6.props.onOpen();
        } else if (!isOpen && _this6.props.onClose) {
          _this6.props.onClose();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _props2 = this.props,
          placeholder = _props2.placeholder,
          value = _props2.value,
          multiple = _props2.multiple,
          numberDisplayed = _props2.numberDisplayed,
          includeSelectAll = _props2.includeSelectAll,
          includeFilter = _props2.includeFilter,
          filterDebounce = _props2.filterDebounce,
          valueKey = _props2.valueKey,
          labelKey = _props2.labelKey,
          tabIndex = _props2.tabIndex;
      var open = this.state.open;

      var ariaOwns = '';
      if (open) {
        ariaOwns += this.state.id + '-list';
      }
      return React__default.createElement(
        'div',
        {
          ref: function ref(node) {
            _this7.node = node;
          },
          className: 'picky',
          id: this.state.id,
          role: 'combobox',
          'aria-controls': this.state.id + '__button',
          'aria-expanded': open,
          'aria-haspopup': open,
          'aria-owns': ariaOwns,
          tabIndex: tabIndex
        },
        React__default.createElement(
          'button',
          {
            id: this.state.id + '__button',
            type: 'button',
            className: 'picky__input',
            onClick: this.toggleDropDown
          },
          React__default.createElement(Placeholder, {
            placeholder: placeholder,
            value: this.isControlled() ? value : this.state.selectedValue,
            multiple: multiple,
            numberDisplayed: numberDisplayed,
            valueKey: valueKey,
            labelKey: labelKey
          })
        ),
        open && React__default.createElement(
          'div',
          { className: 'picky__dropdown', id: this.state.id + '-list' },
          includeFilter && React__default.createElement(Filter, {
            onFilterChange: filterDebounce > 0 ? debounce(this.onFilterChange, filterDebounce) : this.onFilterChange
          }),
          includeSelectAll && multiple && !this.state.filtered && React__default.createElement(
            'div',
            {
              tabIndex: tabIndex,
              role: 'option',
              id: this.state.id + '-option-' + 'selectall',
              'data-selectall': 'true',
              'aria-selected': this.state.allSelected,
              className: this.state.allSelected ? 'option selected' : 'option',
              onClick: this.selectAll,
              onKeyPress: this.selectAll
            },
            React__default.createElement('input', {
              type: 'checkbox',
              readOnly: true,
              onClick: this.selectAll,
              tabIndex: -1,
              checked: this.state.allSelected,
              'aria-label': 'select all'
            }),
            'Select All'
          ),
          this.renderOptions()
        )
      );
    }
  }]);

  return Picky;
}(React__default.PureComponent);

Picky$1.defaultProps = {
  numberDisplayed: 3,
  options: [],
  filterDebounce: 150,
  dropdownHeight: 300,
  onChange: function onChange() {},
  itemHeight: 35,
  tabIndex: 0,
  keepOpen: true
};
Picky$1.propTypes = {
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
  itemHeight: PropTypes.number,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keepOpen: PropTypes.bool
};

module.exports = Picky$1;
