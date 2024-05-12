import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import FiltersSection from "./FiltersSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Shop } from "@/types";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

const formSchema = z
  .object({
    shopName: z.string({
      required_error: "restuarant name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    filters: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type ShopFormData = z.infer<typeof formSchema>;

type Props = {
  shop?: Shop;
  onSave: (shopFormData: FormData) => void;
  isLoading: boolean;
};

const ManageShopForm = ({ onSave, isLoading, shop: shop }: Props) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const form = useForm<ShopFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filters: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!shop) {
      return;
    }

    // price lowest value of 100 = 100cents == 1euro
    const deliveryPriceFormatted = parseInt(
      (shop.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = shop.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedShop = {
      ...shop,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedShop);
  }, [form, shop]);

  const onSubmit = (formDataJson: ShopFormData) => {
    const formData = new FormData();

    formData.append("shopName", formDataJson.shopName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.filters.forEach((filter, index) => {
      formData.append(`filters[${index}]`, filter);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  //QR code renders a basic "https:./detail/" and uses the _id variable after the / to generate the qr code automatically as the _id is used to generate the order pages
  useEffect(() => {
    if (shop && shop._id) {
      const qrCodeBaseURL = "https://final-frontend-j5hr.onrender.com/detail/";
      const qrCodeURLWithId = qrCodeBaseURL + shop._id;
      setQrCodeUrl(qrCodeURLWithId);
    }
  }, [shop]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <FiltersSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}

        <div>
          <span className="md:block">
            QR code will generate here after submit just reload page!
          </span>
          {qrCodeUrl && <QRCode value={qrCodeUrl} />}
        </div>
      </form>
    </Form>
  );
};

export default ManageShopForm;
