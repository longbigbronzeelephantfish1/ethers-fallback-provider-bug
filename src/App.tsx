import { JsonRpcProvider } from "ethers";
import { FallbackProvider } from "ethers";
import { Contract } from "ethers";

function App() {
  const clickMe = async () => {
    // let's create 5 providers for bsc mainnet
    const providers = [
      "https://rpc.ankr.com/bsc",
      "https://bsc.blockpi.network/v1/rpc/public",
      "https://bsc-rpc.publicnode.com",
      "https://1rpc.io/bnb",
      "https://bsc.drpc.org",
    ];

    const provider1 = new JsonRpcProvider(providers[0]);
    const provider2 = new JsonRpcProvider(providers[1]);
    const provider3 = new JsonRpcProvider(providers[2]);
    const provider4 = new JsonRpcProvider(providers[3]);
    const provider5 = new JsonRpcProvider(providers[4]);

    // let's call different providers different number of times to throw the id off
    await provider1.getBlockNumber();

    await provider2.getBlockNumber();
    await provider2.getBlockNumber();

    await provider3.getBlockNumber();
    await provider3.getBlockNumber();
    await provider3.getBlockNumber();

    await provider4.getBlockNumber();
    await provider4.getBlockNumber();
    await provider4.getBlockNumber();
    await provider4.getBlockNumber();

    await provider5.getBlockNumber();
    await provider5.getBlockNumber();
    await provider5.getBlockNumber();
    await provider5.getBlockNumber();
    await provider5.getBlockNumber();

    // now we create a fallback provider with all the providers
    const fallbackProvider = new FallbackProvider([
      provider1,
      provider2,
      provider3,
      provider4,
      provider5,
    ]);

    // abi of a ERC20 contract
    // totalSupply is valid so it will return a value
    // hello doesn't exist so it will throw a call exception
    const abi = [
      "function totalSupply() view returns (uint256)",
      "function hello() view returns (uint256)",
    ];

    // BUSD contract on bsc mainnet
    const contract = new Contract(
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      abi,
      fallbackProvider
    );

    // totalSupply will return us the value correctly
    const firstResult = await contract
      .getFunction("totalSupply")
      .staticCallResult();
    console.log(firstResult);

    // hello will throw a quorum not met error
    const secondResult = await contract.getFunction("hello").staticCallResult();
    console.log(secondResult);
  };

  return <button onClick={clickMe}>Click Me</button>;
}

export default App;
