// Run just once in a Roam daily Notes folder with files such as: December 31st, 2016.md or April 1st, 2016.md

const fs = require('fs');
var replace = require("replace");

const source_path = './obsidian/journals'; // Source Daily Notes path
const target_path = './obsidian/journals'; // Destination Daily notes path

const obsidian_path = '/mnt/c/Users/Ricardo/Documents/ricardo/obsidian/';

const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const arrayDays = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];

function getYear(filename) {
  const year = filename.substring(filename.indexOf(',') + 2, filename.indexOf('.'));
  return year;
}

function getMonth(filename) {
  const month = filename.substring(0, filename.indexOf(' '));
  const monthNumber = arrayMonths.indexOf(month)+1;
  return monthNumber < 10 ? '0' + monthNumber : monthNumber;
}

function getDay(filename) {
  const day = filename.substring(filename.indexOf(' ') + 1, filename.indexOf(','));
  const dayNumber = arrayDays.indexOf(day)+1;
  return dayNumber < 10 ? '0' + dayNumber : dayNumber;
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
  const new_name = year + '_' + month + '_' + day + '.md';
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
