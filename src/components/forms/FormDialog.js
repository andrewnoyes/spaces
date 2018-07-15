import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { FormBuilder, formFactory } from './';

class FormDialog extends Component {
  constructor(props) {
    super(props);

    const { formOptions, formFields } = formFactory(props.formType);
    this.state = formFields;
    this.formOptions = formOptions;
  }

  onChange = (key, value) => {
    const field = Object.assign({}, this.state[key]);
    field.value = value;
    this.setState({ [key]: field });
  }

  onGetErrorMessage = (field, newValue) => {
    return field.isRequired && !newValue ? `${field.label} cannot be blank` : '';
  }

  onSubmit = e => {
    e.preventDefault();

    const form = {};
    for (let key in this.state) {
      form[key] = this.state[key].value;
    }

    this.props.onSubmit(form);
  }

  isSubmitDisabled = () => {
    for (let key in this.state) {
      const field = this.state[key];
      if (!field.value && field.isRequired) {
        return true;
      }
    }

    return false;
  }

  render() {
    const { onClose } = this.props;
    const { title, description, confirmText } = this.formOptions;

    return (
      <Dialog
        hidden={false}
        onDismiss={onClose}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: title,
          subText: description
        }}
      >
        <form onSubmit={this.onSubmit}>
          <FormBuilder
            formFields={this.state}
            onChange={this.onChange}
            onGetErrorMessage={this.onGetErrorMessage}
          />
          <DialogFooter>
            <DefaultButton
              text="Cancel"
              onClick={onClose}
            />
            <PrimaryButton
              text={confirmText}
              type="submit"
              disabled={this.isSubmitDisabled()}
            />
          </DialogFooter>
        </form>
      </Dialog>
    )
  }
}

FormDialog.propTypes = {
  formType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default FormDialog;
