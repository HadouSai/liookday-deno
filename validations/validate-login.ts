export default {
  validateLogin(value: any) {
    let error;

    if (value.email && value.password) {
      for (const key in value) {
        if (
          Object.prototype.hasOwnProperty.call(value, key) && !value[key].trim()
        ) {
          return error = {
            type: "Autentification Failed",
            detail: "Some fields doesn't have value!",
            status: 400,
          };
        }
      }

      return error;
    }

    return error = {
      type: "Autentification Failed",
      detail: "Some fields are missing!",
      status: 400,
    };
  },
  validateSingIn(value: any) {
    let error;

    if (value.email && value.password && value.username) {
      for (const key in value) {
        if (
          Object.prototype.hasOwnProperty.call(value, key) && !value[key].trim()
        ) {
          return error = {
            type: "Registration Failed",
            detail: "Some fields doesn't have value!",
            status: 400,
          };
        }
      }

      return error;
    }

    return error = {
      type: "Registration Failed",
      detail: "Some fields are missing!",
      status: 400,
    };
  },
};
