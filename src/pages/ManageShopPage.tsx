import {
  useCreateMyShop,
  useGetMyShop,
  useGetMyShopOrders,
  useUpdateMyShop,
} from "@/api/MyShopApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageShopForm from "@/forms/manage-shop-form/ManageShopForm";

const ManageShopPage = () => {
  const { createShop, isLoading: isCreateLoading } = useCreateMyShop();
  const { shop: shop } = useGetMyShop();
  const { updateShop, isLoading: isUpdateLoading } = useUpdateMyShop();

  const { orders } = useGetMyShopOrders();

  const isEditing = !!shop;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-shop">Manage Shop</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-shop">
        <ManageShopForm
          shop={shop}
          onSave={isEditing ? updateShop : createShop}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageShopPage;
