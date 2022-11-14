import Link from "next/link";
import { WalletIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <header className="bg-base-200 text-base-content p-4">
      <div className="container-4xl mx-auto">
        <h1 className="text-2xl">
          <Link href="/" className="flex gap-2 items-center group">
            <WalletIcon className="h-6 w-6 group-hover:opacity-60 group-hover:text-cyan-200 transition-all" />
            <span className="font-display group-hover:text-cyan-200 transition-all">
              WalletKeeper
            </span>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
