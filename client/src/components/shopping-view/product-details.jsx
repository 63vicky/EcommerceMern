/* eslint-disable react/prop-types */
import { StarIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';

const ProductDetailsDialog = ({
  open,
  setOpen,
  productDetails,
  isLoadingProductDetails,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] sm:p-12">
        {isLoadingProductDetails ? (
          <>
            <div className="w-full h-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Loading..
            </div>
          </>
        ) : (
          <>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="">
              <div>
                <h1 className="text-3xl font-extrabold">
                  {productDetails?.title}
                </h1>
                <p className="text-muted-foreground text-2xl mb-5 mt-2">
                  {productDetails?.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p
                  className={`text-3xl font-bold  ${
                    productDetails?.salePrice > 0
                      ? 'line-through text-muted-foreground'
                      : 'text-primary'
                  }`}
                >
                  ${productDetails?.price}
                </p>
                {productDetails?.salePrice > 0 ? (
                  <p className=" font-bold text-3xl">
                    ${productDetails?.salePrice}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex gap-1 items-center mt-1">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-none" />
                </div>
                <span className="text-muted-foreground">(4.5)</span>
              </div>

              <div className="mt-5">
                <Button className="w-full">Add to Cart</Button>
              </div>
              <Separator className="mt-4" />
              <div className="max-h-[300px] mt-2 overflow-auto">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                <div className="gird gap-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>VG</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Vivek Gangani</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-none" />
                      </div>
                      <p className="text-muted-foreground">
                        This is an awesome product.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>VG</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Vivek Gangani</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-none" />
                      </div>
                      <p className="text-muted-foreground">
                        This is an awesome product.This is an awesome
                        product.This is an awesome product.This is an awesome
                        product.This is an awesome product.This is an awesome
                        product.This is an awesome product.This is an awesome
                        product.This is an awesome product.This is an awesome
                        product.This is an awesome product.This is an awesome
                        product.This is an awesome product.This is an awesome
                        product.This is an awesome product.This is an awesome
                        product.This is an awesome product.This is an awesome
                        product.This is an awesome product.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 mb-2 flex gap-2">
                    <Input
                      className="outline-none focus-visible:ring-0 border-none"
                      placeholder="Write a review..."
                    />
                    <Button>Submit</Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
