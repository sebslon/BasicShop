import Link from "next/link";

import { useUser } from "./User";
import { useCart } from "../lib/cartState";
import StyledNav from "./styles/StyledNav";

import CartCount from "./CartCount";
import SignOut from "./SignOut";

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
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (total, cartItem) =>
                  total + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
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
