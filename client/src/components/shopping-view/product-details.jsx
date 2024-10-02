import { Dialog, DialogContent } from '../ui/dialog';

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] sm:p-12">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground">
              {productDetails?.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
