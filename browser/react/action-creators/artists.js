import {
  RECEIVE_ARTISTS,
  RECEIVE_ARTIST
} from '../constants';

import axios from 'axios';
//import { convertArtists, convertArtist } from '../utils';


export const fetchArtists = function () {
  return function (dispatch, getState) {
    axios.get('/api/artists/')
      .then(res => dispatch(receiveArtists(res.data)))
      .catch(err => console.error(err));
  };
};

export const receiveArtists = function(artists) {
  return {
    type: RECEIVE_ARTISTS,
    artists: convertArtists(artists)
  }
}

export const fetchArtist = function (artistId) {
  return function (dispatch, getState) {
    axios.get(`/api/artists/${artistId}`)
      .then(res => {
        dispatch(receiveArtist(res.data));
      });
  };
};

export const receiveArtist = function(artist) {
  return {
    type: RECEIVE_ARTIST,
    selectedArtist: convertArtist(artist)
  }
}
