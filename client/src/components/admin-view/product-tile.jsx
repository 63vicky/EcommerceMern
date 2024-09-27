/* eslint-disable react/prop-types */
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

const AdminProductTile = ({
  product,
  setOpenAddProductsDialog,
  setFormData,
  setCurrentEditedId,
  handleDelete,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            className="w-full object-cover h-[300px] rounded-t-lg"
            src={product?.image}
            alt={product?.name}
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice ? 'line-through' : ''
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenAddProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(product?._id);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
