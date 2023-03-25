import React, { useState } from 'react';
import styled from '@emotion/styled';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 10rem;
  max-width: 50%;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    font-family: "Calibri", sans-serif;
    font-size: 1.1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input {
    height: 2.5rem;
  }

  textarea {
    min-height: 6rem;
  }

  small {
    font-size: 1rem;
    color: #777;
    margin-top: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  font-family: "Calibri", sans-serif;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #310D98;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  max-width: 10rem;

  &:hover {
    background-color: #0062cc;
  }
`;
const CharacterCount = styled.div`
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: #777;
`;

function ContactForm() {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');


    const handleNameChange = (event) => {
    setName(event.target.value);
    };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(event.target.value)) {
    setEmailError('Please enter a valid email address.');
  } else {
    setEmailError('');
  }
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}\nSubject: ${subject}\nMessage: ${message}`);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      <FormGroup>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder='Your Name' value={name} onChange={handleNameChange} required />
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" placeholder='youremail@example.com' value={email} onChange={handleEmailChange} required />
        {emailError && <small>{emailError}</small>}
        <small>We'll never share your email with anyone else.</small>
      </FormGroup>
      <FormGroup>
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" placeholder='Subject' value={subject} onChange={handleSubjectChange} required />
      </FormGroup>
      <FormGroup>
        <label htmlFor="message">Your Message</label>
        <textarea id="message" placeholder='Give a brief description' rows={3} value={message} onChange={handleMessageChange} maxLength={2500} required />
        <CharacterCount>{message.length} / 2500 characters</CharacterCount>
      </FormGroup>
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormWrapper>
  );
}

export default ContactForm;
