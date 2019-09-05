const fs = require('fs');
const fileName = './data/shows.json';
const file = require(fileName);
const path = require('path');

const getTaggedTracks = (show) => (
  [...new Set([show.setlist || [], show.encore || []].flat().map(track => track.replace(/\*|\^|#/g, '')))]
    .sort()
    .reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
);

const getTaggedArtists = (show) => (
  [...new Set([Object.keys(show.artists || {}) || [], Object.values(show.other_artists || {}).map(artists => Object.keys(artists)).flat() || []].flat().map(artist => artist.replace(/\*|\^|#/g, '')))]
    .sort()
    .reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
);

const newFile = file.map(s => ({
  ...s,
  tags: {
    tracks: getTaggedTracks(s),
    artists: getTaggedArtists(s)
  },
}));

const newFileName = path.join(__dirname, "./data/tagged-shows.json");

fs.writeFileSync(newFileName, JSON.stringify(newFile));