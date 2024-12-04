require("dotenv").config();
const {
	createMint,
	getOrCreateAssociatedTokenAccount,
	mintTo,
} = require("@solana/spl-token");

const {
	Keypair,
	Connection,
	clusterApiUrl,
	TOKEN_PROGRAM_ID,
	PublicKey,
} = require("@solana/web3.js");

const payer = Keypair.fromSecretKey(
	Uint8Array.from(JSON.parse(process.env.PRIV_KEY))
);

const mintAuthority = payer;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

async function createMintForToken(payer, mintAuthority) {
	const mint = await createMint(
		connection,
		payer,
		mintAuthority,
		null,
		6,
		TOKEN_PROGRAM_ID
	);

	console.log("Mint created at: ", mint.toBase58());
	return mint;
}

async function mintNewTokens(mint, to, amount) {
	const tokenAccount = await getOrCreateAssociatedTokenAccount(
		connection,
		payer,
		mint,
		new PublicKey(to)
	);

	console.log("Token Account: ", tokenAccount.address.toBase58());

	await mintTo(connection, payer, mint, tokenAccount.address, payer, amount);

	console.log("Minted ", amount, " tokens to ", to);
}

async function main() {
	const mint = await createMintForToken(payer, mintAuthority.publicKey);
	await mintNewTokens(mint, mintAuthority.publicKey, 1000);
}

main();
