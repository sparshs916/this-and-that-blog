import { Great_Vibes, Libre_Baskerville } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
});

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-[min(15vw,70px)] py-8 md:py-12">
      <h1 className="flex items-baseline gap-2 md:gap-4">
        <span
          className={`${greatVibes.className} text-black text-[min(15vw,80px)] px-1`}
        >
          This
        </span>
        <span
          className={`${libreBaskerville.className} text-gray-500 text-[min(15vw,40px)] relative bottom-1 md:bottom-2`}
        >
          and
        </span>
        <span className="text-black text-[min(15vw,70px)]">That</span>
      </h1>
      <p className="mx-auto max-w-xl text-lg text-black sm:items-center mt-2 md:mt-4">
        A cozy blog for all your curiosities.
      </p>
    </section>
  );
}
