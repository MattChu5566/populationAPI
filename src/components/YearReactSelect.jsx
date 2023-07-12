/* eslint-disable */
import Select from 'react-select';

function MyComponent({ optionArray, isDisabled, selectHandler, year }) {
  const options = optionArray.map((o) => {
    return {
      value: o,
      label: o,
    }
  })
  
  return (
    <div className='react-select'>
      <label htmlFor='year' id='yearLabel' className={isDisabled ? "disabled" : ''}>年份</label>
      <Select
        form='form'
        options={options}
        isDisabled={isDisabled}
        isClearable={false}
        defaultValue={{value:year, label:year}}
        inputId='year'
        placeholder={''}
        noOptionsMessage={() => ''}
        onFocus={() => {
          document.getElementById('yearLabel').classList.add('focus');
        }}
        onBlur={() => {
          document.getElementById('yearLabel').classList.remove('focus');
        }}
        onChange={(selectedOption) => selectHandler(selectedOption)}
        onInputChange={() => ''}

        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            outline: state.isFocused ? '2px solid rgb(139, 87, 255)' : ''
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            paddingLeft: '2px',
          }),
          Input: (baseStyles, state) => ({
            ...baseStyles,
          }),
          clearIndicator: (baseStyles, state) => ({
            ...baseStyles,
          }),
          indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            width: '15px',
            padding: '0px'
          }),
        }}
      />
    </div>

  );
}

export default MyComponent;
