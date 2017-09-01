const Configstore = require("configstore");
const path = require("path");
const fs = require("fs-extra");
const pkg = require("../package.json");
const conf = new Configstore(pkg.name, {
  dir: path.join(path.resolve(), "goals"),
  readme: path.resolve(),
  weeklyfocus: "Do good things this week",
  monthlyfocus: "Do good things this month",
  yearlyfocus: "Do good things this year"
});

module.exports = {
  command: {
    command: "config <key> [value]",
    aliases: ["cfg"],
    usage: `$0 config <key> [value]`,
    describe: "Set up the personal goals configuration",
    handler: argv => {
      if (argv.value === "clear" || argv.value === 'clr') {
        conf.delete(argv.key);
      } else if (argv.key === "clear" || argv.key === 'clr') {
        if (argv.value.length) {
          conf.delete(argv.value);
        } else {
          conf.clear();
        }
      } else if (argv.key === "ls" || argv.key === "get") {
        console.log(conf.all);
      } else {
        conf.set(argv.key, argv.value);
        checkConf();
        console.log("Successfully updated");
        console.log(`${chalk.bold(argv.key)}: ${conf.get(argv.key)}`);
      }
    }
  },

  checkConf: checkConf,

  conf: conf
};

function checkConf() {
  if (!fs.pathExistsSync(conf.get("dir"))) {
    console.log("setting working directory to ", path.resolve());
    conf.set("dir", path.resolve("goals"));
    conf.set("readme", path.resolve());
  }
}