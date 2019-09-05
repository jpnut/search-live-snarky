import * as React from 'react';
import styled from 'styled-components';
import { Tag as TagType } from './Main';

interface Props {
  tag: TagType;
  removeTag: (tag: TagType) => void;
}

const Wrapper = styled.div`
  display: flex;
  box-shadow: 0 4px 2px -2px rgba(20,20,20,0.05);
  border-radius: 0.25rem;
  background-color: #c5e3e8;
  transform: translateY(0);
  transition: background-color 250ms, transform 250ms;
  &:not(:first-child) {
    margin-left: 0.5rem;
  }
  &:hover {
    background-color: #cdedf3;
    transform: translateY(-1px);
  }
`;

const Tag = styled.div`
  background: #e1e1e1;
  padding: 0.5rem;
  z-index: 1;
  color: #10464c;
  cursor: pointer;
  background-color: transparent;
`;

const RemoveTag = styled.button`
  padding: 0.5rem;
  border: none;
  outline: none;
  color: #10464c;
  cursor: pointer;
  background-color: transparent;
`;

const TagComponent: React.SFC<Props> = ({ tag, removeTag }) => {
  const onTagClick = () => removeTag(tag);
  
  return (
    <Wrapper key={tag.value} onClick={onTagClick}>
      <Tag>
        {tag.value}
      </Tag>
      <RemoveTag>
        x
      </RemoveTag>
    </Wrapper>
  );
};

export {
  TagComponent as Tag,
};