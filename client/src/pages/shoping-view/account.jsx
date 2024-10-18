import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import addressImg from '../../assets/account.jpg';
import Orders from '@/components/shopping-view/orders';
import Address from '@/components/shopping-view/address';

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col bg-background">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={addressImg}
          alt="AddressImage"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg bg-background shadow-sm shadow-foreground/20 border p-6">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
