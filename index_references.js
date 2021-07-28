// This script creates all possible combinations of the days and months and years and changes the occurences in files.
// It is helpful specially when there is no file created, but only the reference. E.g. [[April 12th, 2021]] and this will change to [[2021-04-12]].

const fs = require('fs');
var replace = require("replace");

const obsidian_path = '/mnt/c/Users/Ricardo/Documents/ricardo/obsidian/'; // Replace references in this folder

const arrayMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const arrayDays = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];
const arrayYears = ['2019', '2020', '2021'];

function getYear(old_text) {
  const year = old_text.substring(old_text.indexOf(',') + 2, old_text.length);
  return year;
}

function getMonth(old_text) {
  const month = old_text.substring(0, old_text.indexOf(' '));
  const monthNumber = arrayMonths.indexOf(month)+1;
  return monthNumber < 10 ? '0' + monthNumber : monthNumber;
}

function getDay(old_text) {
  const day = old_text.substring(old_text.indexOf(' ') + 1, old_text.indexOf(','));
  const dayNumber = arrayDays.indexOf(day)+1;
  return dayNumber < 10 ? '0' + dayNumber : dayNumber;
}

function mountNewName(old_text) {
  const month = getMonth(old_text);
  const day = getDay(old_text);
  const year = getYear(old_text);
  const new_name = year + '-' + month + '-' + day;
  return new_name;
}

function combineDate() {
  arrayYears.forEach(function(year) {
    arrayMonths.forEach(function(month) {
      arrayDays.forEach(function(day) {
        const old_name = month + ' ' + day + ', ' + year;
        const new_name = mountNewName(old_name);
        console.log(old_name + ' -> ' + new_name);
        replaceText(old_name, new_name);
      });
    });
  });
}

function replaceText(old_text, new_text) {
  replace({
    regex: old_text,
    replacement: new_text,
    paths: [obsidian_path],
    recursive: true,
    silent: false,
  });

}

console.log('Starting...');
combineDate();
console.log('End');