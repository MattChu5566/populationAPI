/* eslint-disable */
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function MyComponent() {
  return (
    <Select
      options={options}
      styles={{
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'grey' : 'red',
            width: '50%',
            //height: '20px',
            // fontSize: '4px',
        }),
        
        placeholder: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'red',
        }),
        valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'purple',
        }),
        
        menu: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'yellow',
        }),
        menuList: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'green',
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
        }),
        input: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'white',
        }),
        container: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'black',
        }),
        indicatorsContainer: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'red',
            width: '50%',
            height: '50%',
        }), 
        dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'red',
            width: '50%',
            aspectRatio: '1 / 1',
        }),    
      }}
    />
  );
}

export default MyComponent;
