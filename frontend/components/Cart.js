import styled from "styled-components";

import { useUser } from "./User";

import formatMoney from "../lib/formatMoney";
import calcTotalCartPrice from "../lib/calcTotalCartPrice";

import { CartContainer, CartHeader } from "./styles/Cart";

export default function Cart() {
  const me = useUser();

  if (!me) return null;

  return (
    <CartContainer open>
      <header>
        <CartHeader>{me.name}'s cart</CartHeader>
      </header>

      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>

      <footer>
        <p>{formatMoney(calcTotalCartPrice(me.cart))}</p>
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
