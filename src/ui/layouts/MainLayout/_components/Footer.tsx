import clsx from "clsx";
import { APP_NAME } from "~/lib/constants";
import useIsSticky from "~/lib/hooks/useIsSticky";
import useVersion from "~/lib/hooks/useVersion";

const Footer = () => {
  const version = useVersion();
  const isSticky = useIsSticky(32);

  return (
    <footer
      className={clsx("bg-base-300 p-3 lg:p-4 sticky bottom-0 group", {
        "drop-shadow-md": isSticky,
      })}
    >
      <div className="container-narrow max-auto flex gap-1 items-center justify-center font-mono">
        v{version ?? "next"} &copy; {new Date().getFullYear()}{" "}
        <span className="font-display transition-colors group-hover:text-cyan-200">
          {APP_NAME}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
