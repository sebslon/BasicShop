import Link from "next/link";

import Logo from './styles/Logo';
import StyledHeader from './styles/StyledHeader';

import Cart from './Cart';
import Nav from "./Nav";
import Search from "./Search";



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
        <Search />
      </div>

      <Cart />
    </StyledHeader>
  );
}
