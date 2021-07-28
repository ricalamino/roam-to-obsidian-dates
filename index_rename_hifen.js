// This script renames all files and occurences in the obsidian folder to the new naming from _ underline to - dash.

const fs = require('fs');
var replace = require("replace");

const source_path = '/mnt/c/Users/Ricardo/Documents/ricardo/obsidian/journals'; // Source Daily Notes path
const target_path = '/mnt/c/Users/Ricardo/Documents/ricardo/obsidian/journals'; // Destination Daily notes path

const obsidian_path = '/mnt/c/Users/Ricardo/Documents/ricardo/obsidian/'; // Replace references in this folder

function getYear(filename) {
  const year = filename.substring(0, 4);
  return year;
}

function getMonth(filename) {
  const month = filename.substring(5, 7);
  return month;
}

function getDay(filename) {
  const day = filename.substring(8, 10);
  return day;
}

function readFiles(source_path) {
  const files = fs.readdirSync(source_path);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    renameFile(file, mountNewName(file));
  }
}

function mountNewName(filename) {
  const month = getMonth(filename);
  const day = getDay(filename);
  const year = getYear(filename);
  const new_name = year + '-' + month + '-' + day + '.md';
  return new_name;
}

function renameFile(old_filename, new_filename) {
  const old_file = source_path + '/' + old_filename;
  const new_file = target_path + '/' + new_filename;
  console.log('Renaming ' + old_file + ' to ' + new_file);
  fs.rename(old_file, new_file, function(err) {
    if ( err ) console.log('ERROR: ' + err)
    else {
      replace({
        regex: old_filename.substring(0, old_filename.indexOf('.')),
        replacement: new_filename.substring(0, new_filename.indexOf('.')),
        paths: [obsidian_path],
        recursive: true,
        silent: false,
      });
    };
  });
 
}

console.log('Starting...');
readFiles(source_path);
console.log('End');
