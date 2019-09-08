import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Artist as ArtistComponent } from './Artist';
import { add } from './store/tags/actions';
import { Track as TrackComponent } from './Track';
import { Artist, FileType, Show as ShowType, Tag, Track } from './types';

const A = styled.a`
  text-decoration: none;
  color: ${props => props.theme.show.title};
  text-shadow: 0 1px 1px rgba(20,20,20,0.2);
`;

const ShowSeparator = styled.hr`
  border-color: rgba(34, 204, 204, 0.2);
  border-style: solid;
`;

const ShowLink = styled.a`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  height: 4rem;
  width: 4rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b7b7b7;
  transition: background-color 250ms, color 250ms;
`;

const Wrapper = styled.li`
  padding: 1.25rem;
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
    background-color: rgba(25, 157, 173, 0.1);
    box-shadow: ${props => props.theme.show.shadow};
    transition: background-color 250ms, transform 250ms;
    border-radius: 0.25rem;
  }
  &:hover {
    &:before {
      background-color: rgba(25, 157, 173, 0.35);
      box-shadow: ${props => props.theme.show.hover.shadow};
      transform: scale(1);
    }
    ${A} {
      color: ${props => props.theme.show.hover.title};
    }
    ${ShowSeparator} {
      border-color: rgba(34, 204, 204, 1);
    }
    ${ShowLink} {
      background-color: rgba(20,20,20,0.05);
      color: ${props => props.theme.show.title};
      &:hover {
        color: ${props => props.theme.show.hover.title};
      }
    }
  }
`;

const ShowInner = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;
`;

const ShowName = styled.h3`
  margin: 0;
  padding: 0.5rem 0 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
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
  show: ShowType;
  addTag: (tag: Tag) => void;
  fileType: FileType;
}

const Show: React.SFC<Props> = ({ show, addTag, fileType }) => {
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
      <ShowInner>
        <A href={fileType === "flac" ? show.flac : show.mp3}>
          <ShowName title={show.name}>{show.name}</ShowName>
        </A>
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
            {(Object.keys(show.artists) as Array<keyof ShowType["artists"]>).map((artist) => (
              <ArtistComponent key={artist} artist={artist} instrument={show.artists[artist]} addArtistTag={addArtistTag} />
            ))}
            {show.other_artists
              ? (
                Object.keys(show.other_artists)).map((track) => (
                  (Object.keys(show.other_artists[track as keyof ShowType["other_artists"]]) as Array<keyof ShowType["artists"]>)
                    .map((artist) => (
                      <ArtistComponent
                        key={`${track}-${artist}`}
                        track={track}
                        artist={artist}
                        instrument={show.other_artists[track as keyof ShowType["other_artists"]][artist]}
                        addArtistTag={addArtistTag}
                      />
                    ))
                )
              )
              : null}
          </Artists>
        </ShowContent>
        <ShowLink href={fileType === "flac" ? show.flac : show.mp3} target="_blank" rel="noopener">
          <FontAwesomeIcon icon="external-link-alt" fixedWidth={true} size="2x" />
        </ShowLink>
      </ShowInner>
    </Wrapper>
  )
};

const mapDispatchToProps = {
  addTag: add,
};

const ConnectedShow = connect(null, mapDispatchToProps)(Show);

export {
  ConnectedShow as Show,
};