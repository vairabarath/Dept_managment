const Announcement = () => {
  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Announcements</h1>
        <span className="text-sm text-gray-400">See all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lightSkyBlue rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm tetx-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="bg-lightSkyBlue rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm tetx-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="bg-lightSkyBlue rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm tetx-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
