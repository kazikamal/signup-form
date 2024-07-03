import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`;

const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  label {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-right: 10px;
  }
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

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    birthdate: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('gender', formData.gender);
    form.append('birthdate', formData.birthdate);
    form.append('profilePicture', formData.profilePicture);

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
        <Title>Create an Account</Title>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
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
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <GenderContainer>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={handleChange}
            />
            Other
          </label>
        </GenderContainer>
        <Input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="profilePicture"
          onChange={handleChange}
          accept="image/*"
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </FormContainer>
  );
};

export default SignupForm;
