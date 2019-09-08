import * as React from 'react';
import styled from 'styled-components';
import { Track as TrackType } from './types';

interface Props {
  track: string;
  addTrackTag: (track: TrackType) => void;
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

export const Track: React.SFC<Props> = ({ track, addTrackTag }) => {
  const onClick = () => addTrackTag(track.replace(/\*|\^|#/g, '') as TrackType);

  return (
    <Wrapper>
      <Span title={track} onClick={onClick}>
        {track}
      </Span>
    </Wrapper>
  );
};