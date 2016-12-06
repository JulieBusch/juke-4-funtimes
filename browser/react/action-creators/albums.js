import {
  RECEIVE_ALBUMS,
  RECEIVE_ALBUM
} from '../constants';

import axios from 'axios';

export const startPlaying = () => ({ type: START_PLAYING });

export const stopPlaying = () => ({ type: STOP_PLAYING });

export const setCurrentSong = function (song) {
  return {
    type: SET_CURRENT_SONG,
    currentSong: song
  };
};

export const setCurrentSongList = function (songList) {
  return {
    type: SET_LIST,
    currentSongList: songList
  };
};

export const fetchAlbums = function () {
  return function (dispatch, getState) {
    axios.get('/api/albums/')
      .then(res => res)
      .catch(err => console.error(err));
  };
};

export const playAsync = function () {
  return function (dispatch, getState) {
    AUDIO.play();
    return dispatch(startPlaying());
  };

};

export const pauseAsync = function () {
  return function (dispatch, getState) {
    AUDIO.pause();
    return dispatch(stopPlaying());
  };

};
