import * as React from 'react';
import styled from 'styled-components';
import { Artist as ArtistType } from './types';

interface Props {
  artist: string;
  instrument?: string;
  track?: string;
  addArtistTag: (artist: ArtistType) => void;
}

const Wrapper = styled.li`
  padding: 0.25rem 0;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

const Span = styled.a`
  cursor: pointer;
`;

export const Artist: React.SFC<Props> = ({ artist, instrument, track, addArtistTag }) => {
  const onClick = () => addArtistTag(artist as ArtistType);

  const text = track
    ? `${artist}${track}`
    : artist;

  return (
    <Wrapper>
      <Span title={`${artist}${instrument ? ` - ${instrument}` : ``}`} onClick={onClick}>
        {text}
      </Span>
    </Wrapper>
  );
};