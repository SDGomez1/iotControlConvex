import Link from "next/link";
export default function Card(props: {
  titulo: string;
  descripcion: string;
  url: string;
}) {
  return (
    <div className=" lg:wborder flex h-44 w-11/12 shrink-0 flex-col rounded border bg-white p-6 drop-shadow-sm transition hover:drop-shadow-md ">
      <h3 className="text-xl font-medium">{props.titulo}</h3>
      <p className="text-sm text-neutral-500"> {props.descripcion}</p>
      <div className="flex h-full flex-col justify-end">
        <Link
          href={props.url}
          className="w-full rounded bg-neutral-900 py-2 text-center text-sm text-white"
        >
          Conectar →
        </Link>
      </div>
    </div>
  );
}
