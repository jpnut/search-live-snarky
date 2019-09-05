import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled, { css } from 'styled-components';
import shows from './data/tagged-shows.json';
import { Search } from './Search';
import { Artists, Show, Tracks } from './Show';
import { centered } from './styles';
import { Tag } from "./Tag";

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];

export type Show = ArrayElement<typeof shows>;

export type Artist = keyof Show["tags"]["artists"];

export type Track = keyof Show["tags"]["tracks"];

export type Tag = {
  type: "artist";
  value: Artist;
} | {
  type: "track";
  value: Track;
} | {
  type: "Main";
  value: string;
};

export type ContentToggle = "artists" | "tracks";

export type LinkToggle = "flac" | "mp3";

export type DirectionToggle = "asc" | "desc";

const showContainsTags = (show: Show, tags: Tag[]) => {
  for (const tag of tags) {
    switch (tag.type) {
      case "artist":
        if (show.tags.artists[tag.value]) {
          break;
        }

        return false;

      case "track":
        if (show.tags.tracks[tag.value]) {
          break;
        }

        return false;
    
      default:
        return false;
    }
  }

  return true;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  padding-bottom: 1rem;
  left: 0;
  right: 0;
  z-index: 3;
  ${centered};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem 0;
  flex-wrap: wrap;
  background-color: whitesmoke;
  box-shadow: 0 12px 12px 12px whitesmoke;
  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const HeaderGap = styled.div`
  flex: 1;
`;

const Content = styled.div`
  margin-top: 10rem;
  @media (min-width: 500px) {
    margin-top: 6rem;
  }
`;

const OptionsWrapper = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  @media (min-width: 500px) {
    margin-top: 0;
    justify-content: flex-end;
  }
`;

const Toggle = css`
  background-color: #fff;
  border: 2px solid #eee;
  color: #3c3c3c;
  padding: 0.5rem;
  font-size: 1.1rem;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 2px -2px rgba(34,204,204,0.1);
  transition: border-color 250ms, color 250ms;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  &:hover {
    border-color: #22cccc;
    color: #22cccc;
  }
`;

const LinkToggle = styled.button`
  ${Toggle};
  border-radius: 0.25rem;
  height: 2.5rem;
`;

const ContentToggle = styled.button`
  ${Toggle};
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
`;

const DirectionToggle = styled.button`
  ${Toggle};
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
`;

const Tags = styled.div`
  padding: 0.5rem;
  display: flex;
  background: rgba(0,0,0,0);
  margin: 0 0.5rem 1rem;
  font-size: 1.15rem;
  border-radius: 0.25rem;
  background: rgba(0,0,0,0.05);
`;

const ResultsData = styled.div`
  padding: 0.5rem;
  display: flex;
  background: rgba(0,0,0,0);
  margin: 0 0.5rem 1rem;
  font-size: 0.95rem;
`;

const ResultCount = styled.p`
  margin-left: auto;
`;

const Shows = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  transition: grid-template-columns 250ms;

  @media (min-width: 619px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 879px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &[data-state="tracks"] {
    ${Tracks} {
      opacity: 1;
      transform: translateX(0);
    }
    ${Artists} {
      opacity: 0;
      transform: translateX(0);
    }
  }

  &[data-state="artists"] {
    ${Tracks} {
      opacity: 0;
      transform: translateX(-100%);
    }
    ${Artists} {
      opacity: 1;
      transform: translateX(-100%);
    }
  }
`;

const onlyUniqueTags = (tags: Tag[]) => {
  const seen = new Set();

  return tags.filter(tag => {
    const duplicate = seen.has(tag.value);
    seen.add(tag.value);
    return !duplicate;
  });
};

const showsPluralise = (showsLength: number) => showsLength === 1 ? 'show' : 'shows';

const orderShows = (filteredShows: Show[], direction: DirectionToggle) => {
  return direction === "asc"
    ? filteredShows.reverse()
    : filteredShows;
}

export const Main: React.SFC = () => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [contentToggle, setContentToggle] = React.useState<ContentToggle>("tracks");
  const [linkToggle, setLinkToggle] = React.useState<LinkToggle>("flac");
  const [directionToggle, setDirectionToggle] = React.useState<DirectionToggle>("desc");

  const addTag = (tag: Tag) => setTags(allTags => onlyUniqueTags(allTags.concat(tag)));
  const onContentToggleClick = () => setContentToggle(currentToggle => currentToggle === "artists" ? "tracks" : "artists");
  const onLinkToggleClick = () => setLinkToggle(currentToggle => currentToggle === "mp3" ? "flac" : "mp3");
  const onDirectionToggleClick = () => setDirectionToggle(currentToggle => currentToggle === "asc" ? "desc" : "asc");
  const removeTag = (tag: Tag) => setTags(allTags => allTags.filter(t => t.value !== tag.value));

  const results = orderShows(
    shows
      .filter(show => tags.length === 0 || showContainsTags(show, tags)),
    directionToggle
  );

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header>
          <Search tags={tags} addTag={addTag} />
          <HeaderGap />
          <OptionsWrapper>
            <LinkToggle onClick={onLinkToggleClick} title={`Link to ${linkToggle === "flac" ? "FLAC" : "MP3"}`}>
              {linkToggle === "flac" ? "FLAC" : "MP3"}
            </LinkToggle>
            <ContentToggle onClick={onContentToggleClick} title={`Show ${contentToggle === "tracks" ? "Tracks" : "Artists"}`}>
              <FontAwesomeIcon icon={contentToggle === "tracks" ? "music" : "users"} />
            </ContentToggle>
            <DirectionToggle onClick={onDirectionToggleClick} title={directionToggle === "desc" ? "Reverse Chronological Order" : "Chronological Order"}>
              <FontAwesomeIcon icon={directionToggle === "desc" ? "sort-numeric-down-alt" : "sort-numeric-down"} />
            </DirectionToggle>
          </OptionsWrapper>
        </Header>
      </HeaderWrapper>
      <Content>
        <Tags>
          {tags.length === 0
            ? <p>Select a track or artist to filter results</p>
            : null
          }
          {tags.map(tag => (
            <Tag key={tag.value} tag={tag} removeTag={removeTag} />
          ))}
        </Tags>
        <ResultsData>
          <ResultCount>
            {
              results.length !== shows.length
                ? `${results.length} ${showsPluralise(results.length)}, filtered from a total of ${shows.length}`
                : `${results.length} ${showsPluralise(results.length)} total`
            }
          </ResultCount>
        </ResultsData>
        <Shows data-state={contentToggle}>
          {results
            .map(show => (
              <Show key={show.flac} show={show} addTag={addTag} linkToggle={linkToggle} />
            ))
          }
        </Shows>
      </Content>
    </Wrapper>
  );
};