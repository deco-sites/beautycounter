import Sort from "$store/components/search/Sort.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { ProductListingPage } from "$live/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/std/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage>;
}

function SearchControls() {
  const url = location?.href ? new URL(location?.href) : undefined;
  const query = url ? url.searchParams.get("q") : undefined;

  return (
    <Container class="flex justify-between border-b-1 border-gray-50 flex-col lg:flex-row mb-4 pb-2 gap-2">
      <div class="flex flex-row items-center">
        You searched for "{query}"
      </div>

      <div class="flex flex-row items-center justify-between">
        <Sort />
      </div>
    </Container>
  );
}

export default SearchControls;
