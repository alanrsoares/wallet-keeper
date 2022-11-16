const Footer = () => {
  return (
    <footer className="bg-base-300 p-4">
      <div className="container-4xl max-auto grid place-items-center font-mono">
        &copy; {new Date().getFullYear()} WalletKeeper
      </div>
    </footer>
  );
};

export default Footer;