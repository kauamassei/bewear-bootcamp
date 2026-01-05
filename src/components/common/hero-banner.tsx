import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface HeroBannerProps {
  imageSrc: string | any;
  alt: string;
}

const HeroBanner = ({ imageSrc, alt }: HeroBannerProps) => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden rounded-lg lg:rounded-xl">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/30 flex items-center justify-center">
        <div className="text-center space-y-4 md:space-y-6 lg:space-y-8 px-5 max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
            LEVE UMA VIDA COM ESTILO
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 lg:gap-8 text-white text-sm md:text-base lg:text-lg font-medium">
            <p>VISTA-SE COM ATITUDE.</p>
            <span className="hidden md:inline text-primary-foreground/80">•</span>
            <p>CONFORTO & PERSONALIDADE.</p>
          </div>
          <div className="pt-4 md:pt-6">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 md:px-10 py-6 md:py-7 text-base md:text-lg font-semibold shadow-lg"
              asChild
            >
              <Link href="/category">Comprar</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

