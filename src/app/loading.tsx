export default function Loading() {
  return (
    <div className="w-full">
      <div className="animate-pulse flex space-x-4 mb-8">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-40 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="card bg-white shadow-sm border border-gray-100 p-4">
            <div className="animate-pulse flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="h-4 bg-slate-200 rounded w-16"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <div className="h-3 bg-slate-200 rounded w-16"></div>
                <div className="h-4 bg-slate-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
