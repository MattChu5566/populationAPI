import { v4 as uuidv4 } from 'uuid';

function InputSelect({
  label, labelWord, optionArray, state, selectChangeHandler, disabled = false,
}) {
  return (
    <label className={label} htmlFor={label}>
      <select
        key={uuidv4()}
        id={label}
        onChange={(e) => selectChangeHandler(e)}
        disabled={disabled}
      >
        {optionArray.map((option) => (
          <option
            selected={option === state}
            key={uuidv4()}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      <span className={disabled && 'disabled'}>{labelWord}</span>
      <input className={`autoselect${label}`} disabled={disabled} />
    </label>
  );
}

export default InputSelect;
