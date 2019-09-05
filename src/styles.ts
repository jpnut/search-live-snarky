import { css } from "styled-components";

export const centered = css`
  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;