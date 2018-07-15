import { observable, action } from 'mobx';
import {pubsub} from 'services';

class FormStore {
  @observable formDialog;

  constructor() {
    this.formDialog = { toggled: false, formType: null };
  }

  @action
  showFormDialog = (formType = 'spaces') => {
    this.formDialog = { toggled: true, formType: formType };
  }

  @action
  hideFormDialog = () => {
    this.formDialog = { toggled: false, formType: null };
  }

  @action
  submitForm = (form, formType) => {
    pubsub.publish(`${formType}_created`, form);
    this.hideFormDialog();
  }
}

export default new FormStore();