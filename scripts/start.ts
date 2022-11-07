import {JsonRpcProvider} from "@ethersproject/providers";
import Ganache from "ganache";
import {Wallet, ethers} from "ethers";
import NotSoPrivate from "../artifacts/contracts/NotSoPrivate.sol/NotSoPrivate.json";

async function main() {
  await ganache();
}

async function ganache() {
  const server = Ganache.server({
    wallet: {
      deterministic: true,
    },
    logging: {
      quiet: true,
    },
    miner: {
      blockTime: 2
    }
  });
  server.listen(8545, async (err) => {
    if (err) throw err;

    console.log(`ganache listening on port 8545...`);
    const ethersProvider = new JsonRpcProvider("http://127.0.0.1:8545");
    const accounts = await server.provider.getInitialAccounts();

    const deployer = new Wallet(
      accounts[Object.keys(accounts)[0]].secretKey
    ).connect(ethersProvider);
    const notSoPrivateFactory = new ethers.ContractFactory(
      NotSoPrivate.abi,
      NotSoPrivate.bytecode
    );
    const notSoPrivateContract = await notSoPrivateFactory
      .connect(deployer)
      .deploy("HV22{Ch41nS_ar3_Publ1C}");

    console.log("\r\n\r\nAvailable Accounts\r\n");
    for (const account in accounts) {
      console.log(
        `${account} (${ethers.utils.formatEther(
          accounts[account].balance
        )} ETH)`
      );
    }

    console.log("\r\n\r\nPrivate Keys Accounts \r\n");
    for (const account in accounts) {
      console.log(
        `${account} (${accounts[account].secretKey})`
      );
    }

    console.log(`\r\nNotSoPrivate address: ${notSoPrivateContract.address}\r\n`);
    console.log("Ready!");
  });
}

main();
