const fs = require("fs");
const cryto = require("crypto");

module.exports = class Repository {
  constructor(filename) {
    if (!filename) {
      // name of json file
      throw new Error("Create a repo requires a filename");
    }
    this.filename = filename;
    try {
      // Check the filename if it exists else returns an error -> jump to try
      fs.accessSync(this.filename);
    } catch {
      // Create the file with text inside users.json
      fs.writeFileSync(this.filename, "[]");
    }
  }
  // FUNCTIONS USED FOR HANDLING DATA
  async getAll() {
    // get all the info of users
    // JSON.parse: parse from js string to js object
    // await fs.promise.readFile: await to read all content from the filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async writeAll(records) {
    // rewrite all the json file
    // stringify:
    // 2nd para: formatter function, here let is be null
    // 3nd: for every 2 levels of nesting will there be 2 tab space put down
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomID = () => {
    // random a number from 0 => 4 and return a hex '0f8tef8'
    return cryto.randomBytes(4).toString("hex");
  };
  async getOne(id) {
    const content = await this.getAll();
    return content.find((item) => item.id === id);
  }
  async delete(id) {
    const records = await this.getAll();
    const newRecords = records.filter((record) => record.id !== id);
    await this.writeAll(newRecords);
  }
  async update(id, attr) {
    const records = await this.getAll();
    records.forEach((record, idx) => {
      if (record.id === id) {
        // Object assign:
        // record[idx] = {account: ....};
        // attr = {pass: ...}
        // result = {account: ..., pass: ...}
        records[idx] = Object.assign(records[idx], attr);
      }
    });
    await this.writeAll(records);
  }
  async getOneBy(filter) {
    // get the first obj that match the filter
    const records = await this.getAll();
    for (let record of records) {
      // For every keys of filter, if there is a record that is qualified to it -> return
      if (Object.keys(filter).every((key) => filter[key] === record[key]))
        return record;
    }
  }
  async create(attrs){
    // Conventional creating funtion for all repostitory
    attrs.id = this.randomID();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
    return attrs;  
  }


};
