/* eslint-disable */
import Select from 'react-select';

function MyComponent({ optionArray, isDisabled, selectHandler, year, county, countyIsSelected }) {
  const options = optionArray.map((o) => {
    return {
      value: o,
      label: o,
    }
  })

  return (
    <div className='react-select react-select-wide'>
      <label htmlFor='county' id='countyLabel' className={isDisabled ? "disabled" : ''}>縣/市</label>
      <Select
        form='form'
        options={options}
        isDisabled={isDisabled}
        isClearable={false}
        defaultValue={countyIsSelected ? {value:county, label:county} : ''}
        inputId='county'
        placeholder={year ? '請選擇 縣/市' : '請先選擇 年'}
        noOptionsMessage={() => ''}
        onFocus={() => {
          document.getElementById('countyLabel').classList.add('focus');
        }}
        onBlur={() => {
          document.getElementById('countyLabel').classList.remove('focus');
        }}
        onChange={(selectedOption) => selectHandler(selectedOption)}
        onInputChange={() => ''}

        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            outline: state.isFocused ? '2px solid rgb(162, 0, 255)' : '',
            background: 'white'
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            paddingLeft: '2px',
          }),
          Input: (baseStyles, state) => ({
            ...baseStyles,
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: '13px',
            color: isDisabled ? 'rgb(200, 200, 200)' : 'black'
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
