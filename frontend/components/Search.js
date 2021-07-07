import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { useRouter } from "next/dist/client/router";
import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";

import { DropDown, DropDownItem, SearchContainer } from "./styles/SearchStyles";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  resetIdCounter(); //ssr issues fix

  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    { fetchPolicy: "no-cache" }
  );

  const items = data?.searchTerms || [];
  const easyFindItems = debounce(findItems, 400);

  const {
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    inputValue,
    isOpen,
  } = useCombobox({
    items: items,
    onInputValueChange() {
      easyFindItems({
        variables: { searchTerm: inputValue },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`
      })
    },
    itemToString: item => item.name || '',
  });

  return (
    <SearchContainer>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an item",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>No items found for: {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchContainer>
  );
}
