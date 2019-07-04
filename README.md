# Knectron

Utility to connect Electron to remote source such as Create React App.

## Quick Start

```sh
$ npm install knectron
```

### Configure

```ts
const knectron = require('../dist/knectron');

knectron({
  port: 3000,                 // (default: 3000)
  host: '127.0.0.1',          // (default: 127.0.0.1)
  args: ['./test/remote.js']  // args passed to Electron
});
```

## CLI

Knectron comes with a simple CLI. You can either install globally:

### Using Globally

```sh
$ npm install knectron -g
```

```sh
$ knectron ./main.js -- --enable-logging
```

### Using NPM Script

Or you can use npm scripts to execute:

```json
{
  "scripts": {
    "knectron": "knectron ./main.js"
  }
}
```

Then you can run:

```sh
$ npm run knectron
```

### CLI Options

```js

`Usage: knectron <path> [options]

Options:
  --port            the port to connect to
  --host            the host to connect to
  --max-tries       maximum connection retries
  --retry-delay     delay until retry
  --spawn-options   see Node spawn options.stdio
  --help, -h        display help
  --examples        show examples

Args provided after "--" directly passed to Electron`

```

### CLI Examples

```js

`Examples:
  knectron ./main.js --host=127.0.0.1 --port=5000
  knectron ./main.js -- --enable-logging --v=5
  knectron ./main.js --spawn-options.stdio=inherit
  knectron ./main.js --spawn-options.stdio='[0,1,2]'`

```

## Test Example

To see Knectron in action run <code>npm run test</code>.

This will start a simple **Express** server then run Knectron using **concurrently** to give you an idea of how this works.

Your implementation may differ but the process to connect to **Create React App** would be roughly the same. Just specify the host and port that your App is listening on then specify the path to your **Electron** main.js or whatever you've called it. Pretty simple. 

Enjoy!