import {
  START_PLAYING,
  STOP_PLAYING,
  SET_CURRENT_SONG,
  SET_LIST
} from '../constants';

import AUDIO from '../audio';
import { skip } from '../utils';

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

export const loadAsync = function (currentSong, currentSongList) {
  return function (dispatch, getState) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    dispatch(setCurrentSong(currentSong));
    dispatch(setCurrentSongList(currentSongList));
  };

};

export const startSongAsync = (song, list) => dispatch => {
  dispatch(pauseAsync());
  dispatch(loadAsync(song, list));
  dispatch(playAsync());
};

export const toggleAsync = () => (dispatch, getState) => {
  const { isPlaying } = getState().player;
  if (isPlaying) dispatch(pauseAsync());
  else dispatch(playAsync());
};

export const toggleOneAsync = (selectedSong, selectedSongList) =>
  (dispatch, getState) => {
    const { currentSong } = getState().player;
    if (selectedSong.id !== currentSong.id)
      dispatch(startSongAsync(selectedSong, selectedSongList));
    else dispatch(toggleAsync());
};

export const nextAsync = () => {
  return (dispatch, getState) => {
    dispatch(startSongAsync(...skip(1, getState().player)));
  };
}

export const prevAsync = () =>
  (dispatch, getState) => {
    dispatch(startSongAsync(...skip(-1, getState().player)));
};

