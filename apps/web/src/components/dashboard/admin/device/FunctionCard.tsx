export default function FunctionCard(props: {
  name: string;
  description: string;
}) {
  return (
    <div className="dark:border-darkTex  flex w-full shrink-0 flex-col gap-2 rounded border border-lightText p-4 lg:h-40 2xl:h-44 2xl:w-500px">
      <h2 className="text-sm font-bold 2xl:text-xl">{props.name}</h2>
      <p className="line-clamp-3 text-xs text-lightText 2xl:text-base dark:text-darkText">
        {props.description}
      </p>
    </div>
  );
}
