import ImageUpload from '@/components/admin-view/image-upload';
import AdminProductTile from '@/components/admin-view/product-tile';
import FormCommon from '@/components/common/form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { addProductFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from '@/store/admin/product-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

const AdminProducts = () => {
  const [openAddProductsDialog, setOpenAddProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const isValidForm = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== '')
      .every((item) => item);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: 'Product Deleted successfully',
        });
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setImageLoadingState(true);

    {
      currentEditedId !== null
        ? dispatch(editProduct({ id: currentEditedId, formData })).then(
            (data) => {
              if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                setFormData(initialFormData);
                setOpenAddProductsDialog(false);
                setCurrentEditedId(null);
                toast({
                  title: 'Product Edited successfully',
                });
              }
            }
          )
        : dispatch(
            addNewProduct({ ...formData, image: uploadedImageUrl })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setImageFile(null);
              setFormData(initialFormData);
              setImageLoadingState(false);
              setUploadedImageUrl('');
              setOpenAddProductsDialog(false);
              toast({
                title: 'Product added successfully',
              });
            }
          });
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList);

  return (
    <>
      <div className="w-full flex justify-end mb-5">
        <Button onClick={() => setOpenAddProductsDialog(true)}>
          Add Products
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              setOpenAddProductsDialog={setOpenAddProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              setFormData={setFormData}
              key={productItem._id}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <></>
        )}
      </div>

      <Sheet
        open={openAddProductsDialog}
        onOpenChange={() => {
          setOpenAddProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? 'Edit Product' : 'Add New Products'}
            </SheetTitle>
          </SheetHeader>
          {imageLoadingState && uploadedImageUrl !== '' ? (
            <Skeleton className="h-full bg-gray-100" />
          ) : (
            <>
              <ImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedId !== null}
              />
              <div className="py-6">
                <FormCommon
                  formControls={addProductFormControls}
                  buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={onSubmit}
                  isButtonDisabled={!isValidForm()}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
