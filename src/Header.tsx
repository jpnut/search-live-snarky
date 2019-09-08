import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Search } from './Search';
import { toggle as toggleContentType } from './store/content-type/actions';
import { toggle as toggleDirection } from './store/direction/actions';
import { toggle as toggleFileType } from './store/file-type/actions';
import { State } from './store/reducers';
import { toggle as toggleTheme } from './store/theme/actions';
import { centered } from './styles';
import { ContentType, Direction, FileType, Theme } from './types';

const Wrapper = styled.div`
  position: fixed;
  padding-bottom: 1rem;
  left: 0;
  right: 0;
  z-index: 3;
  ${centered};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem 0;
  flex-wrap: wrap;
  background-color: ${props => props.theme.header.background};
  box-shadow: ${props => props.theme.header.shadow};
  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const HeaderGap = styled.div`
  flex: 1;
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

const ThemeToggle = styled.button`
  ${Toggle};
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
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

interface Props {
  contentType: ContentType;
  direction: Direction;
  fileType: FileType;
  theme: Theme;
  toggleContentType: typeof toggleContentType;
  toggleDirection: typeof toggleDirection;
  toggleFileType: typeof toggleFileType;
  toggleTheme: typeof toggleTheme;
}

const Header: React.SFC<Props> = ({
  contentType,
  direction,
  fileType,
  theme,
  toggleContentType: updateContentType,
  toggleDirection: updateDirection,
  toggleFileType: updateFileType,
  toggleTheme: updateTheme,
}) => (
  <Wrapper>
    <Inner>
      <Search />
      <HeaderGap />
      <OptionsWrapper>
        <ThemeToggle onClick={updateTheme} title={`${theme === "dark" ? "Dark Mode" : "Light Mode"}`}>
          <FontAwesomeIcon icon={theme === "dark" ? "moon" : "sun"} />
        </ThemeToggle>
        <LinkToggle onClick={updateFileType} title={`Link to ${fileType === "flac" ? "FLAC" : "MP3"}`}>
          {fileType === "flac" ? "FLAC" : "MP3"}
        </LinkToggle>
        <ContentToggle onClick={updateContentType} title={`Show ${contentType === "tracks" ? "Tracks" : "Artists"}`}>
          <FontAwesomeIcon icon={contentType === "tracks" ? "music" : "users"} />
        </ContentToggle>
        <DirectionToggle onClick={updateDirection} title={direction === "desc" ? "Reverse Chronological Order" : "Chronological Order"}>
          <FontAwesomeIcon icon={direction === "desc" ? "sort-numeric-down-alt" : "sort-numeric-down"} />
        </DirectionToggle>
      </OptionsWrapper>
    </Inner>
  </Wrapper>
);

const mapStateToProps = ({ content_type: { contentType }, direction: { direction }, file_type: { fileType }, theme: { theme } }: State) => ({
  contentType,
  direction,
  fileType,
  theme,
});

const mapDispatchToProps = {
  toggleContentType,
  toggleDirection,
  toggleFileType,
  toggleTheme,
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export {
  ConnectedHeader as Header,
};