exports.ValidateError = class extends Error {
  errors;

  constructor(props, errors) {
    super(props);
    this.errors = errors;
  }
};
