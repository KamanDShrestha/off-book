import React from 'react';
import { styled, css } from 'styled-components';
import { HiInstagram } from 'react-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input';
import Button from './Button';

const Footer = () => {
  return (
    <StyledFooter>
      <FooterColumn type='first'>
        <Heading>Company</Heading>
        <p>About Us</p>
        <p>Contact Us</p>
        <p>Vacancy</p>
        <p>Company</p>
      </FooterColumn>
      <FooterColumn type='second'>
        <Heading>Follow Us</Heading>
        <p> Instagram</p>
        <p>Twitter</p>
        <p>Threads</p>
      </FooterColumn>
      <FooterColumn type='third'>
        <Heading>Contact Us</Heading>
        <Input placeHolder={'Enter your email here'} />
        <Button>Send Email</Button>
      </FooterColumn>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 100px;
  background-color: #f9f5f6;
  padding: 30px;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: center;

  ${(props) =>
    props.type === 'first' &&
    css`
      grid-item: 1/2;
    `}
  ${(props) =>
    props.type === 'second' &&
    css`
      grid-item: 2/3;
    `}
  ${(props) =>
    props.type === 'third' &&
    css`
      grid-item: 3/4;
    `}
`;

const Heading = styled.h3`
  font-size: 20px;
  text-decoration: underline;
  font-weight: 600;
`;

export default Footer;
