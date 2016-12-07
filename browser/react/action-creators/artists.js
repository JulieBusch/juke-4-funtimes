import {
  RECEIVE_ARTISTS,
  RECEIVE_ARTIST
} from '../constants';

import axios from 'axios';
import { convertAlbums, convertSong } from '../utils';


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
    artists: artists
  }
}

export const fetchArtist = function (artistId) {
  return function (dispatch, getState) {
    Promise
      .all([
        axios.get(`/api/artists/${artistId}`),
        axios.get(`/api/artists/${artistId}/albums`),
        axios.get(`/api/artists/${artistId}/songs`)
      ])
      .then(res => res.map(r => r.data))
      .then(([artist, albums, songs]) => {
        songs = songs.map(convertSong);
        albums = convertAlbums(albums);
        artist.albums = albums;
        artist.songs = songs;
        dispatch(receiveArtist(artist));
      });
  };
};

export const receiveArtist = function(artist) {
  return {
    type: RECEIVE_ARTIST,
    selectedArtist: artist
  }
}
