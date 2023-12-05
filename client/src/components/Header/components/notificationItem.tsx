import wallet from "../../../assets/wallet.png";

export const NotificationItem = () => {
  return (
    <div className="flex items-start gap-3 border-b-2 border-b-borderDivider">
      <img src={wallet} alt="wallet" />
      <div id="notification msg" className="flex flex-col flex-wrap gap-3">
        <h1 className="text-sm font-semibold text-primary-foreground">
          Payment Success
        </h1>
        <p className="text-garyColor">
          Your success an order payment from star sun appartment in the amount
          of $320
        </p>
        <span className="mb-2 text-sm text-primary-foreground">
          10 minutes ago
        </span>
      </div>
    </div>
  );
};
