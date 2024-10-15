import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import {
  Airplay,
  BabyIcon,
  Binary,
  Boxes,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightningIcon,
  FootprintsIcon,
  Gem,
  Luggage,
  Medal,
  ShirtIcon,
  WatchIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from '@/store/shop/product-slice';
import ProductTile from '@/components/shopping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'Women', icon: CloudLightningIcon },
  { id: 'kids', label: 'Kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: FootprintsIcon },
];

const brandWithIcons = [
  { id: 'nike', label: 'Nike', icon: Luggage },
  { id: 'puma', label: 'Puma', icon: Medal },
  { id: 'adidas', label: 'Adidas', icon: Airplay },
  { id: 'levi', label: "Levi's", icon: Binary },
  { id: 'zara', label: 'Zara', icon: Boxes },
  { id: 'h&m', label: 'H&M', icon: Gem },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { isLoadingProductDetails, productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const slides = [bannerOne, bannerTwo, bannerThree];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: 'price-lowtohigh',
      })
    );
  }, [dispatch]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters');

    const currentFilters = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem('filters', JSON.stringify(currentFilters));

    navigate(`/shop/listing`);
  }

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
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  function handleGetProductDetails(getCurProductID) {
    setOpenDetailsDialog(true);
    dispatch(fetchProductDetails(getCurProductID));
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, idx) => (
          <img
            src={slide}
            alt="Banner One"
            key={idx}
            className={`${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            } w-full h-full absolute top-0 left-0 object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            );
          }}
          className="absolute border-none top-1/2 left-4 bg-white/80 hover:bg-white/80 hover:text-black text-black transform -translate-y-1/2"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            console.log((1 + 1) % slides.length, 'prevSlide');
          }}
          className="absolute border-none top-1/2 right-4 bg-white/80 hover:bg-white/80 hover:text-black text-black transform -translate-y-1/2"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-8 font-bold">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, 'category')}
                key={item.id}
                className="cursor-pointer hover:shadow-lg hover:shadow-foreground/10 transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-8 font-bold">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcons.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, 'brand')}
                key={item.id}
                className="cursor-pointer hover:shadow-lg hover:shadow-foreground/10 transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-8 font-bold">
            Feature Product
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, idx) => (
                  <ProductTile
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    key={idx}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
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

export default ShoppingHome;
