import ProductFilter from '@/components/shopping-view/filter';
import ProductTile from '@/components/shopping-view/product-tile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sortOptions } from '@/config';

import { useEffect, useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '@/store/shop/product-slice';

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, []);

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleFilters = (getSectionID, getCurrentOption) => {
    console.log(getSectionID, getCurrentOption);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter handleFilters={handleFilters} filters={filters} />
      <div className="bg-background shadow-sm rounded-lg w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-extrabold text-lg">All Products</h2>
          <div className="flex gap-3 items-center">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  size="sm"
                  className="flex items-center gap-1"
                  variant="outline"
                >
                  <ArrowDownUp />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSortChange}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem
                      value={option.id}
                      className="cursor-pointer"
                      key={option.id}
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((item) => (
                <ProductTile key={item._id} product={item} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
