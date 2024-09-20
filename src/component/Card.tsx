import { ShoppingCartIcon } from "../assets/ShoppingCartIcon";

export type CardProps = {
  src: string;
  alt: string;
  name: string;
  price: number;
};

export function Card({ alt, src, name, price }: CardProps) {
  return (
    <div className="bg-gray-200 p-3 grow flex flex-col items-center">
      <div className="flex justify-between w-full">
        <button className="w-6 h-6 p-0 rounded-full bg-gray-800" />
        <button className="text-xs bg-white text-black py-1 px-3 rounded-2xl">
          Customize
        </button>
      </div>
      <img src={src} alt={alt} className="h-72 w-auto" />
      <button className="flex px-3 py-2 items-stretch justify-between gap-2 bg-white rounded-none font-normal text-left w-full">
        <div>
          <p className="text-black">{name}</p>
          <p className="text-sm text-gray-600">From ${price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-full w-px bg-gray-200" />
          <div className="w-8 h-8 grid place-items-center">
            <ShoppingCartIcon className="w-4 h-4" />
          </div>
        </div>
      </button>
    </div>
  );
}
