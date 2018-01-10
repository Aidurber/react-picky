'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var debounce = _interopDefault(require('lodash.debounce'));
var includes = _interopDefault(require('lodash.includes'));
var reactVirtualized = require('react-virtualized');
var isEqual = _interopDefault(require('lodash.isequal'));
var format = _interopDefault(require('simple-format'));

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
          labelKey = _props.labelKey,
          manySelectedPlaceholder = _props.manySelectedPlaceholder,
          allSelectedPlaceholder = _props.allSelectedPlaceholder,
          allSelected = _props.allSelected;


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
              message = includes(manySelectedPlaceholder, '%s') ? format(manySelectedPlaceholder, value.length) : manySelectedPlaceholder;
              //If all selected and there is an allselectedplaceholder use that
            } else if (allSelected && allSelectedPlaceholder) {
              // if it doesn't include the sprintf token then just use the placeholder
              message = includes(allSelectedPlaceholder, '%s') ? format(allSelectedPlaceholder, value.length) : allSelectedPlaceholder;
            } else {
              //If more than numberDisplayed then show "length selected"
              message = value.length + ' selected';
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
      fixedWidth: true
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
        if (includes(valueLookup, val)) {
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

    /**
     * Determine whether all items are selected
     *
     * @returns {Boolean}
     * @memberof Picky
     */

  }, {
    key: 'allSelected',
    value: function allSelected() {
      var selectedValue = this.state.selectedValue;
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
    key: 'selectAll',
    value: function selectAll() {
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
    key: 'isControlled',
    value: function isControlled() {
      return this.props.value != null;
    }

    /**
     * Render virtual list
     *
     * @param {any} items
     * @returns
     * @memberof Picky
     */

  }, {
    key: 'renderVirtualList',
    value: function renderVirtualList(items) {
      var _this4 = this;

      return React__default.createElement(
        reactVirtualized.AutoSizer,
        null,
        function (_ref) {
          var width = _ref.width,
              height = _ref.height;

          var actualWidth = width;
          // Used to reduce warning when in test env.
          if (process.env.NODE_ENV === 'test') {
            actualWidth = window.innerWidth;
          }
          return React__default.createElement(reactVirtualized.List, {
            defaultHeight: height,
            height: _this4.props.dropdownHeight || 300,
            width: actualWidth,
            rowCount: items.length,
            rowHeight: _this4.cellMeasurerCache.rowHeight,
            rowRenderer: function rowRenderer(_ref2) {
              var index = _ref2.index,
                  key = _ref2.key,
                  parent = _ref2.parent,
                  style = _ref2.style;

              var item = items[index];

              var isSelected = false;
              // If controlled component determine selected state based on props.
              if (_this4.isControlled()) {
                isSelected = Array.isArray(_this4.props.value) && includes(_this4.props.value, item) || !Array.isArray(_this4.props.value) && _this4.props.value === item;
              } else {
                // If not a controlled component determine selected state based on state
                isSelected = Array.isArray(_this4.state.selectedValue) && includes(_this4.state.selectedValue, item) || !Array.isArray(_this4.state.selectedValue) && _this4.state.selectedValue === item;
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
                  labelKey: _this4.props.labelKey,
                  valueKey: _this4.props.valueKey,
                  multiple: _this4.props.multiple
                }) : React__default.createElement(Option, {
                  key: key,
                  style: style,
                  item: item,
                  isSelected: isSelected,
                  selectValue: _this4.selectValue,
                  labelKey: _this4.props.labelKey,
                  valueKey: _this4.props.valueKey,
                  multiple: _this4.props.multiple,
                  tabIndex: _this4.props.tabIndex,
                  id: _this4.state.id + '-option-' + index
                })
              );
            }
          });
        }
      );
    }
    /**
     * Renders a non-virtualised list.
     *
     * @param {any} items
     * @returns
     * @memberof Picky
     */

  }, {
    key: 'renderPlainList',
    value: function renderPlainList(items) {
      var _this5 = this;

      return items.map(function (item, index) {
        var isSelected = false;
        // Create a key based on the options value
        var key = isDataObject(item, _this5.props.labelKey, _this5.props.valueKey) ? item[_this5.props.valueKey] : item;

        // If controlled component determine selected state based on props.
        if (_this5.isControlled()) {
          isSelected = Array.isArray(_this5.props.value) && includes(_this5.props.value, item) || !Array.isArray(_this5.props.value) && _this5.props.value === item;
        } else {
          // If not a controlled component determine selected state based on state
          isSelected = Array.isArray(_this5.state.selectedValue) && includes(_this5.state.selectedValue, item) || !Array.isArray(_this5.state.selectedValue) && _this5.state.selectedValue === item;
        }
        // If render prop supplied for items call that.
        if (typeof _this5.props.render === 'function') {
          return _this5.props.render({
            index: index,
            style: {},
            item: item,
            isSelected: isSelected,
            selectValue: _this5.selectValue,
            labelKey: _this5.props.labelKey,
            valueKey: _this5.props.valueKey,
            multiple: _this5.props.multiple
          });
        } else {
          // Render a simple option
          return React__default.createElement(Option, {
            key: key,
            item: item,
            isSelected: isSelected,
            selectValue: _this5.selectValue,
            labelKey: _this5.props.labelKey,
            valueKey: _this5.props.valueKey,
            multiple: _this5.props.multiple,
            tabIndex: _this5.props.tabIndex,
            id: _this5.state.id + '-option-' + index
          });
        }
      });
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _props = this.props,
          options = _props.options,
          virtual = _props.virtual;

      var items = this.state.filtered ? this.state.filteredOptions : options;

      if (virtual) {
        return this.renderVirtualList(items);
      } else {
        return this.renderPlainList(items);
      }
    }
    /**
     * Called when Filter term changes. Sets filteredOptions and filtered state.
     *
     * @param {any} term
     * @returns
     * @memberof Picky
     */

  }, {
    key: 'onFilterChange',
    value: function onFilterChange(term) {
      var _this6 = this;

      if (!term.trim()) {
        return this.setState({
          filtered: false,
          filteredOptions: []
        });
      }
      var filteredOptions = this.props.options.filter(function (option) {
        if (isDataObject(option, _this6.props.labelKey, _this6.props.valueKey)) {
          return includes(String(option[_this6.props.labelKey]).toLowerCase(), term.toLowerCase());
        }
        return includes(String(option).toLowerCase(), term.toLowerCase());
      });
      this.setState({
        filtered: true,
        filteredOptions: filteredOptions
      }, function () {
        if (_this6.props.onFiltered) {
          _this6.props.onFiltered(filteredOptions);
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
    /**
     * Toggle state of dropdown
     *
     * @memberof Picky
     */

  }, {
    key: 'toggleDropDown',
    value: function toggleDropDown() {
      var _this7 = this;

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
        var isOpen = _this7.state.open;
        // Prop callbacks
        if (isOpen && _this7.props.onOpen) {
          _this7.props.onOpen();
        } else if (!isOpen && _this7.props.onClose) {
          _this7.props.onClose();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

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
          tabIndex = _props2.tabIndex,
          dropdownHeight = _props2.dropdownHeight;
      var open = this.state.open;

      var ariaOwns = '';
      if (open) {
        ariaOwns += this.state.id + '-list';
      }

      var dropdownStyle = {};
      if (!this.props.virtual) {
        dropdownStyle = { maxHeight: dropdownHeight, overflowY: 'scroll' };
      }
      return React__default.createElement(
        'div',
        {
          ref: function ref(node) {
            _this8.node = node;
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
            allSelected: this.state.allSelected,
            placeholder: placeholder,
            manySelectedPlaceholder: this.props.manySelectedPlaceholder,
            allSelectedPlaceholder: this.props.allSelectedPlaceholder,
            value: this.isControlled() ? value : this.state.selectedValue,
            multiple: multiple,
            numberDisplayed: numberDisplayed,
            valueKey: valueKey,
            labelKey: labelKey
          })
        ),
        open && React__default.createElement(
          'div',
          {
            className: 'picky__dropdown',
            id: this.state.id + '-list',
            style: dropdownStyle
          },
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
            React__default.createElement(
              'span',
              { 'data-test': 'select-all-text' },
              this.props.selectAllText
            )
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
  keepOpen: true,
  virtual: true,
  selectAllText: 'Select all'
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
  keepOpen: PropTypes.bool,
  virtual: PropTypes.bool,
  manySelectedPlaceholder: PropTypes.string,
  allSelectedPlaceholder: PropTypes.string,
  selectAllText: PropTypes.string
};

module.exports = Picky$1;
