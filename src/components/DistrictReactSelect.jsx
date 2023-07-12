/* eslint-disable */
import Select from 'react-select';

function MyComponent({ optionArray, isDisabled, selectHandler, county, district, districtIsSelected }) {
  const options = optionArray.map((o) => {
    return {
      value: o,
      label: o,
    }
  })

  return (
    <div className='react-select react-select-wide'>
      <label htmlFor='district' id='districtLabel' className={isDisabled ? "disabled" : ''}>區</label>
      <Select
        form='form'
        options={options}
        isDisabled={isDisabled}
        isClearable={false}
        defaultValue={districtIsSelected ? {value:district, label:district} : ''}
        inputId='district'
        placeholder={county ? '請選擇 區' : '請先選擇 縣/市'}
        noOptionsMessage={() => ''}
        onFocus={() => {
          document.getElementById('districtLabel').classList.add('focus');
        }}
        onBlur={() => {
          document.getElementById('districtLabel').classList.remove('focus');
        }}
        onChange={(selectedOption) => selectHandler(selectedOption)}
        onInputChange={() => ''}

        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            outline: state.isFocused ? '2px solid rgb(139, 87, 255)' : '',
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
