import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box } from "rebass";
import {
  FaSearch,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

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
  /* Add isOpen prop */
  display: flex;
  align-items: center;
  gap: 2em;

  @media (max-width: 768px) {
    display: ${({ isOpen }) =>
      isOpen ? "flex" : "none"}; /* Toggle display based on isOpen state */
    flex-direction: column; /* Stack links vertically */
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
  display: none; /* Hide on larger screens */
  cursor: pointer;

  @media (max-width: 768px) {
    display: block; /* Show on smaller screens */
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
    display: none; /* Hide search bar on smaller screens */
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

const ThemeToggle = styled(Box)`
  cursor: pointer;
  font-size: 1.2em;
  color: ${({ theme }: any) => theme.colors.text};
`;

// Navbar Component
const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false); // State for mobile nav

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    // Optional: Logic to toggle the actual theme
  };

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <NavbarContainer>
      {/* Logo */}
      <Logo>MusicPlayer</Logo>

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
          <Link to={"/playlists"}>My playlists</Link>
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>

      {/* User Controls */}
      <UserControls>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
        <FaUserCircle size="1.5em" />
      </UserControls>
    </NavbarContainer>
  );
};

export default Navbar;
