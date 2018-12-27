const chalk = require('chalk');

const divider = chalk.gray('\n----------------------------------------');

const logger = {
  error: err => console.error(chalk.red(err)),

  appStarted: port => console.log(`
    Server started ! ${chalk.green('✓')} \n
    ${chalk.bold('Access URLs:')}${divider}
    Localhost: ${chalk.magenta(`http://localhost:${port}`)}${divider}
    ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `),
};

module.exports = logger;
