import {
  RECEIVE_PLAYLISTS,
  RECEIVE_PLAYLIST
} from '../constants';

import axios from 'axios';
import { convertSong } from '../utils';
import { hashHistory } from 'react-router';


export const fetchPlaylists = function () {
  return function (dispatch, getState) {
    axios.get('/api/playlists/')
      .then(res => dispatch(receivePlaylists(res.data)))
      .catch(err => console.error(err));
  };
};

export const receivePlaylists = function(playlists) {
  return {
    type: RECEIVE_PLAYLISTS,
    playlists: playlists
  }
}

export const fetchPlaylist = function (playlistId) {
  return function (dispatch, getState) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        playlist.songs = playlist.songs.map(convertSong);
        dispatch(receivePlaylist(playlist));
      });
  };
};

export const receivePlaylist = function(playlist) {
  return {
    type: RECEIVE_PLAYLIST,
    selectedPlaylist: playlist
  }
}

export const addPlaylist = function (playlistName) {
  return function (dispatch, getState) {
    axios.post('/api/playlists', { name: playlistName })
      .then(res => res.data)
      .then(playlist => {
        dispatch(receivePlaylists([...getState().playlists.playlists, playlist]));
        return playlist;
      })
      .then((playlist) => hashHistory.push(`/playlists/${playlist.id}`));
  };
};

export const addSongToPlaylist = function (playlistId, songId) {
  return function (dispatch, getState) {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
      })
      .then(res => res.data)
      .then(song => {
        const selectedPlaylist = getState().playlists.selectedPlaylist;
        const songs = getState().playlists.selectedPlaylist.songs;
        const newSongs = [...songs, convertSong(song)];
        const newSelectedPlaylist = Object.assign({}, selectedPlaylist, {
          songs: newSongs
        });
        dispatch(receivePlaylist(newSelectedPlaylist));
      });
  };
};
