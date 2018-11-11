import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#000000'
};
let fakeServerData = {
  user: {
    name: 'Nick', 
    playlists: [
      {
        name: 'My Favorites',
        songs: [
          {name: 'Synthwave', duration: 1345},
          {name: 'Chillwave', duration: 1688},
          {name: 'Zeldawave', duration: 7000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Synthwave', duration:1345},
          {name: 'Whatever', duration:1688},
          {name: 'Zeldawave', duration:7000}
        ]
      },
      {
        name: 'Random Stuff',
        songs: [
          {name: 'Synthwave', duration:1345},
          {name: 'Chillwave', duration:1688},
          {name: 'Changing', duration:7000}
        ]
      },
      {
        name: 'New Jams',
        songs: [
          {name: 'WTF', duration:1345},
          {name: 'Chillwave', duration:1688},
          {name: 'Zeldawave', duration:7000}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
     <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
       <h2>{this.props.playlists.length} playlists</h2>
     </div>
    );
  };
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
     <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
       <h2>{Math.round(totalDuration/60)} hours</h2>
     </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
           <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    
    let playlistElements = []
    if(this.state.serverData.user) {
      for (let i = 0; i < this.state.serverData.user.playlists.length; i++) {
        let playlist = this.state.serverData.user.playlists[i]
        playlistElements.push(<Playlist playlist={playlist} />) 
      }
    }


    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter/>
          {playlistElements}
        </div> : <h1>Loading bitch...</h1>
        }
      </div>
    );
  }
}

export default App;
