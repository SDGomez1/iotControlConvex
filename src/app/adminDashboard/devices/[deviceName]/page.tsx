"use client";
import FunctionCardView from "components/admin/functionCardView";

import { Protect } from "@clerk/nextjs";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useConnectedDeviceDispatch } from "context/conectedDeviceContext";

import { conectedDeviceData } from "lib/types";
import { connectToSerial } from "lib/Serial";
import { deFormatUrl } from "lib/utils";

export default function Device() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPort, setSelectedPort] = useState<SerialPort | undefined>(
    undefined,
  );

  const dispatch = useConnectedDeviceDispatch();

  const params = useParams<{ deviceName: string }>();
  const deviceId = deFormatUrl(params.deviceName);

  const device = useQuery(api.device.getdeviceById, {
    deviceId: deviceId as Id<"device">,
  });
  const functions = useQuery(api.deviceFunction.getFunctionByDeviceId, {
    deviceId: deviceId as Id<"device">,
  });

  //Todo: comand lifecycle, and styles
  const functionscom = functions?.map((e, i) => {
    return (
      <FunctionCardView titulo={e.nombre} descripcion={e.descripcion} key={i} />
    );
  });

  useEffect(() => {
    if (selectedPort !== undefined) {
      const data: conectedDeviceData = {
        id: deviceId,
        device: selectedPort,
      };
      console.log(data);
      dispatch({
        type: "ADD",
        payload: data,
      });
    }
  }, [selectedPort]);
  return (
    <main className="min-h-screen min-w-full bg-gray-50 ">
      <Protect>
        <section className="flex flex-col items-start  gap-4 border-b-2 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-40">
          <div className="w-full ">
            <h2 className="my-0 text-xl font-semibold lg:text-3xl">
              {device?.nombre}
            </h2>
            <p className="text-sm text-neutral-500">{device?.description}</p>
          </div>

          <div className="flex w-full gap-8  lg:justify-end">
            <button
              onClick={async () => {
                const port = await connectToSerial();
                setSelectedPort(port);
              }}
              className=" hidden h-8 w-44 items-center justify-center gap-4 rounded bg-emerald-700 py-2 text-sm text-white transition hover:bg-emerald-600 lg:flex lg:h-9"
            >
              <UsbSvg />
              Conectar
            </button>
            <button className="flex h-8 w-44 items-center justify-center rounded border border-black bg-transparent px-8 py-1 text-sm transition hover:bg-white lg:h-9">
              Editar Funciones
            </button>
          </div>
        </section>
        <div className="flex flex-col gap-4 px-4 pt-4 lg:px-40">
          <h3 className="text-xl  font-medium lg:text-2xl">
            Funciones Disponibles
          </h3>
          {isEditing ? <></> : functionscom}
        </div>
      </Protect>
    </main>
  );
}
function UsbSvg() {
  return (
    <svg viewBox="0 0 26 16" fill="none" className="h-5 w-5">
      <path
        d="M5.8632 8.69594C5.42744 10.2612 4.03683 11.1287 2.61765 10.9461C1.08576 10.7493 0.00152969 9.50554 -5.72205e-05 8.00936C-0.00164413 6.50049 1.04766 5.2718 2.59067 5.04956C3.97334 4.85034 5.40442 5.67581 5.8632 7.29342C6.32753 7.29342 6.80297 7.30612 7.27603 7.28072C7.35461 7.27676 7.45382 7.12039 7.49351 7.01483C8.07293 5.49167 8.64441 3.96533 9.21669 2.43979C9.40004 1.95006 9.58339 1.82069 10.1001 1.81989C10.7938 1.81989 11.4875 1.81989 12.1757 1.81989C12.5019 0.909488 13.0869 0.287207 14.0267 0.0744886C15.0093 -0.147755 15.8641 0.127668 16.5142 0.895995C17.1889 1.6929 17.3167 2.61441 16.8825 3.55894C16.4602 4.47887 15.7086 4.98924 14.6807 5.0194C13.5703 5.05194 12.69 4.46379 12.2678 3.43274C12.2019 3.27082 12.1249 3.20494 11.9471 3.20971C11.501 3.22161 11.0542 3.20653 10.6081 3.22002C10.5216 3.2224 10.3874 3.28749 10.3612 3.35654C9.86992 4.63762 9.3921 5.92345 8.9119 7.2085C8.90555 7.22516 8.9111 7.24739 8.9111 7.28072L20.5566 7.28072C20.5566 7.05134 20.5566 6.82751 20.5566 6.60447C20.5574 6.30762 20.5408 6.00838 20.5646 5.71312C20.6138 5.11782 21.1535 4.83922 21.6615 5.15195C22.8592 5.88853 24.0522 6.63304 25.2404 7.3855C25.7238 7.69187 25.7198 8.30146 25.2333 8.61022C24.0538 9.3579 22.8688 10.0969 21.6798 10.8295C21.1448 11.1597 20.594 10.866 20.5622 10.2366C20.5424 9.84128 20.5574 9.44442 20.5566 9.04835C20.5566 8.94199 20.5566 8.83643 20.5566 8.71261H11.4209C11.6487 9.32616 11.8693 9.92462 12.0931 10.5215C12.3432 11.1874 12.6059 11.8478 12.8416 12.5185C12.9139 12.7249 13.017 12.7876 13.2266 12.7812C13.6711 12.767 14.1164 12.7765 14.6085 12.7765C14.6085 12.4503 14.6069 12.1471 14.6085 11.8446C14.6132 11.2041 14.8521 10.9636 15.4855 10.9636C16.6071 10.9628 17.7278 10.962 18.8493 10.9636C19.4073 10.9644 19.6502 11.2017 19.6526 11.7558C19.6566 12.9051 19.6566 14.0536 19.6526 15.2029C19.6502 15.7268 19.3954 15.9895 18.866 15.9935C17.7151 16.0022 16.5642 16.0022 15.4133 15.9935C14.8775 15.9895 14.6228 15.722 14.6101 15.1775C14.6021 14.8537 14.6085 14.529 14.6085 14.1703C13.9655 14.1703 13.3536 14.1703 12.7416 14.1703C12.0971 14.1703 11.9503 14.0703 11.7272 13.4789C11.1566 11.9637 10.5882 10.4477 10.0096 8.93644C9.97311 8.84039 9.85484 8.70784 9.77388 8.70705C8.47535 8.69276 7.17602 8.69673 5.8624 8.69673L5.8632 8.69594ZM1.37071 8.00063C1.37547 8.86183 2.1057 9.58809 2.96768 9.58967C3.83443 9.59126 4.55434 8.87532 4.56228 8.00381C4.57022 7.12833 3.82808 6.38699 2.95578 6.39969C2.08903 6.41239 1.36595 7.14262 1.37071 7.99984V8.00063ZM16.0213 14.5806H18.2612V12.351H16.0213V14.5806ZM14.6045 1.39207C13.9767 1.38969 13.4607 1.89371 13.4568 2.51202C13.4528 3.1224 13.9775 3.65181 14.5918 3.65657C15.2109 3.66134 15.7244 3.14938 15.726 2.52393C15.7276 1.88498 15.2411 1.39366 14.6053 1.39207H14.6045ZM21.9766 9.01501C22.537 8.66419 23.0561 8.33876 23.6069 7.99349C23.041 7.64108 22.5243 7.31962 21.9766 6.97831V9.01501Z"
        fill="white"
      />
    </svg>
  );
}
