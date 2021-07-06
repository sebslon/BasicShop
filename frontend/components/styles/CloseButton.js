import styled from 'styled-components';

const CloseButton = styled.button`
  background: rgba(0,0,0,0.5);
  color: white;
  border: 0;
  border-radius: 15%;
  font-size: 1.5rem;
  position: absolute;
  z-index: 2;
  right: 5px;
  cursor: pointer;

  &:hover {
    background: black;
    transition: background 0.25s ease;
  }
`;

export default CloseButton;