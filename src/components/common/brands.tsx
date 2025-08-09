
import Image from "next/image";

interface BrandsProps {
  title: string;
}

const Brands = ({title}: BrandsProps) => {
  return (
    <>
    <h3 className="px-5 font-semibold">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        <Image src="/nike.png" width={80} height={106} alt="Nike logo" />
        <Image src="/adidas.png" width={80} height={106} alt="Adidas logo" />
        <Image src="/puma.png" width={80} height={106} alt="Puma logo" />
        <Image src="/polo.png" width={80} height={106} alt="Polo logo" />
        <Image
          src="/newbalance.png"
          width={80}
          height={106}
          alt="New Balance logo"
        />
        <Image
          src="/converse.png"
          width={80}
          height={106}
          alt="Converse logo"
        />
        <Image src="/zara.png" width={80} height={106} alt="Zara logo" />
      </div>
    </>
  );
};

export default Brands;
