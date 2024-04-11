export default function FunctionCardView(props: {
  titulo: string;
  descripcion: string;
}) {
  return (
    <div className="w-full border bg-white p-4 shadow-sm">
      <h3 className="text-xl font-medium">{props.titulo}</h3>
      <p className="text-sm text-neutral-500">{props.descripcion}</p>
    </div>
  );
}
