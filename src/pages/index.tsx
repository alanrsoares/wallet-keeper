import Head from "next/head";
import { APP_NAME } from "~/lib/constants";
import GenerateWallet from "~/ui/compounds/GenerateWallet";
import ImportWallet from "~/ui/compounds/ImportWallet";
import WalletList from "~/ui/compounds/WalletList";

const Index = () => (
  <>
    <Head>
      <title>{APP_NAME}</title>
    </Head>
    <div className="grid gap-4">
      <WalletList />
      <GenerateWallet />
      <ImportWallet />
    </div>
  </>
);

export default Index;
