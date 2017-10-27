//@flow
const path = require("path");
const fs = require("fs-extra");
const { checkConf, confTypes, confAliases, confDir } = require("./config");
const {ls} = require("./ls")

module.exports = {
  command: "clear [type]",
  aliases: ["clr"],
  usage: `$0 clear  <w, m, y, o, c, a>`,
  description: `clear goals of a type`,
  builder: (yargs: { default: (string, string) => mixed }) =>
    yargs.default("type", "a"),
  handler: (argv: { type: string }) => {
    checkConf();

    let type: string;
    if (confTypes.includes(argv.type)) {
      type = argv.type;
    } else if (typeof confAliases[argv.type] === "string") {
      type = confAliases[argv.type];
    } else {
      switch (argv.type) {
        case "a":
          type = "all";
          break;
        case "complete":
        case "c":
          type = "completed";
          break;
        default:
          type = argv.type;
          break;
      }
    }
    clear(type);
    ls("all")
  }
};

function clear(type: string) {
  if (type === "all") {
    fs.removeSync(path.join(confDir));
  } else {
    fs.removeSync(path.join(confDir, type));
  }
}
