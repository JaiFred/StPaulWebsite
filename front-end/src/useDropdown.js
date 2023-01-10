import React, { useState } from "react";

const useDropdown = (label, defaultState, secondlabel, options, noOffset = false) => {
  const [state, updateState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const secondId = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => (<div className="mb-4">
    <label htmlFor={id} className="form-label">{label}</label>
    <div className={`${noOffset ? '' : 'ms-3'}`}>
      <select
        id={id}
        secondId={secondId}
        value={state}
        onChange={e => updateState(e.target.value)}
        onBlur={e => updateState(e.target.value)}
        disabled={!options.length}
        className={'form-select'}
      >        
        {options.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      </div >
     {secondlabel &&  <label className="form-label">{secondlabel}</label>}
      </div>
  );
  return [state, Dropdown, updateState];
};

export default useDropdown;