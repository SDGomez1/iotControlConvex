import DeviceList from "components/dashboard/DeviceList";

export default function userPage() {
  return (
    <section className="flex h-full auto-rows-max grid-cols-2 flex-col justify-items-center gap-4 overflow-y-scroll px-5 pb-20 lg:grid 2xl:grid-cols-3 2xl:pb-32">
      <DeviceList isAdmin={false} />
    </section>
  );
}
