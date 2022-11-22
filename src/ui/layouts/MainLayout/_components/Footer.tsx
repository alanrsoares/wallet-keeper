import { APP_NAME } from "~/lib/constants";
import useVersion from "~/lib/hooks/useVersion";

const Footer = () => {
  const version = useVersion();

  return (
    <footer className="bg-base-300 p-3 lg:p-4">
      <div className="container-narrow max-auto grid place-items-center font-mono">
        v{version} &copy; {new Date().getFullYear()} {APP_NAME}
      </div>
    </footer>
  );
};

export default Footer;
