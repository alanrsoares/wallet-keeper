import Link from "next/link";
import { WalletIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { APP_NAME } from "~/lib/constants";
import useIsSticky from "~/lib/hooks/useIsSticky";

const Header = () => {
  const isSticky = useIsSticky(32);

  return (
    <header
      className={clsx(
        "bg-base-200 text-base-content sticky top-0 transition-shadow",
        isSticky ? "shadow-md z-10 py-2 px-4" : "p-4"
      )}
    >
      <div className="container-narrow mx-auto">
        <h1 className={"text-2xl transition-all"}>
          <Link
            href="/"
            className={clsx(
              "flex gap-2 items-center group transition-all ease-linear",
              {
                "scale-75 origin-left opacity-60": isSticky,
              }
            )}
          >
            <WalletIcon
              className={
                "h-6 w-6 group-hover:opacity-60 group-hover:text-cyan-200 transition-all"
              }
            />
            <span className="font-display tracking-tighter group-hover:text-cyan-200 transition-all">
              {APP_NAME}
            </span>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
