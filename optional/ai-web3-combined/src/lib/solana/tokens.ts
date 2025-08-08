import { Connection, PublicKey, ParsedAccountData } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, AccountLayout, getMint, getAccount } from '@solana/spl-token';

export interface TokenAccount {
  pubkey: PublicKey;
  mint: PublicKey;
  owner: PublicKey;
  amount: bigint;
  decimals: number;
  uiAmount: number;
}

export interface TokenInfo {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

// Common token list for Solana
export const COMMON_TOKENS: Record<string, TokenInfo> = {
  'So11111111111111111111111111111111111111112': {
    mint: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Solana',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  },
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  },
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': {
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    symbol: 'USDT',
    name: 'Tether',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png',
  },
};

export async function getTokenAccounts(
  connection: Connection,
  owner: PublicKey
): Promise<TokenAccount[]> {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(owner, {
      programId: TOKEN_PROGRAM_ID,
    });

    return tokenAccounts.value.map(({ pubkey, account }) => {
      const parsedInfo = (account.data as ParsedAccountData).parsed.info;
      return {
        pubkey,
        mint: new PublicKey(parsedInfo.mint),
        owner: new PublicKey(parsedInfo.owner),
        amount: BigInt(parsedInfo.tokenAmount.amount),
        decimals: parsedInfo.tokenAmount.decimals,
        uiAmount: parsedInfo.tokenAmount.uiAmount,
      };
    });
  } catch (error) {
    console.error('Error fetching token accounts:', error);
    return [];
  }
}

export async function getTokenBalance(
  connection: Connection,
  tokenAccount: PublicKey
): Promise<bigint> {
  try {
    const account = await getAccount(connection, tokenAccount);
    return account.amount;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return BigInt(0);
  }
}

export async function getTokenDecimals(
  connection: Connection,
  mint: PublicKey
): Promise<number> {
  try {
    const mintInfo = await getMint(connection, mint);
    return mintInfo.decimals;
  } catch (error) {
    console.error('Error fetching token decimals:', error);
    return 0;
  }
}

export function formatTokenAmount(
  amount: bigint | number,
  decimals: number,
  displayDecimals: number = 4
): string {
  const divisor = BigInt(10 ** decimals);
  const quotient = BigInt(amount) / divisor;
  const remainder = BigInt(amount) % divisor;
  
  const wholePart = quotient.toString();
  const fractionalPart = remainder.toString().padStart(decimals, '0').slice(0, displayDecimals);
  
  return fractionalPart === '0'.repeat(displayDecimals)
    ? wholePart
    : `${wholePart}.${fractionalPart.replace(/0+$/, '')}`;
}

export function parseTokenAmount(
  amount: string,
  decimals: number
): bigint {
  const [whole, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  const combinedString = whole + paddedFraction;
  return BigInt(combinedString);
}