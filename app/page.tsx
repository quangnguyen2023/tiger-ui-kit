import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#eaf1fa]">
      {/* Header */}
      <header className="w-full px-4 py-3">
        <div className="mx-auto flex max-w-screen-lg items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="Widget Kit Logo"
              width={28}
              height={28}
            />
            <span className="text-lg font-semibold tracking-tight text-blue-700">
              Widget Kit
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link
              href="/sign-in"
              className="text-gray-500 transition hover:text-blue-700"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="rounded-md border border-blue-600 px-5 py-2 text-blue-600 transition ease-out hover:bg-blue-600 hover:text-white"
            >
              Sign Up For Free
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex max-w-screen-lg flex-col items-center justify-center px-4 pt-36 pb-24">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
          <span className="text-gray-900">All Your </span>
          <span className="text-blue-600">Widgets</span>
          <span className="text-gray-900">, One </span>
          <span className="text-blue-600">Kit</span>
        </h1>

        <p className="mb-12 max-w-2xl text-center text-lg text-gray-600 md:text-xl">
          Widget Kit lets you easily create, manage, and embed widgets for
          Notion.
        </p>

        <div className="mb-18 flex flex-col gap-4 md:flex-row">
          <Link
            href="/sign-up"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700"
          >
            Get started - it's free
          </Link>
        </div>

        {/* Widget preview image */}
        <div
          id="widgets-preview"
          className="w-full max-w-3xl overflow-hidden rounded-2xl border bg-white shadow-xl"
        >
          <Image
            src="/login.png" // Thay bằng ảnh preview widgets thực tế nếu có
            alt="Widget Kit Preview"
            width={900}
            height={500}
            className="w-full object-cover"
          />
        </div>
      </main>
    </div>
  );
}
