import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

/**
 * `Carousel` presents a collection of swipeable items powered by Embla.
 * Use it when the user needs to compare alternatives side by side.
 *
 * ### When to use (MCP principle: compare options)
 * - Lists of hotels, flights, activities, or destinations.
 * - Any scenario where the user needs to inspect more than one option.
 *
 * ### When not to use
 * - If there are only one or two items. Prefer regular cards or a list.
 * - If the items are too heterogeneous. A carousel implies comparison.
 */
const meta: Meta<typeof Carousel> = {
  title: "Guia de Diseno/Componentes/Carousel",
  component: Carousel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const hoteles = [
  {
    name: "Can Lluc Ibiza",
    category: "Boutique",
    price: "EUR 420/noche",
    badge: "Recomendado",
  },
  {
    name: "Nobu Hotel Ibiza Bay",
    category: "Lujo",
    price: "EUR 680/noche",
    badge: "Lujo",
  },
  {
    name: "Torre del Canonigo",
    category: "Historico",
    price: "EUR 290/noche",
    badge: "Cultural",
  },
  {
    name: "Six Senses Ibiza",
    category: "Wellness",
    price: "EUR 950/noche",
    badge: "Wellness",
  },
];

export const HotelesCarousel: Story = {
  render: () => (
    <div className="px-12 max-w-sm mx-auto">
      <Carousel>
        <CarouselContent>
          {hoteles.map((hotel) => (
            <CarouselItem key={hotel.name}>
              <Card className="shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{hotel.name}</CardTitle>
                    <Badge variant="secondary">{hotel.badge}</Badge>
                  </div>
                  <CardDescription>{hotel.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold text-primary">
                    {hotel.price}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const NumericCards: Story = {
  render: () => (
    <div className="px-12 max-w-sm mx-auto">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="h-32 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">
                  {index + 1}
                </span>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
