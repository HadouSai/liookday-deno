export default {
  async validateSingIn(username: string, email: string, password: string) {
    const fields = [username, email, password];
    let errors: any[] = [];
    let status;

    for (let index = 0; index < fields.length; index++) {
      if (!fields[index].trim()) {
        status = 422; //uneaccesible
        errors.push({ [fields[index]]: `${fields[index]} is required` });
      }
    }

    if (status) {
      return false;
    }
    return true;
  },

  validateLogin(email: string, password: string) {
    const fields = [email, password];
    let errors: any[] = [];
    let status;

    for (let index = 0; index < fields.length; index++) {
      if (!fields[index].trim()) {
        status = 422; //uneaccesible
        errors.push({ [fields[index]]: `${fields[index]} is required` });
      }
    }

    if (status) {
      return false;
    }

    return true;
  },
};
