const FormFactory = (formType) => {
  switch (formType) {
    case 'spaces':
      return {
        formOptions: {
          confirmText: 'Create',
          title: 'Create a space',
          description: 'Enter a name for your new space.'
        },
        formFields: {
          name: { value: '', label: 'Name', type: 'string', isRequired: true }
        }
      };
    default:
      return null;
  }
}

export default FormFactory;