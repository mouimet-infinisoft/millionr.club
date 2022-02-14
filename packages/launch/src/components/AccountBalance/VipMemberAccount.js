import  AccountBalance  from './AccountBalance';
import { useVipMembersBalance } from './useVipMemberAccount';

const VipMemberAccount = () => {
  const {balance} = useVipMembersBalance();

  return (
    <AccountBalance
      title="VIP Members"
      unit="nft"
      decimalPlaces={0}
      variation={0}
      balance={balance} />
  );
};

export default VipMemberAccount