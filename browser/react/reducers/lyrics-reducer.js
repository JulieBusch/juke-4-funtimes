
import {SET_LYRICS} from '../constants';

const initialState = {
  lyric: ''
}

export default function lyricsReducer (prevState = initialState, action) {

  let newState;

  switch(action.type){

    case SET_LYRICS:
      newState = Object.assign({}, prevState, {lyric: action.lyric});
      break;

    default:
      return prevState;
  }

  return newState;
}
