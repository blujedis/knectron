"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const net_1 = require("net");
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const DEFAULTS = {
    silent: false,
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
function knectron(options) {
    options = options || {};
    options.spawnOptions = { ...DEFAULTS.spawnOptions, ...options.spawnOptions };
    options = { ...DEFAULTS, ...options };
    const APP_URL = process.env.APP_URL = `http://${options.host}:${options.port}`;
    const client = new net_1.Socket();
    let starting = false;
    let tries = 0;
    let child;
    const load = () => {
        child = cross_spawn_1.default('electron', options.args, options.spawnOptions);
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
            if (options.onRetry && !options.silent)
                options.onRetry(tries);
            connect();
        }, options.retryDelay);
    });
    connect();
}
module.exports = knectron;
//# sourceMappingURL=index.js.map