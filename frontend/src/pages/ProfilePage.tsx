/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import {
  fetchProfileRequest,
  updateProfileRequest,
  deleteProfileRequest,
} from "../features/user/userSlice";
import { Box } from "rebass";
import confirmDelete from "../components/Alerts/ConfirmDelete";

const ProfileWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  background-color: ${({ theme }: any) => theme.colors.background};
  border-radius: ${({ theme }: any) => theme.radii.large};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 2em auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: ${({ theme }: any) => theme.radii.small};
  border: 1px solid ${({ theme }: any) => theme.colors.border};
  outline: none;
  font-size: ${({ theme }: any) => theme.fontSizes[2]}px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1em;
  margin-top: 1em;
  background-color: ${({ theme }: any) => theme.colors.primary};
  color: ${({ theme }: any) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }: any) => theme.radii.small};
  cursor: pointer;
  font-size: ${({ theme }: any) => theme.fontSizes[2]}px;

  &:hover {
    background-color: ${({ theme }: any) => theme.colors.secondary};
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${({ theme }: any) => theme.colors.error};

  &:hover {
    background-color: ${({ theme }: any) => theme.colors.darkError};
  }
`;

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, email, username, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [formData, setFormData] = useState({
    username: username || "",
    email: email || "",
    password: "",
  });

  useEffect(() => {
    if (!id) {
      dispatch(fetchProfileRequest());
    }
  }, [dispatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfileRequest(formData));
  };

  const handleDelete = async () => {
    const isConfirmed = await confirmDelete();
    if (isConfirmed) {
      dispatch(deleteProfileRequest());
      navigate("/login");
    }
  };

  return (
    <ProfileWrapper>
      <h2>Your Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="New Password (Optional)"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
      <DeleteButton onClick={handleDelete}>Delete My Account</DeleteButton>
    </ProfileWrapper>
  );
};

export default ProfilePage;
