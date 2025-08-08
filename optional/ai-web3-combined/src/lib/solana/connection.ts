import { Connection, clusterApiUrl, Commitment } from '@solana/web3.js';

export type SolanaNetwork = 'mainnet-beta' | 'testnet' | 'devnet';

export function getNetworkUrl(network: SolanaNetwork): string {
  // Check for custom RPC URL first
  const customRpc = process.env.NEXT_PUBLIC_CUSTOM_RPC;
  if (customRpc) {
    return customRpc;
  }

  // Use environment variable if set
  const envRpc = process.env.NEXT_PUBLIC_RPC_URL;
  if (envRpc) {
    return envRpc;
  }

  // Fallback to cluster API URL
  return clusterApiUrl(network);
}

export function createConnection(
  network?: SolanaNetwork,
  commitment: Commitment = 'confirmed'
): Connection {
  const selectedNetwork = network || (process.env.NEXT_PUBLIC_SOLANA_NETWORK as SolanaNetwork) || 'devnet';
  const url = getNetworkUrl(selectedNetwork);
  
  return new Connection(url, commitment);
}

export function getExplorerUrl(
  signature: string,
  network?: SolanaNetwork
): string {
  const selectedNetwork = network || (process.env.NEXT_PUBLIC_SOLANA_NETWORK as SolanaNetwork) || 'devnet';
  const cluster = selectedNetwork === 'mainnet-beta' ? '' : `?cluster=${selectedNetwork}`;
  return `https://explorer.solana.com/tx/${signature}${cluster}`;
}

export function getAddressExplorerUrl(
  address: string,
  network?: SolanaNetwork
): string {
  const selectedNetwork = network || (process.env.NEXT_PUBLIC_SOLANA_NETWORK as SolanaNetwork) || 'devnet';
  const cluster = selectedNetwork === 'mainnet-beta' ? '' : `?cluster=${selectedNetwork}`;
  return `https://explorer.solana.com/address/${address}${cluster}`;
}