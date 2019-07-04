
import { Socket } from 'net';
import spawn from 'cross-spawn';
import { ChildProcess, SpawnOptions } from 'child_process';

interface IConnectOptions {
  port?: number;
  host?: string;
  spawnOptions?: SpawnOptions;
  args?: any[];
  maxTries?: number;
  retryDelay?: number;
  onConnected?: (url?: string) => void;
  onFailed?: (tries?: number) => void;
  onRetry?: (tries?: number) => void;
  onExit?: (err: Error) => void;
}

const DEFAULTS: IConnectOptions = {
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '127.0.0.1',
  spawnOptions: { stdio: 'pipe' },
  args: ['./dist'],
  maxTries: 5,
  retryDelay: 1300,
  onConnected: url => console.log(`Connected to: ${url}`),
  onRetry: tries => console.log(`Retrying connection (${tries})`),
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
          return res();
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

      if (options.onRetry)
        options.onRetry(tries);

      connect();

    }, options.retryDelay);

  });

  connect();

}

export = knectron;