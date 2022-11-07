import {ethers} from "ethers";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const flag = await provider.getStorageAt(
    "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab",
    1
  );
  console.log(`Got Flag: ${ethers.utils.toUtf8String(flag)}`);
}

main();
