import styled from "styled-components";

import { useUser } from "./User";
import Checkout from "./Checkout";     
import RemoveFromCart from "./RemoveFromCart";

import { useCart } from "../lib/cartState";
import formatMoney from "../lib/formatMoney";
import calcTotalCartPrice from "../lib/calcTotalCartPrice";

import CloseButton from "./styles/CloseButton";
import { CartContainer, CartHeader } from "./styles/Cart";

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!me) return null;

  return (
    <CartContainer open={cartOpen}>
      <header>
        <CartHeader>{me.name}'s cart</CartHeader>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>

      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>

      <footer>
        <p>{formatMoney(calcTotalCartPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartContainer>
  );
}

function CartItem({ cartItem }) {
  const { product } = cartItem;

  if (!product) return null;

  return (
    <Item>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -
          <em>
            {" " + cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id}/>
    </Item>
  );
}

const Item = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--secondary);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 1rem;
  }

  h3,
  p {
    margin: 0;
  }
`;
