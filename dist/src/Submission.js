"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const console_1 = require("console");
class Submission {
    // String will have *indicators* at the start of new files
    constructor(fileName) {
        if (fileName == null || fileName == "") {
            throw console_1.exception("Need a valid string for file name to create a Submission");
        }
        const file = fs_1.readFileSync(fileName, 'utf-8');
        if (file == null) {
            throw console_1.exception("File name: '" + fileName + "' not found");
        }
        this.submission = file.toString();
    }
    getSubmission() {
        return this.submission;
    }
}
exports.default = Submission;
//# sourceMappingURL=Submission.js.map