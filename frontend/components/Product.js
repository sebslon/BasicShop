import Link from "next/link";

import Item from "./styles/Item";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

import AddToCart from "./AddToCart";
import DeleteProduct from "./DeleteProduct";

export default function Product({ product }) {
  return (
    <Item>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "update",
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </Item>
  );
}
