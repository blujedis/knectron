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
  args: ['./dist'] // first arg is path to electron app
});
```

## Knectron Options

```ts
interface IConnectOptions {
  port?: number;                  // port to listen on (default: 3000)
  host?: string;                  // host to listen on (default: 127.0.0.1)
  spawnOptions?: SpawnOptions;    // child_process options (default: { stdio: pipe })
  args?: any[];                   // args passed to Electron (default: './dist')
  maxTries?: number;              // max reconnect tries (default: 5)
  retryDelay?: number;            // delay between retries (default: 1200)

  // API ONLY - NO CLI
  onConnected?: (url?: string) => void;
  onFailed?: (tries?: number) => void;
  onRetry?: (tries?: number) => void;
  onExit?: (err: Error) => void;
}
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

## Using Knectron

You probably want to head over to:

[Sparc](https://github.com/blujedis/sparc)

There you will find full examples using **Knectron** both directly through the API and also with [Create React App](https://github.com/facebook/create-react-app).

A working example with the required configuration WITHOUT ejecting can be found below:

[Sparc - Create React App - Example](https://github.com/blujedis/sparc/example/cra)