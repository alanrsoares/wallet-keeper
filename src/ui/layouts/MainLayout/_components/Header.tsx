import Link from "next/link";
import { WalletIcon } from "@heroicons/react/24/solid";
import tw from "tailwind-styled-components";

import { APP_NAME } from "~/lib/constants";
import useIsSticky from "~/lib/hooks/useIsSticky";

type StickyProps = {
  $isSticky?: boolean;
};

const Header = () => {
  const isSticky = useIsSticky(64);

  return (
    <StyledHeader $isSticky={isSticky}>
      <StyledContent $isSticky={isSticky}>
        <h1 className="text-2xl">
          <Link href="/" className="flex gap-2 items-center group">
            <StyledWalletIcon />
            <AppTitle>{APP_NAME}</AppTitle>
          </Link>
        </h1>
      </StyledContent>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = tw.header<StickyProps>`
  bg-base-200 text-base-content sticky top-0 transition-all z-10 p-3 md:p-4
  ${({ $isSticky }) => ($isSticky ? "shadow-md -translate-y-3" : "")}
`;

const StyledContent = tw.div<StickyProps>`
  container-narrow mx-auto
  ${({ $isSticky }) =>
    $isSticky
      ? "scale-75 transition-transform ease-linear origin-left opacity-60"
      : ""}
`;

const StyledWalletIcon = tw(WalletIcon)`
  h-6 w-6 group-hover:opacity-60
  transition-all
  group-hover:text-cyan-200
  group-hover:rotate-90
`;

const AppTitle = tw.span`
  font-display tracking-tighter 
  transition-all
  group-hover:text-cyan-200
`;
