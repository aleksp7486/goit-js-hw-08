'Use strict';

import Player from '@vimeo/player';
var _ = require('lodash');
import locSt from './storage';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const playerTimeCounterKey = 'videoplayer-current-time';
const playerCurrentTime = locSt.load(playerTimeCounterKey);

player.setCurrentTime(playerCurrentTime);

player.on(
  'timeupdate',
  _.throttle(function (data) {
    const currentTime = data.seconds;
    locSt.save(playerTimeCounterKey, currentTime);
  }, 1000)
);
