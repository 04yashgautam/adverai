import dashboardPreview from "@/assets/dashboard-preview.png";

export function DashboardPreview() {
  return (
    <div className="w-[calc(100vw-32px)] md:w-[1160px]">
      <div className="bg-primary-light/50 rounded-2xl p-2 shadow-2xl">
        <img
          src={dashboardPreview}
          alt="Dashboard preview"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
