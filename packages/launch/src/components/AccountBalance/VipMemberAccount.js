import  AccountBalance  from './AccountBalance';
import { useVipMembersBalance } from './useVipMemberAccount';

const VipMemberAccount = () => {
  const {balance} = useVipMembersBalance();

  return (
    <AccountBalance
      title="VIP Members"
      unit="ether"
      variation={0}
      balance={balance} />
  );
};

export default VipMemberAccount