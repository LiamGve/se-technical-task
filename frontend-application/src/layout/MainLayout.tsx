import * as React from "react";
import { Outlet } from "react-router-dom";
import { LoginButton } from "../components";
import { useUser } from "../context/UserContext";
import {
  ContentContainer,
  FlexWrapper,
  Header,
  Logo,
  StyledLink,
} from "./MainLayout.styles";

export const MainLayout: React.FC = (props) => {
  const { isLoggedIn } = useUser();

  return (
    <>
      <Header>
        <ContentContainer>
          <FlexWrapper>
            <Logo />
            <LoginButton />
          </FlexWrapper>
          <ul>
            <li>
              <StyledLink to="/">Home</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/London">London</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/Paris">Paris</StyledLink>
            </li>
            <li>
              <StyledLink to="/search/Berlin">Berlin</StyledLink>
            </li>
            {isLoggedIn && (
              <li>
                <StyledLink to="/favourites">Your Favourites</StyledLink>
              </li>
            )}
          </ul>
        </ContentContainer>
      </Header>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
};
