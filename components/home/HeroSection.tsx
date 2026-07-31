import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="bg-linear-to-r from-blue-700 via-blue-600 to-blue-500 py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h1 className="text-5xl font-extrabold text-white md:text-6xl">
          Gujarati Digital Library
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
          Discover Gujarati books, bhajans, chalisas, aartis, scriptures and
          spiritual resources — all in one place.
        </p>

        <div className="mt-12">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}