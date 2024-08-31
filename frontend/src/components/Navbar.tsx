import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box } from "rebass";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMusicsRequest } from "../features/music/musicSlice"; // Import action for fetching musics

// Styled components for Navbar
const NavbarContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  background-color: ${({ theme }: any) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }: any) => theme.colors.lightGray};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled(Box)`
  font-size: 1.5em;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.primary};
  cursor: pointer;
`;

const NavLinks = styled(Box)<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2em;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 4em;
    right: 2em;
    background-color: ${({ theme }: any) => theme.colors.background};
    padding: 1em 2em;
    border-radius: ${({ theme }: any) => theme.radii.medium};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Box)`
  font-size: 1em;
  color: ${({ theme }: any) => theme.colors.text};
  cursor: pointer;
  &:hover {
    color: ${({ theme }: any) => theme.colors.primary};
  }
`;

const HamburgerMenu = styled(Box)`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchBar = styled(Box)`
  display: flex;
  align-items: center;
  background-color: ${({ theme }: any) => theme.colors.lightGray};
  border-radius: ${({ theme }: any) => theme.radii.medium};
  padding: 0.5em;
  margin-right: 1em;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled("input")`
  border: none;
  background: transparent;
  outline: none;
  padding: 0 0.5em;
  color: ${({ theme }: any) => theme.colors.text};
  width: 200px;
`;

const UserControls = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1.5em;
`;

// Navbar Component
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const dispatch = useDispatch(); // Use dispatch from redux

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  // Effect to trigger search when searchQuery changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchMusicsRequest({ search: searchQuery })); // Dispatch the action with search query
    }, 500); // 500ms debounce time

    return () => clearTimeout(delayDebounceFn); // Cleanup debounce timeout
  }, [searchQuery, dispatch]);

  return (
    <NavbarContainer>
      {/* Logo */}
      <Logo>AB Musics</Logo>

      {/* Hamburger Menu for Mobile */}
      <HamburgerMenu onClick={toggleNav}>
        {isNavOpen ? <FaTimes size="1.5em" /> : <FaBars size="1.5em" />}
      </HamburgerMenu>

      {/* Navigation Links */}
      <NavLinks isOpen={isNavOpen}>
        <NavLink>
          <Link to={"/"}>Home</Link>
        </NavLink>
        <NavLink>
          <Link to={"/my-playlists"}>My playlists</Link>
        </NavLink>
        <NavLink>
          <Link to={"/genres"}>Genre</Link>
        </NavLink>
      </NavLinks>

      {/* Search Bar */}
      <SearchBar>
        <FaSearch color="#888" />
        <SearchInput
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            if (location.pathname != "/") {
              navigate("/");
            }
            setSearchQuery(e.target.value);
          }}
        />
      </SearchBar>

      {/* User Controls */}
      <UserControls>
        <FaUserCircle size="1.5em" />
      </UserControls>
    </NavbarContainer>
  );
};

export default Navbar;
