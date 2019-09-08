import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { remove } from './store/tags/actions';
import { Tag as TagType } from './types';

interface Props {
  tag: TagType;
  removeTag: (tag: TagType) => void;
}

const Wrapper = styled.div`
  display: flex;
  box-shadow: 0 4px 2px -2px rgba(20,20,20,0.05);
  border-radius: 0.25rem;
  background-color: rgba(25, 157, 173, 0.25);
  transform: translateY(0);
  transition: background-color 250ms, transform 250ms;
  margin: 0.5rem 0 0 0.5rem;
  &:hover {
    background-color: rgba(25, 157, 173, 0.5);
    transform: translateY(-1px);
  }
`;

const TagText = styled.div`
  color: rgb(22, 70, 70);
  padding: 0.5rem;
  z-index: 1;
  cursor: pointer;
  background-color: transparent;
  font-weight: bold;
`;

const RemoveTag = styled.button`
  color: rgb(22, 70, 70);
  padding: 0.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

const Tag: React.SFC<Props> = ({ tag, removeTag }) => {
  const onTagClick = () => removeTag(tag);
  
  return (
    <Wrapper key={tag.value} onClick={onTagClick}>
      <TagText>
        {tag.value}
      </TagText>
      <RemoveTag>
        <FontAwesomeIcon icon="times" />
      </RemoveTag>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  removeTag: remove,
};

const ConnectedTag = connect(null, mapDispatchToProps)(Tag);

export {
  ConnectedTag as Tag,
};