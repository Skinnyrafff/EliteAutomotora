// src/components/PageHero.tsx
import Image from "next/image";

interface PageHeroProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function PageHero({
  title,
  description,
  imageUrl,
}: PageHeroProps) {
  return (
    <div className="px-4 md:px-6 lg:px-8 pt-6">
      <div className="mx-auto w-full max-w-[1360px]">
        <div className="relative h-[50vh] rounded-[24px] overflow-hidden flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50 rounded-[24px]"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {title}
            </h1>
            <p className="text-lg text-neutral-300 mt-2">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
