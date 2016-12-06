import React from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics';
import axios from 'axios';

export default class LyricsContainer extends React.Component {

  constructor() {
    super();
    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());

    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  setArtist(name) {
    this.setState({artistQuery: name});
  }

  setSong(name) {
    this.setState({songQuery: name});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.artistQuery && this.state.songQuery) {
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
    }
    //DO THIS NEXT TIME (this was before thunk middleware)
    // axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
    //     .then(response => {
    //       const setLyricsAction = setLyrics(response.data.lyric);
    //       store.dispatch(setLyricsAction);
    //     });

  }

  render() {
    return (
      <Lyrics
        text={this.state.lyrics.lyric}
        setArtist={this.setArtist}
        setSong={this.setSong}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this.handleSubmit}
      />
    );
  }

}
