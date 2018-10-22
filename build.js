const shell = require('shelljs');

// run build webpack
shell.cd('webpack');
shell.exec('yarn install && yarn run build');

// run build rollup
shell.cd('../rollup');
shell.exec('yarn install && yarn run build');

// run build poi
shell.cd('../poi');
shell.exec('yarn install && yarn run build');

// run build parcel
shell.cd('../parcel');
shell.exec('yarn install && yarn run build');