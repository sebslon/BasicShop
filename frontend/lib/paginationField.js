import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    keyArgs: false, //Taking responsibility over apollo

    read(existingCacheItems = [], { args, cache }) {
      //refetch the products
      const { skip, first } = args;

      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      //check if existing items
      const items = existingCacheItems
        .slice(skip, skip + first)
        .filter((x) => x);

      // there are items, but not enough, on last page.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        //no items, refetch items
        return false;
      }

      if (items.length) {
        // console.log("Items in cache, return them to apollo.");
        return items;
      }

      return false;
    },

    merge(existingCache, incoming, { args }) {
      const { skip, first } = args;
      const merged = existingCache ? existingCache.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      //returning merged items from the cache
      return merged;
    },
  };
}
