var childProcess = require('child_process');

const exec = (command) => {
    return new Promise(function(resolve, reject) {
        let cmd = childProcess.exec(command, {maxBuffer: 50000 * 1024}, function(err, stdout) {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
        cmd.stdout.pipe(process.stdout);
        cmd.stderr.pipe(process.stderr);
    })
};

module.exports = {
    exec
};