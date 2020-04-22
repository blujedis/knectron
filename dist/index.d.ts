/// <reference types="node" />
import { SpawnOptions } from 'child_process';
interface IConnectOptions {
    silent?: boolean;
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
declare function knectron(options?: IConnectOptions): void;
export = knectron;
