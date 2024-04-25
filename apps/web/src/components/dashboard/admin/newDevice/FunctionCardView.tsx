export default function FunctionCardView(props: { name: string }) {
  return (
    <div className="w-full rounded border border-lightText bg-white py-2 text-center align-middle text-sm text-lightText dark:border-darkText dark:bg-dark dark:text-darkText">
      <h3>{props.name}</h3>
    </div>
  );
}
