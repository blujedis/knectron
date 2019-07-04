"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const utils_1 = require("./utils");
const { args, opts, ignored } = utils_1.parseArgv();
const help = `
Usage: knectron <path> [options]

Options:
  --port            the port to connect to
  --host            the host to connect to
  --max-tries       maximum connection retries
  --retry-delay     delay until retry
  --spawn-options   see Node spawn options.stdio
  --help, -h        display help
  --examples        show examples

Args provided after "--" directly passed to Electron
`;
const examples = `
Examples:
  knectron ./main.js --host=127.0.0.1 --port=5000
  knectron ./main.js -- --enable-logging --v=5
  knectron ./main.js --spawn-options.stdio=inherit
  knectron ./main.js --spawn-options.stdio='[0,1,2]'
`;
if (opts.help || opts.h || opts.examples || opts.example) {
    if (opts.help || opts.h)
        console.log(help);
    else
        console.log(examples);
    process.exit(0);
}
// if (!args[0]) {
//   console.error(`Cannot start Knectron using path of undefined`);
//   process.exit();
// }
opts.args = [args[0], ...ignored];
_1.default(opts);
//# sourceMappingURL=cli.js.map