"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Submission {
    // String will have *indicators* at the start of new files
    constructor(fileName) {
        const file = fs_1.readFileSync(fileName, 'utf-8');
        this.submission = file.toString();
    }
    getSubmission() {
        return this.submission;
    }
}
exports.default = Submission;
//# sourceMappingURL=Submission.js.map