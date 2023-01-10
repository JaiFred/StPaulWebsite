import React, { useState } from "react";

const useDropdown = (label, defaultState, secondlabel, options) => {
  const [state, updateState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const secondId = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => (<div className="mb-4">
    <label htmlFor={id} className="form-label">{label}</label>
      <select
        id={id}
        secondId={secondId}
        value={state}
        onChange={e => updateState(e.target.value)}
        onBlur={e => updateState(e.target.value)}
        disabled={!options.length}
        className="form-select"
      >        
        {options.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label>{secondlabel}</label>
      </div>
  );
  return [state, Dropdown, updateState];
};

export default useDropdown;