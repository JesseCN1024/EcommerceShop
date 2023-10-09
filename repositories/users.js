const fs = require('fs');
const cryto = require('crypto');
const util = require('util');
// get the promise version of the crypto.scrypt 
const scrypt = util.promisify(cryto.scrypt);
// Inherited from repostitory.js
const Repository = require('./repository');

class UsersRepository extends Repository{
  async create(attrs) {
    // create a new user
    // attrs = {email: '', password: ''}
    attrs.id = this.randomID();

    // Making salt
    const salt = cryto.randomBytes(8).toString("hex");
    // Creating the hashed pass (pass + salt)
    const hashed = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll(); // get all record out
    const record = {
      // create new record with salt-hashed pass
      ...attrs,
      password: `${hashed.toString("hex")}.${salt}`, // 28sdf81.1383da1 (pass + salt . salt)
    };
    records.push(record);
    // write back to JSON, must stringify records to json string for storing
    await this.writeAll(records);
    return record;
  }
  async comparePass(saved, supplied) {
    // saved compares with supplied
    // saved: password in the db with salt
    // supplied: password typed in by user
    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
    //scrypt return (err, buffer): buffer is an array-like obj so we need to convert it to string
    return hashedSuppliedBuf.toString("hex") === hashed;
  }
}


// // Testing function
// const test = async () => {
//   // create a repo: use await
//     const repo = await new UsersRepository("users.json"); // writesync
//   // add new user account and password to repo
// //   await repo.delete("fe60403f");
// // //   await repo.create({ username: "haidu", password: "abcd" }); // contains await in function
// // //   await repo.create({ username: "haidu3", password: "abcd3" }); // contains await in function
// // //   await repo.create({ username: "haidu2", password: "abcd2" }); // contains await in function
//   // print out all content in repo

//   const a = await repo.getOneBy({usernamesds: 2});
//   console.log(a);
  
//   const content = await repo.getAll();
//   console.log(content);
// }

// test();




// EXPORTING 
// Insstead of exporting the whole class, in case of error, we prefer export only an instance of the class
module.exports = new UsersRepository('users.json'); // already creating an instance then export it
