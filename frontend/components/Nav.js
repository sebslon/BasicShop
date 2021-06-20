import Link from "next/link";
import StyledNav from "./styles/StyledNav";

export default function Nav() {
  return (
    <StyledNav>
      <Link href="./products">Products</Link>
      <Link href="./sell">Sell</Link>
      <Link href="./orders">Orders</Link>
      <Link href="./account">Account</Link>
    </StyledNav>
  );
}
