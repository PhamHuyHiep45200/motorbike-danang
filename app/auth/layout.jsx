/* eslint-disable @next/next/no-img-element */
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div>
      <img
        src="/image/anhnen.jpeg"
        alt=""
        className="fixed top-0 right-0 bottom-0 left-0 w-full h-full"
      />
      <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-full z-[10] flex items-center justify-center">
        <div
          className="max-w-[350px] min-w-[320px] p-[30px] rounded-[4px] bg-[#000] bg-opacity-50"
          style={{
            boxShadow: "0 0 3px 3px #fff",
          }}
        >
          <h1 className="flex w-full justify-center py-5 text-[20px] text-[white] font-bold">
            MOTOBY
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
