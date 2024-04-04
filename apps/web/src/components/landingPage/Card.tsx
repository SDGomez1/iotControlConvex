import Image, { StaticImageData } from "next/image";

export default function Card(props: {
  imageUrl: StaticImageData | string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex w-full flex-col gap-4 overflow-hidden rounded-xl border px-8 py-4 lg:h-72 lg:w-4/5 lg:gap-0">
      <div className="flex h-2/3 w-full shrink-0 items-center justify-center lg:px-16">
        <Image src={props.imageUrl} alt="" className="h-full object-contain" />
      </div>
      <div className="flex h-full w-full flex-col justify-end">
        <h4 className="text-xl font-semibold">{props.title}</h4>
        <p className="text-sm">{props.text}</p>
      </div>
    </div>
  );
}
