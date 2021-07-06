import Link from "next/link";

import { useCart } from "../lib/cartState";
import { useUser } from "./User";
import SignOut from "./SignOut";
import StyledNav from "./styles/StyledNav";

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <StyledNav>
      <Link href="./products">Products</Link>
      {user && (
        <>
          <Link href="./sell">Sell</Link>
          <Link href="./orders">Orders</Link>
          <Link href="./account">Account</Link>
          <button type="button" onClick={openCart}>My Cart</button>
          <SignOut />
        </>
      )}

      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </StyledNav>
  );
}
