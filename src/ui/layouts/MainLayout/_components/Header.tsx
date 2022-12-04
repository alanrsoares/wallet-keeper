import Link from "next/link";
import { WalletIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { APP_NAME } from "~/lib/constants";
import useIsSticky from "~/lib/hooks/useIsSticky";

const Header = () => {
  const isSticky = useIsSticky(64);

  return (
    <header
      className={clsx(
        "bg-base-200 text-base-content sticky top-0 transition-all z-10 p-3 md:p-4",
        {
          "shadow-md -translate-y-3": isSticky,
        }
      )}
    >
      <div
        className={clsx("container-narrow mx-auto", {
          "scale-75 transition-transform ease-linear origin-left opacity-60":
            isSticky,
        })}
      >
        <h1 className="text-2xl">
          <Link href="/" className="flex gap-2 items-center group">
            <WalletIcon
              className={
                "h-6 w-6 group-hover:opacity-60 group-hover:text-cyan-200 transition-all group-hover:rotate-90"
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
