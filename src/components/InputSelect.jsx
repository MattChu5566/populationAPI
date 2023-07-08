import { v4 as uuidv4 } from 'uuid';

function InputSelect({
  label, labelWord, placeholder, optionArray, state, selectChangeHandler, disabled = false,
}) {
  return (
    <label className={label} htmlFor={label}>
      <select
        key={uuidv4()}
        id={label}
        onChange={(e) => selectChangeHandler(e)}
        disabled={disabled}
      >
        <option selected disabled hidden>{label === 'district' && !disabled ? '請選擇區' : placeholder}</option>
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
      {disabled ? <span className="disabled">{labelWord}</span> : <span>{labelWord}</span>}
      <input className={`autoselect${label}`} disabled={disabled} />
    </label>
  );
}

export default InputSelect;
