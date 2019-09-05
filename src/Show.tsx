import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Artist as ArtistComponent } from './Artist';
import { Artist, LinkToggle, Show, Tag, Track } from './Main';
import { Track as TrackComponent } from './Track';

const ShowLink = styled.a`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  height: 4rem;
  width: 4rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b7b7b7;
  z-index: 2;
  transition: background-color 250ms, color 250ms;
`;

const Wrapper = styled.li`
  padding: 1.25rem;
  color: #1e1e1e;
  list-style: none;
  position: relative;
  transition: color 250ms;
  hr {
    transition: border-color 250ms;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: scale(0.95);
    background-color: #fff;
    box-shadow: 0 4px 2px -2px rgba(20,20,20,0.05);
    transition: background-color 250ms, transform 250ms, box-shadow 250ms;
    border-radius: 0.25rem;
    z-index: -1;
  }
  &:hover {
    color: #10464c;
    hr {
      border-color: #22cccc;
    }
    &:before {
      background-color: rgba(50,171,190,0.25);
      box-shadow: 0 4px 2px -2px rgba(20,20,20,0.05), 0 8px 4px -4px rgba(20,20,20,0.05);
      transform: scale(1);
    }
    ${ShowLink} {
      background-color: rgba(20,20,20,0.05);
      color: #708483;
    }
  }
`;

const ShowName = styled.p`
  margin: 0;
  padding: 0.5rem 0 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ShowSeparator = styled.hr`
  border-color: #efefef;
  border-style: solid;
`;

const List = css`
  flex: 1 0 100%;
  transform: translateX(0);
  transition: transform 450ms, opacity 300ms;
  width: 100%;
`;

export const Tracks = styled.ul`
  ${List}
  opacity: 1;
`;

export const Artists = styled.ul`
  ${List}
  opacity: 0;
`;

const ShowContent = styled.div`
  margin: 0.25rem;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
`;

interface Props {
  show: Show;
  addTag: (tag: Tag) => void;
  linkToggle: LinkToggle;
}

const ShowComponent: React.SFC<Props> = ({ show, addTag, linkToggle }) => {
  const addTrackTag = (value: Track) => addTag({
    type: "track",
    value
  });

  const addArtistTag = (value: Artist) => addTag({
    type: "artist",
    value
  });

  return (
    <Wrapper>
      <ShowName title={show.name}>{show.name}</ShowName>
      <ShowSeparator />
      <ShowContent>
        <Tracks>
          {show.setlist.map(track => (
            <TrackComponent key={track} track={track} addTrackTag={addTrackTag} />
          ))}
          {show.encore.length > 0 ? "-" : ""}
          {show.encore.filter(track => !!track).map(track => (
            <TrackComponent key={track} track={track} addTrackTag={addTrackTag} />
          ))}
        </Tracks>
        <Artists>
          {(Object.keys(show.artists) as Array<keyof Show["artists"]>).map((artist) => (
            <ArtistComponent key={artist} artist={artist} instrument={show.artists[artist]} addArtistTag={addArtistTag} />
          ))}
          {show.other_artists
            ? (
              Object.keys(show.other_artists)).map((track) => (
                (Object.keys(show.other_artists[track as keyof Show["other_artists"]]) as Array<keyof Show["artists"]>).map((artist) => (
                  <ArtistComponent key={`${track}-${artist}`} track={track} artist={artist} instrument={show.other_artists[track as keyof Show["other_artists"]][artist]} addArtistTag={addArtistTag} />
                ))
              )
            )
            : null}
        </Artists>
      </ShowContent>
      <ShowLink href={linkToggle === "flac" ? show.flac : show.mp3} target="_blank" rel="noopener">
        <FontAwesomeIcon icon="external-link-alt" fixedWidth={true} size="2x" />
      </ShowLink>
    </Wrapper>
  )
};

export {
  ShowComponent as Show,
};