import { RPC_URL } from "../Utils/constant";
import { createConfig, http } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import {  metaMask, safe, coinbaseWallet} from "wagmi/connectors";

export const config = createConfig({
  multiInjectedProviderDiscovery: false,
  chains: [avalancheFuji],
  connectors: [

    metaMask(),
    coinbaseWallet(),
    safe(),
  ],
  transports: { [avalancheFuji.id]: http(RPC_URL) }
});
