// @flow

const path = require("path");
const moment = require("moment");
const fs = require("fs-extra");
const {
  checkConf,
  confTypes,
  confTitles,
  confFocus,
  confReadme,
  confDir
} = require("../commands/config");
const prettyName = require("./file").prettyName;

const date = moment();

module.exports = {
  write(): void {
    checkConf();
    if (fs.existsSync(path.join(confReadme, "README.md"))) {
      const readme = read();
      fs.truncate(path.join(confReadme, "README.md"), 0, () => {
        fs.writeFile(path.join(confReadme, "README.md"), readme, err => {
          if (err) {
            return console.error("Error writing file: " + err);
          }
        });
      });
    } else {
      fs.truncate(path.join(confReadme, "README.md"), 0, () => {
        fs.writeFile(path.join(confReadme, "README.md"), generate(), err => {
          if (err) {
            return console.error("Error writing file: " + err);
          }
        });
      });
    }
  }
};

function generate(): string {
  const res = `
Personal Goals
==============
Personal goals made open source for accessibility across computers I use, transparency, accountability, and versioning. Learn more about it [here](http://una.im/personal-goals-guide).

Generated by the [personal-goals-cli](https://github.com/kevindavus/personal-goals-cli)

${getMDTemplate("yearly")}
${getMDTemplate("weekly-focus")}
${printAll()}

`;
  return res;
}

function printAll(): string {
  const types = confTypes;
  let res = "";
  types.forEach(type => {
    if (type !== "yearly") {
      res += getMDTemplate(type) + "\n";
    }
  });
  return res;
}

function markdownPrint(type, opts = {}): string {
  const dir = path.join(confDir, type);
  fs.ensureDirSync(dir);
  let res = "";
  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    fs.removeSync(dir);
    return "";
  }
  files.forEach(item => {
    if (!item.startsWith(".")) {
      const stats = fs.statSync(path.join(dir, item));
      if (stats.isDirectory()) {
        if (item.match(/\w{3}\d{5,6}/g)) {
          opts.date = item;
        } else {
          res += `\n***${item}***\n`;
        }
        res += markdownPrint(path.join(type, item), opts);
      } else if (stats.isFile()) {
        if (typeof opts.date === "string") {
          res += `* [x] ${prettyName(item)} - _${moment(
            opts.date,
            "MMMDDYYYYHHmm"
          ).format("MMMM Do YYYY")}_\n`;
        } else {
          res += `* [ ] ${prettyName(item)}\n`;
        }
      }
    }
  });
  return res;
}

function read(): string {
  let readme = fs.readFileSync(path.join(confReadme, "README.md"), "utf8");
  let res = "";
  let startPhrase = /<!-- goals (\S+) start-->/i;
  let endSearchPhrase = /<!-- goals (\S+) end-->/i;
  let endMatchPhrase = /<!-- goals (\S+) end-->/g;
  let idx = readme.search(startPhrase);
  while (idx !== -1) {
    const stats = readme.match(startPhrase);
    if (stats != null && typeof readme === "string") {
      res += readme.substring(0, idx);
      res += getMDTemplate(stats[1]);
      const goalEnd = readme.search(endSearchPhrase);
      const goalEndPhrases: ?Array<string> = readme.match(endMatchPhrase);
      let goalEndPhrase = "";
      if (goalEndPhrases != null) {
        goalEndPhrase = goalEndPhrases[0];
        readme = readme.substr(goalEnd + goalEndPhrase.length);
        idx = readme.search(/<!-- goals (\S+) start-->/i);
      } else {
        idx = -1;
      }
    }
  }
  return res;
}

function getMDTemplate(type): string {
  const weeklyFocus = confFocus.weekly;
  let focus = "";
  if (weeklyFocus.length > 0) {
    focus += "### This Week's Focus: " + weeklyFocus + "\n";
  }

  let res = `<!-- goals ${type} start-->`;
  if (type === "weekly-focus") {
    res += `

${focus}
# ${date.day(1).format("MMM Do, YYYY")}`;
  } else {
    const titles = confTitles;
    let title = "";
    if (type === "yearly") {
      title += "# ";
    } else {
      title += "### ";
    }
    if (typeof titles[type] === "string") {
      title += titles[type] + ": ";
    } else {
      title += `${prettyName(type)} Goals: `;
    }
    res += `

${title}
        
${markdownPrint(type)}${markdownPrint("completed/" + type)}`;
  }
  res += `
<!-- goals ${type} end-->`;

  return res;
}
