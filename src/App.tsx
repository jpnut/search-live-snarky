import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import { Main } from './Main';
import { centered } from './styles';

const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
    min-height: 100vh;
    min-width: 350px;
    background: whitesmoke;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  div {
    box-sizing: border-box;
  }
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  ${centered};
  flex: 1;
  margin-bottom: 2rem;
`;

const FooterWrapper = styled.div`
  background: rgba(20,20,20,0.05);
`;

const Footer = styled.div`
  ${centered};
  padding: 4rem 0.5rem;
`;

const FooterText = styled.p`
  text-align: right;
`;

const FooterLink = styled.a`
  color: #19abab;
  text-decoration: none;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <Container>
        <Main />
      </Container>
      <FooterWrapper>
        <Footer>
          <FooterText>
            <FooterLink href="/">
              View on GitHub
              &nbsp;
              <FontAwesomeIcon icon={["fab", "github"]} />
            </FooterLink>
          </FooterText>
        </Footer>
      </FooterWrapper>
    </Wrapper>
  );
}

export default App;
