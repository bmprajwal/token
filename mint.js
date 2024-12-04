require('dotenv').config()
const {createMint} = require("@solana/spl-token")
const {Connection, Keypair, clusterApiUrl, TOKEN_PROGRAM_ID} = require("@solana/web3.js")

const payer = Keypair.fromSecretKey(
	Uint8Array.from(JSON.parse(process.env.PRIV_KEY))
);

const mintAuthority = payer;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

async function createMintForToken(payer, mintAuthority) {
  const mint = await createMint(
    connection,
    payer,
    mintAuthority,
    null,
    6,
    TOKEN_PROGRAM_ID
  )
  console.log("Mint created at: ", mint.toBase58());
  console.log("Payer: ", payer.publicKey.toBase58());
  return mint;
}

async function main(){
  const mint = await createMintForToken(payer, mintAuthority.publicKey);
}

main()