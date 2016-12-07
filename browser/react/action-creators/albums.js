import {
  RECEIVE_ALBUMS,
  RECEIVE_ALBUM
} from '../constants';

import axios from 'axios';
import { convertAlbums, convertAlbum } from '../utils';


export const fetchAlbums = function () {
  return function (dispatch, getState) {
    axios.get('/api/albums/')
      .then(res => dispatch(receiveAlbums(res.data)))
      .catch(err => console.error(err));
  };
};

export const receiveAlbums = function(albums) {
  return {
    type: RECEIVE_ALBUMS,
    albums: convertAlbums(albums)
  }
}

export const fetchAlbum = function (albumId) {
  return function (dispatch, getState) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => {
        dispatch(receiveAlbum(res.data));
      });
  };
};

export const receiveAlbum = function(album) {
  return {
    type: RECEIVE_ALBUM,
    selectedAlbum: convertAlbum(album)
  }
}
