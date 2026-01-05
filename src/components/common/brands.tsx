
import Image from "next/image";

interface BrandsProps {
  title: string;
}

const Brands = ({title}: BrandsProps) => {
  return (
    <>
    <h3 className="px-5 md:px-8 lg:px-12 font-semibold md:text-xl lg:text-2xl">{title}</h3>
      {/* Mobile: scroll horizontal */}
      <div className="flex w-full gap-4 overflow-x-auto px-5 md:hidden [&::-webkit-scrollbar]:hidden">
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
      {/* Desktop: grid centralizado */}
      <div className="hidden md:flex justify-center items-center gap-6 lg:gap-8 px-8 lg:px-12 flex-wrap">
        <Image src="/nike.png" width={100} height={133} alt="Nike logo" className="md:w-[100px] lg:w-[120px]" />
        <Image src="/adidas.png" width={100} height={133} alt="Adidas logo" className="md:w-[100px] lg:w-[120px]" />
        <Image src="/puma.png" width={100} height={133} alt="Puma logo" className="md:w-[100px] lg:w-[120px]" />
        <Image src="/polo.png" width={100} height={133} alt="Polo logo" className="md:w-[100px] lg:w-[120px]" />
        <Image
          src="/newbalance.png"
          width={100}
          height={133}
          alt="New Balance logo"
          className="md:w-[100px] lg:w-[120px]"
        />
        <Image
          src="/converse.png"
          width={100}
          height={133}
          alt="Converse logo"
          className="md:w-[100px] lg:w-[120px]"
        />
        <Image src="/zara.png" width={100} height={133} alt="Zara logo" className="md:w-[100px] lg:w-[120px]" />
      </div>
    </>
  );
};

export default Brands;
