"use client";

import Card from "components/dashboard/Card";
import Navbar from "components/dashboard/Navbar";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { formatUrl } from "lib/utils";

export default function () {
  const availableOrganizations = useQuery(
    api.organization.getUserOrganizations,
  );

  const organizationCards = availableOrganizations?.map((info, index) => {
    const url = formatUrl(info.name, info._id);
    return (
      <Card
        titulo={info.name}
        descripcion={info.description}
        url={`userDashboard/${url}`}
        key={index}
      />
    );
  });
  return (
    <main className={"container"}>
      <Navbar />

      <section className={"mainSection"}>
        <div className={"linkContainer"}>
          <h2> Conectar a Admin</h2>
        </div>
        <div className={"gridContainer"}>{organizationCards}</div>
      </section>
    </main>
  );
}
