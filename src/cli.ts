import knectron from './';
import { parseArgv } from './utils';

const { args, opts, ignored } = parseArgv();

const help = `
Usage: knectron <path> [options]

Options:
  --port            the port to connect to
  --host            the host to connect to
  --silent          hides retries
  --max-tries       maximum connection retries
  --retry-delay     delay until retry
  --spawn-options   Node child_process spawn options
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

if (!args[0]) {
  console.error(`Cannot start Knectron using path of undefined`);
  process.exit();
}

opts.args = [args[0], ...ignored];

knectron(opts);
