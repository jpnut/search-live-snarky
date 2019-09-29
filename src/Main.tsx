import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import shows from './data/tagged-shows.json';
import { Header } from './Header';
import { Artists, Show as ShowComponent, Tracks } from './Show';
import { State } from './store/reducers';
import { Tag as TagComponent } from "./Tag";
import { ContentType, Direction, FileType, Show, Tag } from './types';

declare var window: any;

window.shows = shows;

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

const Content = styled.div`
  margin-top: 10rem;
  @media (min-width: 500px) {
    margin-top: 6rem;
  }
`;

const Tags = styled.div`
  padding: 0 0.5rem 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0.5rem 1rem;
  font-size: 1.15rem;
  border-radius: 0.25rem;
  background: ${props => props.theme.main.container};
`;

const TagsDescription = styled.p`
  margin: 0.5rem 0 0 0.5rem;
  padding: 0.5rem;
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


const showsPluralise = (showsLength: number) => showsLength === 1 ? 'show' : 'shows';

const orderShows = (filteredShows: Show[], direction: Direction) => {
  return direction === "asc"
    ? filteredShows.reverse()
    : filteredShows;
}

interface Props {
  contentType: ContentType;
  direction: Direction;
  fileType: FileType;
  tags: Tag[];
}

const Main: React.SFC<Props> = ({ contentType, direction, fileType, tags }) => {
  const results = orderShows(
    shows
      .filter(show => tags.length === 0 || showContainsTags(show, tags)),
    direction
  );

  return (
    <Wrapper>
      <Header />
      <Content>
        <Tags>
          {tags.length === 0
            ? <TagsDescription>Select a track or artist to filter results</TagsDescription>
            : null
          }
          {tags.map(tag => (
            <TagComponent key={tag.value} tag={tag} />
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
        <Shows data-state={contentType}>
          {results
            .map(show => (
              <ShowComponent
                key={show.flac}
                show={show}
                fileType={fileType}
              />
            ))
          }
        </Shows>
      </Content>
    </Wrapper>
  );
};

const mapStateToProps = ({ content_type: { contentType }, direction: { direction }, file_type: { fileType }, tags: { tags } }: State) => ({
  contentType,
  direction,
  fileType,
  tags,
});

const ConnectedMain = connect(mapStateToProps)(Main);

export {
  ConnectedMain as Main,
};