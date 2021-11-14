import { gql, useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Head from 'next/head'

import StyledSingleProduct from "./styles/StyledSingleProduct";

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;



export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  console.log(data);
  const { Product } = data;

  return (
    <StyledSingleProduct data-testid="singleProduct">
      <Head>
        <title>Basic Shop | {Product.name}</title>
      </Head>
      <img src={Product.photo.image.publicUrlTransformed} alt={Product.photo.altText} />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </StyledSingleProduct>
  );
}
