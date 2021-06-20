import Link from "next/link";

import Logo from './styles/Logo';
import StyledHeader from './styles/StyledHeader';
import Nav from "./Nav";



export default function Header() {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">Basic Shop</Link>
        </Logo>
        <Nav />
      </div>

      <div className="sub-bar">
        <p>Search</p>
      </div>

    </StyledHeader>
  );
}
