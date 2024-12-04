const {Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet") , "confirmed");

async function airdrop(publicKey, amount){
  const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
  await connection.confirmTransaction({signature: airdropSignature});
}

airdrop("91yexJy4474GSw3R6nY45FQbTFKkurjGqXHUqUF73GDf", LAMPORTS_PER_SOL).then((signature)=> {
  console.log("AirDrop Signature: ", signature);
})