import React from 'react';
import Prop from './prop';

function PropsPanel({ values, onChange }) {
  return (
    <div style={{ border: '1px solid #eaeaea' }}>
      <h5>Props panel</h5>
      {Object.keys(values).map(key => {
        const item = values[key];
        return (
          <Prop
            key={key}
            id={key}
            label={key}
            {...item}
            onChange={value => {
              console.log(value);
              onChange({
                ...values,
                [key]: {
                  ...values[key],
                  value,
                },
              });
            }}
          />
        );
      })}
    </div>
  );
}

export default PropsPanel;
