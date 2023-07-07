function MyAutocompleteSelect() {
  /* eslint-disable */
  class MyCustomElement extends HTMLInputElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      const template = document.createElement('template');
      template.innerHTML = `
            <style>
              :host {
                display: block;
              }
            </style>
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          `;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
/* eslint-disable */
  customElements.define('my-custom-element', MyCustomElement, { extends: 'input' });
  return (
    <div>
        <my-custom-element />
    </div>
  );
}

export default MyAutocompleteSelect;
