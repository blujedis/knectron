# Knectron

Utility to connect Electron to remote source such as Create React App.

## Quick Start

```sh
$ npm install knectron
```

### Using API

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

## Using CLI

Knectron comes with a simple CLI. You can either install globally:

### Using Globally

Install **Knectron** globally.

```sh
$ npm install knectron -g
```

One in your path you can do the following where args after "--" are passed directly to electron as shown here below.

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

Then simply run the script as you would any npm script:

```sh
$ npm run knectron
```

### CLI Help

To display help from your terminal run:

```sh
$ knectron --help
```

You will see the below help:

```js
`Usage: knectron <path> [options]

Options:
  --port            the port to connect to
  --host            the host to connect to
  --max-tries       maximum connection retries
  --retry-delay     delay until retry
  --spawn-options   Node child_process spawn options
  --help, -h        display help
  --examples        show examples

Args provided after "--" directly passed to Electron`

```

### CLI Examples

From your terminal type:

```sh
$ knectron --examples
```

The following will be shown:

```js

`Examples:
  knectron ./main.js --host=127.0.0.1 --port=5000
  knectron ./main.js -- --enable-logging --v=5
  knectron ./main.js --spawn-options.stdio=inherit
  knectron ./main.js --spawn-options.stdio='[0,1,2]'`

```

## Using Knectron with Create React App

You probably want to head over to:

[Sparc](https://github.com/blujedis/sparc)

A working example using **Knectron** with [Create React App](https://github.com/facebook/create-react-app) without ejecting can be found [here](https://github.com/blujedis/sparc/tree/master/example/cra)