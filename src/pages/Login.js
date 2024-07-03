import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from './Navbar';
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
`;
const P = styled.p`
  margin-top: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #165ac0;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { email, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [email]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('email', formData.email);
    form.append('password', formData.password);

    try {
      const response = await axios.post('/api/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
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
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign Up</Button>
        <P color="green">Don't have account? <Navbar/></P>
      </Form>
    </FormContainer>
  );
};

export default Login;
