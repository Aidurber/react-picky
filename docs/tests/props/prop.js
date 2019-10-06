import React from 'react';

function Prop({ label, type, id, value, onChange, accessor }) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        id={id}
        checked={value}
        onChange={e => {
          console.log(e.target.checked);
          return onChange(accessor(e));
        }}
      />
    </>
  );
}

export default Prop;
