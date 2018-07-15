import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

class FormBuilder extends Component {
  render() {
    const { formFields, onChange, onGetErrorMessage } = this.props;
    const fieldKeys = Object.keys(formFields);

    return (
      <div className="form-builder">
        {
          fieldKeys.map((key, _index) => {
            const field = formFields[key];
            const { value, label, type } = field;

            switch (type) {
              case 'number':
                return (
                  <SpinButton
                    key={key}
                    label={label}
                    min={field.min || -Infinity}
                    max={field.max || Infinity}
                    step={field.step || 1}
                    value={value}
                    onChange={e => onChange(key, e.target.value)}
                  />
                )
              case 'string':
              default:
                return (
                  <TextField
                    key={key}
                    label={label}
                    value={value}
                    onChanged={value => onChange(key, value)}
                    onGetErrorMessage={(newValue) => onGetErrorMessage(field, newValue)}
                  />
                )
            }
          })
        }
      </div>
    )
  }
}

FormBuilder.propTypes = {
  formFields: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onGetErrorMessage: PropTypes.func.isRequired
}

export default FormBuilder;