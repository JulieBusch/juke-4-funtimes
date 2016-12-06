import { createStore, applyMiddleware, combineReducers } from 'redux';
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer';
import albumsReducer from './reducers/albums-reducer';
import artistsReducer from './reducers/artists-reducer';
import playlistsReducer from './reducers/playlists-reducer';
import songsReducer from './reducers/songs-reducer';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const combined = combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer,
  albums: albumsReducer,
  artists: artistsReducer,
  playlists: playlistsReducer,
  songs:songsReducer
});

export default createStore(combined, applyMiddleware(createLogger(), thunkMiddleware));
