import Downshift from "downshift";
import * as React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import shows from './data/tagged-shows.json';
import { State } from "./store/reducers";
import { add } from "./store/tags/actions";
import { Artist, Tag, Track } from './types';

declare var window: any;

interface Props {
  tags: Tag[];
  addTag: (tag: Tag) => void;
}

const Wrapper = styled.div`
  flex: 7;
  display: flex;
  position: relative;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
  border: 2px solid #eee;
  box-shadow: 0 4px 2px -2px rgba(34,204,204,0.1);
  transition: border-color 250ms, box-shadow 250ms;
  &:focus {
    outline: none;
    border-color: #22cccc;
    box-shadow: 0 4px 2px -2px rgba(34,204,204,0.1), 0 0 12px 0 rgba(34,204,204,0.15);
  }
`;

const Dropdown = styled.ul`
  color: #3a3a3a;
  position: absolute;
  top: 2.5rem;
  left: 0rem;
  right: 0rem;
  background-color: #fff;
  z-index: 2;
  padding: 0.5rem;
  border: 2px solid #22cccc;
  border-top-width: 0px;
  max-height: 15rem;
  overflow-y: auto;
  box-shadow: 0 4px 2px -4px rgba(34,204,204,0.1), 0 12px 12px 0 rgba(34,204,204,0.15);
  opacity: 0;
  transition: opacity 250ms;

  &[data-open="true"] {
    opacity: 1;
  }
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  font-size: 1.15rem;
  border-radius: 0.25rem;
`;

const allTracks: Tag[] = [...new Set(shows.map(s => Object.keys(s.tags.tracks) as Track[]).flat())].sort().map(value => ({ value, type: "track" }));

window.tracks = allTracks.map(tag => tag.value);

window.performances = shows.reduce((prev, curr) => {
  const tracks: { [x: string]: number } = { ...prev };

  Object.keys(curr.tags.tracks).forEach((track) => {
    if (tracks[track] !== undefined) {
      tracks[track]++;

      return;
    }

    tracks[track] = 1;
  });

  return tracks;
}, {});

const allArtists: Tag[] = [...new Set(shows.map(s => Object.keys(s.tags.artists) as Artist[]).flat())].sort().map(value => ({ value, type: "artist" }));

window.artists = allArtists.map(tag => tag.value);

window.appearances = shows.reduce((prev, curr) => {
  const artists: { [x: string]: number } = { ...prev };

  Object.keys(curr.tags.artists).forEach((artist) => {
    if (artists[artist] !== undefined) {
      artists[artist]++;

      return;
    }

    artists[artist] = 1;
  });

  return artists;
}, {});

const searchItems: Tag[] = allTracks.concat(allArtists);

const reset = () => null;

const itemToString = (item: Tag) => (item ? item.value : "");

const Search: React.SFC<Props> = ({ tags, addTag }) => {
  const [search, setSearch] = React.useState("");
  const onSearchChange = (inputValue: string) => setSearch(inputValue);
  const values = new Set(tags.map(tag => tag.value));
  const onChange = (tag: Tag) => {
    addTag(tag);
    setSearch("");
  };

  return (
    <Downshift
      onChange={onChange}
      itemToString={itemToString}
      selectedItem={null}
      inputValue={search}
      onInputValueChange={onSearchChange}
      onOuterClick={reset}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        openMenu,
        closeMenu,
      }) => {
        const items = inputValue
          ? searchItems
            .filter(item => item.value.toLowerCase().includes(inputValue.toLowerCase()) && !values.has(item.value))
          : [];

        return (
          <Wrapper {...getRootProps()}>
            <Input {...getInputProps({ onFocus: openMenu, onBlur: closeMenu, placeholder: "Search for a song or artist e.g. \"Shofukan\"" } as any)} />
            <Dropdown {...getMenuProps()} data-open={isOpen && items.length > 0}>
              {isOpen && inputValue && items.length > 0
                ? items.map((item, index) => (
                  <DropdownItem
                    key={item.value}
                    {...getItemProps({
                      index: index + 1,
                      item,
                      key: item.value,
                      style: {
                        backgroundColor:
                          highlightedIndex === index + 1 ? "rgba(50,171,190,0.25)" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal"
                      }
                    })}
                  >
                    {item.value}
                  </DropdownItem>
                ))
                : null}
            </Dropdown>
          </Wrapper>
        );
      }}
    </Downshift>
  );
};

const mapStateToProps = ({ tags: { tags } }: State) => ({
  tags,
});

const mapDispatchToProps = {
  addTag: add
};

const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search);

export {
  ConnectedSearch as Search,
};