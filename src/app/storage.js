
import * as fs from "fs";


export default class Storage {
    constructor () {
        this.entries = []
    }

    get () {
        return this.entries
    }

    save (file, data) {
        fs.writeFileSync(
            file, 
            data,
            { encoding: "utf-8" }
          );
    }

    read (file) {
        let result = JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }));
        this.entries = result;
        return result
    }
}