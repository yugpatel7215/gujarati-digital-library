export default function AdminPage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Categories</h3>

          <p className="mt-3 text-4xl font-bold text-blue-600">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Resources</h3>

          <p className="mt-3 text-4xl font-bold text-green-600">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Downloads</h3>

          <p className="mt-3 text-4xl font-bold text-purple-600">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Views</h3>

          <p className="mt-3 text-4xl font-bold text-orange-600">
            0
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Welcome
        </h3>

        <p className="text-gray-600">
          You have successfully logged in as an administrator.
        </p>
      </div>
    </>
  );
}