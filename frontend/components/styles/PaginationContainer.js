import styled from 'styled-components';

const PaginationContainer = styled.div`
  text-align: center;
  display: flex;
  width: fit-content;
  margin: 2rem auto;
  border: 1px solid var(--lightGray);
  box-shadow: 0 0px 2px var(--gray);
  border-radius: 10px;
  & > * {
    user-select: none;
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGray);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }

  @media(max-width: 600px) {
    font-size: 1.5rem;
    &>*{
      padding: 10px 15px;
    }
  }
`;

export default PaginationContainer;
