/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { RootState } from "../store";
import { registerRequest } from "../features/user/userSlice";
import { MusicPlayerContainer } from "../components/Container";

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }: any) => theme.colors.background};
`;

const Form = styled.form`
  background-color: ${({ theme }: any) => theme.colors.white};
  padding: ${({ theme }: any) => theme.space[4]}px;
  border-radius: ${({ theme }: any) => theme.radii.large};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input<{ hasError: boolean }>`
  width: 95%;
  padding: ${({ theme }: any) => theme.space[3]}px;
  margin-bottom: ${({ theme }: any) => theme.space[3]}px;
  border-radius: ${({ theme }: any) => theme.radii.small};
  border: 1px solid
    ${({ theme, hasError }: any) =>
      hasError ? theme.colors.error : theme.colors.border};
  outline: none;
  font-size: ${({ theme }: any) => theme.fontSizes[2]}px;

  &:focus {
    border-color: ${({ theme }: any) => theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }: any) => theme.space[3]}px;
  border: none;
  border-radius: ${({ theme }: any) => theme.radii.small};
  background-color: ${({ theme }: any) => theme.colors.primary};
  color: ${({ theme }: any) => theme.colors.white};
  font-size: ${({ theme }: any) => theme.fontSizes[3]}px;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }: any) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }: any) => theme.colors.error};
  margin-bottom: ${({ theme }: any) => theme.space[3]}px;
`;

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, email } = useSelector(
    (state: RootState) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", username: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        registerRequest({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        })
      );
    }
  };

  return (
    <MusicPlayerContainer>
      <RegisterWrapper>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            hasError={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            hasError={!!errors.username}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            hasError={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>
      </RegisterWrapper>
    </MusicPlayerContainer>
  );
};

export default RegisterPage;
