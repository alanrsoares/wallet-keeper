import Link from "next/link";

type Props = {};

const NotFoundPage = (_props: Props) => {
  return (
    <section className="hero min-h-[80vh] md:min-h-[85vh]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-2xl md:text-5xl font-bold font-display group">
            <span className="text-error group-hover:animate-pulse">404</span>
            <span className="opacity-50 font-light mx-2">|</span>
            <span>Not Found</span>
          </h1>
          <p className="py-6">
            The page you are looking for does not exist. You may have mistyped
            the address or the page may have moved.
          </p>
          <Link href="/" className="btn btn-info btn-outline">
            go to home page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
