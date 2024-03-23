const DashWidgets = ({ dashData }: any) => {
  return (
    <div className="min-w-screen bg-slate-100 flex items-center justify-center px-5 py-5 rounded-2xl">
      <div className="w-full max-w-3xl">
        <div className="-mx-2 md:flex">
          <div className="w-full md:w-1/3 px-2">
            <div className="rounded-lg shadow-sm mb-4">
              <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                <div className="px-3 pt-8 pb-10 text-center relative z-10">
                  <h4 className="text-sm uppercase text-gray-500 leading-tight">
                    Wins
                  </h4>
                  <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                    {dashData?.overall?.totalWins}
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-xs text-green-500 leading-tight flex flex-col">
                      <span>{dashData?.overall?.premiumWins}</span>{" "}
                      <span>Premium Signals</span>
                    </p>
                    <p className="text-xs text-blue-800 leading-tight flex flex-col">
                      <span>{dashData?.overall?.freeWins}</span>{" "}
                      <span>Free Signals</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <div className="rounded-lg shadow-sm mb-4">
              <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                <div className="px-3 pt-8 pb-10 text-center relative z-10">
                  <h4 className="text-sm uppercase text-gray-500 leading-tight">
                    Weekly Total
                  </h4>
                  <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                    {dashData?.weeklyTotals[0]?.totalForex +
                      dashData?.weeklyTotals[0]?.totalBinary}
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-xs text-green-500 leading-tight flex flex-col">
                      <span>{dashData?.weeklyTotals[0]?.totalForex}</span>{" "}
                      <span>Forex Signals</span>
                    </p>
                    <p className="text-xs text-blue-800 leading-tight flex flex-col">
                      <span>{dashData?.weeklyTotals[0]?.totalBinary}</span>{" "}
                      <span>Binary Signals</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <div className="rounded-lg shadow-sm mb-4">
              <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                <div className="px-3 pt-8 pb-10 text-center relative z-10">
                  <h4 className="text-sm uppercase text-gray-500 leading-tight">
                    Robot Generated
                  </h4>
                  <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                    {dashData?.robotGenerated.totalForex +
                      dashData?.robotGenerated.totalBinary}
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-xs text-green-500 leading-tight flex flex-col">
                      <span>{dashData?.robotGenerated?.totalForex}</span>{" "}
                      <span>Forex Signals</span>
                    </p>
                    <p className="text-xs text-blue-800 leading-tight flex flex-col">
                      <span>{dashData?.robotGenerated?.totalBinary}</span>{" "}
                      <span>Binary Signals</span>
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0">
                  <canvas id="chart1" height="70"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashWidgets;
