import GenerateWallet from "~/ui/compounds/GenerateWallet";
import ImportWallet from "~/ui/compounds/ImportWallet";
import WalletList from "~/ui/compounds/WalletList";

const Index = () => {
  return (
    <div className="grid gap-4">
      <WalletList />
      <GenerateWallet />
      <ImportWallet />
    </div>
  );
};

export default Index;
