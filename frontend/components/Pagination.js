import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";

import { perPage } from "../config";
import DisplayError from "./ErrorMessage";
import PaginationContainer from "./styles/PaginationContainer";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return "Loading...";
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationContainer>
      <Head>
        <title>
          BasicShop - Page {page} of {pageCount}
        </title>
      </Head>
      
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page === 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>Total items {count}</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>→ Next</a>
      </Link>
    </PaginationContainer>
  );
}
