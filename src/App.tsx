import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { Main } from './Main';
import { State } from './store/reducers';
import { centered, GlobalStyle, themes } from './styles';
import { Theme } from './types';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.main.background};
  color: ${props => props.theme.main.text};
  transition: background-color 250ms, color 250ms;
`;

const Container = styled.div`
  ${centered};
  flex: 1;
  margin-bottom: 2rem;
`;

const FooterWrapper = styled.div`
  background: ${props => props.theme.footer.background};
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

interface Props {
  theme: Theme;
}

const App: React.FC<Props> = ({ theme }) => (
  <ThemeProvider theme={themes[theme]}>
    <Wrapper>
      <Reset />
      <GlobalStyle />
      <Container>
        <Main />
      </Container>
      <FooterWrapper>
        <Footer>
          <FooterText>
            <FooterLink href="https://github.com/jpnut/search-live-snarky">
              View on GitHub
              &nbsp;
              <FontAwesomeIcon icon={["fab", "github"]} />
            </FooterLink>
          </FooterText>
        </Footer>
      </FooterWrapper>
    </Wrapper>
  </ThemeProvider>
);

const mapStateToProps = ({ theme: { theme } }: State) => ({
  theme,
});

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
