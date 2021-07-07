import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid var(--lightGray);
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--lightGray);
  padding: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  ${(props) => (props.highlighted ? "padding-left: 2rem;" : null)};
  background: ${(props) => (props.highlighted ? "#f7f7f7" : "white")};
  border-left: 10px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : "white")};

  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px var(--primary);
  }

  to {
    box-shadow: 0 0 10px 1px var(--primary);
  }
`;

const SearchContainer = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchContainer };
