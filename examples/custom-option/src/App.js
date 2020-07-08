import React from 'react';
import { Picky } from 'react-picky';
import 'react-picky/dist/picky.css';
import { options } from './makeData';

function App() {
  const [multiValue, setMultiValue] = React.useState([]);
  return (
    <div className="container">
      <div className="col">
        <h3>Multi select</h3>
        <Picky
          options={options}
          labelKey="label"
          valueKey="value"
          multiple={true}
          includeFilter
          includeSelectAll
          value={multiValue}
          onChange={setMultiValue}
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
      </div>
    </div>
  );
}

export default App;
