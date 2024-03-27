import Vue from 'vue';
import { languages } from '~/api';

Vue.filter('rating', function (number) {
  if (number.toString().length <= 1) {
    return `${number.toString()}.0`;
  }

  return number.toString();
});

Vue.filter('numberWithCommas', function (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

Vue.filter('numberWithDoubleDigits', function (number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
});

Vue.filter('runtime', function (minutes) {
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? hours + 'h' : ''} ${mins}min`;
});

Vue.filter('truncate', function (text, length, clamp) {
  text = text || '';
  clamp = clamp || '...';
  length = length || 30;

  if (text.length <= length) return text;

  let tcText = text.slice(0, length - clamp.length);
  let last = tcText.length - 1;

  while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

  last = last || length - clamp.length;

  tcText = tcText.slice(0, last);

  return tcText + clamp;
});

Vue.filter('arrayToList', function (array) {
  return array.map(item => item.name).join(', ');
});

Vue.filter('fullDate', function (string) {
  const dateArray = string.split('-');
  const date = dateArray[2].substr(0, 1) === '0' ? dateArray[2].substr(1, 1) : dateArray[2];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return `${date} ${months[dateArray[1] - 1]} ${dateArray[0]}`;
});

Vue.filter('fullLang', function (iso) {
  const fullLang = languages.find(lang => lang.iso_639_1 === iso);

  if (fullLang) {
    return fullLang.english_name;
  }

  return iso;
});
