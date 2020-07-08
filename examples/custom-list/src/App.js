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
          renderList={({
            items,
            selected,
            multiple,
            selectValue,
            getIsSelected,
          }) =>
            items.map(item => {
              const label = `${item.label} ID Even? ${
                item.value % 2 === 0 ? 'yes' : 'no'
              }`;
              return (
                <li key={item.id} onClick={() => selectValue(item)}>
                  {getIsSelected(item) ? <strong>{label}</strong> : label}
                </li>
              );
            })
          }
        />
      </div>
    </div>
  );
}

export default App;
