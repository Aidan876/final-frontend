import { Shop } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  shop: Shop;
};

const ShopInfo = ({ shop }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {shop.shopName}
        </CardTitle>
        <CardDescription>
          {shop.city}, {shop.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {shop.filters.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < shop.filters.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default ShopInfo;
