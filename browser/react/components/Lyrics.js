import React from 'react';

export default function Lyrics (props) {

  const artistChange = e => {
    props.setArtist(e.target.value);
  };

  const songChange = e => {
    props.setSong(e.target.value);
  };

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          value={props.artistQuery}
          onChange={artistChange}
          type="text"
          placeholder="artist"/>
        <input
          value={props.songQuery}
          onChange={songChange}
          type="text"
          placeholder="song"/>
        <pre>
          {props.text || 'Search above!'}
        </pre>
        <button
          onClick={props.handleSubmit}
          type="submit"
          className="btn btn-success">
            Find Lyrics
        </button>
      </form>
    </div>
  );
}
