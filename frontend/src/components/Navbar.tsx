import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box } from "rebass";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMusicsRequest } from "../features/music/musicSlice";
import { RootState } from "../store"; // Import RootState for typing
import { logout } from "../features/user/userSlice"; // Import logout action

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
  position: relative;
`;

const ProfileDropdown = styled(Box)`
width: 150px;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }: any) => theme.colors.white};
  border-radius: ${({ theme }: any) => theme.radii.small};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 100;
`;

const DropdownItem = styled(Box)`
  padding: 0.5em 1em;
  font-size: 1em;
  color: ${({ theme }: any) => theme.colors.text};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }: any) => theme.colors.lightGray};
  }
`;

// Navbar Component
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { token } = useSelector((state: RootState) => state.user);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchMusicsRequest({ search: searchQuery }));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, dispatch]);

  return (
    <NavbarContainer>
      {/* Logo */}
      <Logo onClick={() => navigate("/")}>AB Musics</Logo>

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
            if (location.pathname !== "/") {
              navigate("/");
            }
            setSearchQuery(e.target.value);
          }}
        />
      </SearchBar>

      {/* User Controls */}
      <UserControls>
        {token ? (
          <>
            <FaUserCircle size="1.5em" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <ProfileDropdown>
                <DropdownItem onClick={() => navigate("/profile")}>
                  My Profile
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </ProfileDropdown>
            )}
          </>
        ) : (
          <>
            <NavLink>
              <Link to={"/login"}>Login</Link>
            </NavLink>
            <NavLink>
              <Link to={"/register"}>Register</Link>
            </NavLink>
          </>
        )}
      </UserControls>
    </NavbarContainer>
  );
};

export default Navbar;
