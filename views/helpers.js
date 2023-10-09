// FIle js to export some helpers functions
module.exports = {
  getError(errors, prop) {
    //fucntion to get the message out of the errors
    // prop: property name to specify whether it is email, or password, or passconfirm
    try {
      // mapped: turn error string arr into obj === {
      // email: {msg: ...}, password{}
      const a = errors.mapped()[prop].msg;
      return a;
    } catch {
      // In case the mapped.prop return undefine
      return "";
    }
  },
};