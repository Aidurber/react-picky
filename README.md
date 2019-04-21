# Picky ☜

Yet another React select list.

[![Build Status](https://travis-ci.org/Aidurber/react-picky.svg?branch=master)](https://travis-ci.org/Aidurber/react-picky)
[![codecov](https://codecov.io/gh/Aidurber/react-picky/branch/master/graph/badge.svg)](https://codecov.io/gh/Aidurber/react-picky)
[![license](https://img.shields.io/github/license/aidurber/react-picky.svg)]()
[![npm version](https://badge.fury.io/js/react-picky.svg)](https://badge.fury.io/js/react-picky)
[![gzip size](http://img.badgesize.io/aidurber/react-picky/master/dist/index.js.svg?compression=gzip)]()
[![Greenkeeper badge](https://badges.greenkeeper.io/Aidurber/react-picky.svg)](https://greenkeeper.io/)

## Motivation

When dealing with medium+ length select lists, especially multi-select lists. The common approach is to use tags e.g.

![Tag List](https://raw.githubusercontent.com/aidurber/react-picky/master/readme-tag-list.JPG)

Source: [React-Select by Jed Watson](https://github.com/JedWatson/react-select)

This approach is fine for smaller lists. When you have options for 20, 30, 100+ options that the use can select, it becomes unmanigable.

For example you have a internal staff mailing list. You want to mail all staff in a department (30 employees). You select all. That would be 30 tags taking unneccessary space.

This is a multiselect with checkboxes, a select all option, and a filter. Along a similar vein as [David Stutz's Bootstrap Multiselect](http://davidstutz.github.io/bootstrap-multiselect/). There is a port of that library to react with [Skratchdot's React Bootstrap Multiselect](https://github.com/skratchdot/react-bootstrap-multiselect). However I don't want a dependency on jQuery. If you are already using jQuery that might be an alternative for you.

If you like the tag list like [React-Select](https://github.com/JedWatson/react-select), then that would be a great option for you. It's a really great, well-tested library. Give it a look.

You can also achieve the same result with a great deal of flexibility using [Paypal's Downshift](https://github.com/paypal/downshift#usage).

# Peer Dependencies

```
 "prop-types": "^15.6.0",
 "react": "^16.5.0",
 "react-dom": "^16.5.0"
```

# Installation

```
  npm install --save react-picky
  # or
  yarn add react-picky
```

# Screenshots

## Single Select

![Single select](https://raw.githubusercontent.com/aidurber/react-picky/master/readme-single-select.png)

## Multi Select

![Multi select](https://raw.githubusercontent.com/aidurber/react-picky/master/readme-multi-select.jpg)

# Usage

## Basic example

```javascript
import Picky from 'react-picky';
import 'react-picky/dist/picky.css'; // Include CSS

<Picky
  options={[1, 2, 3, 4, 5]}
  value={[]}
  multiple={true}
  includeSelectAll={true}
  includeFilter={true}
  onChange={values => console.log(values)}
  dropdownHeight={600}
/>;
```

## Sandboxes

### Basic multiselect and single select

[![Edit qq1689zk3q](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/qq1689zk3q)

### Custom rendering

[![Edit mmpq6z7lr8](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mmpq6z7lr8)

## Props

```javascript
Picky.defaultProps = {
  numberDisplayed: 3,
  options: [],
  filterDebounce: 150,
  dropdownHeight: 300,
  onChange: () => {},
  tabIndex: 0,
  keepOpen: true,
  selectAllText: 'Select all',
};
Picky.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
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
  renderList: PropTypes.func,
  getFilterValue: PropTypes.func,
};
```

### Prop descriptions

- `placeholder` - Default message when no items are selected.
- `value` - The selected value(s), array if multiple is true. **Not needed if using as an uncontolled component**
- `numberDisplayed` - Then number of selected options displayed until it turns into '(selected count) selected'.
- `multiple` - Set to true for a multiselect, defaults to false.
- `options` - Array of possible options.
- `onChange` - Called whenever selected value(s) have changed. Pass the selected value back into `value`.
- `open` - Can open or close the dropdown manually. Defaults to false.
- `includeSelectAll` - If set to `true` will add a `Select All` checkbox at the top of the list.
- `includeFilter` - If set to `true` will add an input at the top of the dropdown for filtering the results.
- `filterDebounce` - Debounce timeout, used to limit the rate the internal `onFilterChange` gets called. Defaults to 150ms.
- `dropdownHeight` - The height of the dropdown. Defaults to 300px.
- `onFiltered` - Called after a filter has been done with the filtered options.
- `onOpen` - Called after the dropdown has opened.
- `onClose` - Called after the dropdown has closed.
- `valueKey` - If supplying an array of objects as options, this is required. It's used to identify which property on the object is the value.
- `labelKey` - If supplying an array of objects as options, this is required. It's used to identify which property on the object is the label.
- `render` - Used for custom rendering of items in the dropdown. More info below.
- `tabIndex` - Pass tabIndex to component for accessibility. Defaults to 0
- `keepOpen` - Default true. Single selects close automatically when selecting a value unless this is set to true.
- `manySelectedPlaceholder` - Default "%s selected" where %s is the number of items selected. This gets used when the number if items selected is more than the `numberDisplayed` prop and when all options are not selected.
- `allSelectedPlaceholder` - Default "%s selected" where %s is the number of items selected. This gets used when all options are selected.
- `selectAllText` - Default "Select all", use this to override "Select all" text from top of dropdown when included with `includeSelectAll`.
- `renderSelectAll` - Used for rendering a custom select all
- `defaultFocusFilter` - If set to true, will focus the filter by default when opened.
- `renderList` - Render prop for whole list, you can use this to add virtualization/windowing if necessary
- `filterPlaceholder` - Override the filter placeholder. Defaults to 'Filter...'
- `getFilterValue` - Will provide the input value of filter to the picky dropdown, so that if we have a larger list of options then we can only supply the matching options based on this value.
- `caseSensitiveFilter` - If true options will be returned when they match case

## Custom rendering

### Items

You can render out custom items for the dropdown.

**Example**

```javascript
<Picky
  value={this.state.arrayValue}
  options={bigList}
  onChange={this.selectMultipleOption}
  open={false}
  valueKey="id"
  labelKey="name"
  multiple={true}
  includeSelectAll={true}
  includeFilter={true}
  getFilterValue={this.getFilterValue}
  dropdownHeight={600}
  render={({
    style,
    isSelected,
    item,
    selectValue,
    labelKey,
    valueKey,
    multiple,
  }) => {
    return (
      <li
        style={style} // required
        className={isSelected ? 'selected' : ''} // required to indicate is selected
        key={item[valueKey]} // required
        onClick={() => selectValue(item)}
      >
        {/* required to select item */}
        <input type="checkbox" checked={isSelected} readOnly />
        <span style={{ fontSize: '30px' }}>{item[labelKey]}</span>
      </li>
    );
  }}
/>
```

The render callback gets called with the following properties:
style, isSelected, item, labelKey, valueKey, selectValue, multiple

- `isSelected` - boolean - true if item is selected. Use this for styling accordingly.
- `item` - object | number | string - The item to render.
- `labelKey` - Used to get the label if item is an object
- `valueKey` - Used to get the value if item is an object, good for keys.
- `selectValue` - function(item) - Selects the item on click
- `multiple` - boolean - Indicates if is a multiselect.

**Note**

- If your rendered item affects the height of the item in anyway. Supply `itemHeight` to Picky.
- If you wish to show a radio button or a checkbox, be sure to add `readOnly` prop to the input.

### Select All

```javascript
<Picky
  // ...
  renderSelectAll={({
    filtered,
    tabIndex,
    allSelected,
    toggleSelectAll,
    multiple,
  }) => {
    // Don't show if single select or items have been filtered.
    if (multiple && !filtered) {
      return (
        <div
          tabIndex={tabIndex}
          role="option"
          className={allSelected ? 'option selected' : 'option'}
          onClick={toggleSelectAll}
          onKeyPress={toggleSelectAll}
        >
          <h1>SELECT ALL</h1>
        </div>
      );
    }
  }}
/>
```

Gets called with the following properties:

- `filtered`: boolean - true if items have been filtered.
- `allSelected`: boolean true if all items are selected.
- `toggleSelectAll`: function selects or deselects all items.
- `tabIndex`: number used for specifying tab index.
- `multiple`: boolean true if multiselect.

### Render List

```javascript
<Picky
  value={this.state.arrayValue}
  options={bigList}
  onChange={this.selectMultipleOption}
  open={true}
  valueKey="id"
  labelKey="name"
  multiple={true}
  includeSelectAll={true}
  includeFilter={true}
  dropdownHeight={600}
  manySelectedPlaceholder={dynamicPlaceholder}
  defaultFocusFilter={true}
  renderList={({ items, selected, multiple, selectValue, getIsSelected }) =>
    items.map(item => (
      <li key={item.id} onClick={() => selectValue(item)}>
        {getIsSelected(item) ? <strong>{item.name}</strong> : item.name}
      </li>
    ))
  }
/>
```

This is an example of a custom rendered list.

# styled-components support

Support is pretty basic by allowing a `className` prop to `<Picky>`, so as a side effect you can add a custom class to the core Picky for easier style overrides.

**Usage**

```javascript
const Select = styled(Picky)`
  background-color: #ff0000;
  .picky__dropdown,
  .option {
    font-size: 2em;
  }
`;
```
