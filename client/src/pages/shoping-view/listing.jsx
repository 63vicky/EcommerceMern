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
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from '@/store/shop/product-slice';
import { useSearchParams } from 'react-router-dom';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import Loader from '@/components/Loader';

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { isLoading, isLoadingProductDetails, productList, productDetails } =
    useSelector((state) => state.shopProducts);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const createSearchParamHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(',');

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join('&');
  };

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        productId: getCurrentProductId,
        userId: user?.id,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: 'Product added to cart' });
      }
    });
  };

  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, filters, sort]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  function handleGetProductDetails(getCurProductID) {
    setOpenDetailsDialog(true);
    dispatch(fetchProductDetails(getCurProductID));
  }

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleFilters = (getSectionID, getCurrentOption) => {
    let cpyFilter = { ...filters };
    const indexOfCurrentSection = Object.keys(filters).indexOf(getSectionID);

    if (indexOfCurrentSection === -1) {
      cpyFilter = { ...cpyFilter, [getSectionID]: [getCurrentOption] };
    } else {
      const indexOfCurrentOption =
        cpyFilter[getSectionID].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        cpyFilter[getSectionID].push(getCurrentOption);
      } else {
        cpyFilter[getSectionID].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilter);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilter));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter handleFilters={handleFilters} filters={filters} />
      <div className="bg-background shadow-sm rounded-lg w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
                    <ProductTile
                      key={item._id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={item}
                      handleAddToCart={handleAddToCart}
                    />
                  ))
                : null}
            </div>
          </>
        )}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        isLoadingProductDetails={isLoadingProductDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingListing;
