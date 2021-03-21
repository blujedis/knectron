"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgv = void 0;
function parseArgv() {
    const argv = process.argv.slice(2);
    const ignoreIdx = argv.indexOf('--');
    let ignored = ~ignoreIdx ? argv.slice(ignoreIdx + 1) : [];
    let args = ~ignoreIdx ? argv.slice(0, ignoreIdx) : [...argv];
    function toCamelcase(val) {
        const parts = val.replace(/^--?/, '').split('-');
        if (parts.length === 1)
            return parts[0];
        return parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    }
    const opts = [...args].reduce((a, c) => {
        if (/^--?/.test(c)) {
            const parts = c.split('=');
            const key = toCamelcase(parts[0]); // camelcase(parts[0]);
            let val = parts[1] || true;
            if (typeof val === 'string') {
                val = val.trim();
                val = /^[0-9]*$/.test(val) ? parseInt(val, 10) : val;
            }
            // check if val is array like.
            if (/^\[/.test(val)) {
                val = val.replace(/\[|\]/g, '').split(',');
                val = val.map(v => {
                    if (/^[0-9]*$/.test(v))
                        return parseInt(v, 10);
                    if (v === 'null')
                        return null;
                    if (v === 'undefined')
                        return undefined;
                    if (v === 'stdout')
                        return process.stdout;
                    if (v === 'stdin')
                        return process.stdin;
                    if (v === 'stderr')
                        return process.stderr;
                    return v;
                });
            }
            // ONlY one level, all that's needed here.
            if (key.includes('.')) {
                const keyParts = key.split('.');
                a[keyParts[0]] = a[keyParts[0]] || {};
                a[keyParts[0]][keyParts[1]] = val;
            }
            else {
                a[key] = val;
            }
        }
        return a;
    }, {});
    args = args.filter(v => !/^--?/.test(v));
    return {
        argv,
        args,
        opts,
        ignored
    };
}
exports.parseArgv = parseArgv;
//# sourceMappingURL=utils.js.map