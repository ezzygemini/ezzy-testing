const exec = require('child_process').exec;
exec('./node_modules/istanbul/lib/cli.js cover ./node_modules/testing/all.js');
