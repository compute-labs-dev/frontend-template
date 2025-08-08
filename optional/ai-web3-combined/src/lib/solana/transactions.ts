import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Signer,
  ConfirmOptions,
  TransactionSignature,
  SimulatedTransactionResponse,
  RpcResponseAndContext,
} from '@solana/web3.js';

export interface TransactionResult {
  signature: string;
  success: boolean;
  error?: string;
}

export async function simulateTransaction(
  connection: Connection,
  transaction: Transaction,
  signers: Signer[]
): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
  try {
    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = signers[0].publicKey;

    // Simulate
    return await connection.simulateTransaction(transaction, signers);
  } catch (error) {
    console.error('Transaction simulation failed:', error);
    throw error;
  }
}

export async function sendTransaction(
  connection: Connection,
  transaction: Transaction,
  signers: Signer[],
  options?: ConfirmOptions
): Promise<TransactionResult> {
  try {
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      signers,
      options || { commitment: 'confirmed' }
    );

    return {
      signature,
      success: true,
    };
  } catch (error) {
    console.error('Transaction failed:', error);
    return {
      signature: '',
      success: false,
      error: error instanceof Error ? error.message : 'Transaction failed',
    };
  }
}

export async function getTransactionFee(
  connection: Connection,
  transaction: Transaction,
  feePayer: PublicKey
): Promise<number> {
  try {
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = feePayer;

    const fee = await connection.getFeeForMessage(
      transaction.compileMessage(),
      'confirmed'
    );

    return fee.value || 5000; // Default to 5000 lamports if fee calculation fails
  } catch (error) {
    console.error('Error calculating transaction fee:', error);
    return 5000; // Default fee
  }
}

export async function confirmTransaction(
  connection: Connection,
  signature: TransactionSignature,
  commitment: 'processed' | 'confirmed' | 'finalized' = 'confirmed'
): Promise<boolean> {
  try {
    const latestBlockhash = await connection.getLatestBlockhash();
    const confirmation = await connection.confirmTransaction(
      {
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      },
      commitment
    );

    return !confirmation.value.err;
  } catch (error) {
    console.error('Error confirming transaction:', error);
    return false;
  }
}

export function createMemoInstruction(
  memo: string,
  signer: PublicKey
): TransactionInstruction {
  const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
  
  return new TransactionInstruction({
    keys: [{ pubkey: signer, isSigner: true, isWritable: false }],
    programId: MEMO_PROGRAM_ID,
    data: Buffer.from(memo, 'utf-8'),
  });
}

export async function getTransactionDetails(
  connection: Connection,
  signature: string
) {
  try {
    const transaction = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });
    
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return {
      signature,
      slot: transaction.slot,
      timestamp: transaction.blockTime,
      fee: transaction.meta?.fee,
      status: transaction.meta?.err ? 'failed' : 'success',
      instructions: transaction.transaction.message.instructions,
    };
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw error;
  }
}

export function shortenSignature(signature: string, chars: number = 4): string {
  return `${signature.slice(0, chars)}...${signature.slice(-chars)}`;
}

export function shortenAddress(address: string, chars: number = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}