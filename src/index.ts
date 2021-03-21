
import { Socket } from 'net';
import spawn from 'cross-spawn';
import { ChildProcess, SpawnOptions } from 'child_process';

interface IConnectOptions {
  silent?: boolean;                         // when true doesn't show connection attempts.
  port?: number;                            // port to connect to.
  host?: string;                            // host to connect to.
  spawnOptions?: SpawnOptions;              // process spawn options.
  args?: any[];                             // arguments to pass
  maxTries?: number;                        // max connection tries.
  retryDelay?: number;                      // delay between retries
  onConnected?: (url?: string) => void;     // on connected message/callback.
  onFailed?: (tries?: number) => void;      // on failed message/callback.
  onRetry?: (tries?: number) => void;       // on retry message/callback.
  onExit?: (err: Error) => void;            // on exit message/callack.
}

const DEFAULTS: IConnectOptions = {
  silent: false,
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '127.0.0.1',
  spawnOptions: { stdio: 'pipe' },
  args: ['./dist'],
  maxTries: 5,
  retryDelay: 1300,
  onConnected: url => console.log(`Connected to: ${url}`),
  onRetry: undefined, // tries => console.log(`Retrying connection (${tries})`),
  onFailed: failures => console.log(`Failed to connect after (${failures}) attempts`),
  onExit: err => err ? console.log(err.message) : console.log('Electron quit!')
};

function knectron(options?: IConnectOptions) {

  options = options || {};
  options.spawnOptions = { ...DEFAULTS.spawnOptions, ...options.spawnOptions };
  options = { ...DEFAULTS, ...options };

  const APP_URL = process.env.APP_URL = `http://${options.host}:${options.port}`;
  const client = new Socket();

  let starting = false;
  let tries = 0;
  let child: ChildProcess;

  const load = (): Promise<Error> => {

    child = spawn('electron', options.args, options.spawnOptions);

    if (options.onConnected)
      options.onConnected(APP_URL);

    return new Promise((res, rej) => {

      child.on('error', rej);

      child.on('exit', code => {
        if (code === 0)
          return res(undefined);
        rej(new Error(`Electron exited with code ${code}`));
      });

    });

  };

  const connect = () => {

    client.connect({ port: options.port }, async () => {

      client.end();

      if (!starting) {
        starting = true;

        const result = await load();
        if (options.onExit)
          options.onExit(result);
      }

    });

  };

  let timeoutId;

  client.on('error', () => {

    if (tries > options.maxTries) {
      clearTimeout(timeoutId);
      if (options.onFailed)
        options.onFailed(tries);
      return;
    }

    timeoutId = setTimeout(() => {
      tries += 1;
      if (options.onRetry && !options.silent && tries > 1)
        options.onRetry(tries);
      connect();
    }, options.retryDelay);

  });

  connect();

}

export = knectron;