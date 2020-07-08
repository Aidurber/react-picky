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
      </div>
    </div>
  );
}

export default App;
