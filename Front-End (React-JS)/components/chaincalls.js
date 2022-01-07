
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import contractAbi from "../contractAbi/abi.json";
const contractInterface = new ethers.utils.Interface(contractAbi);
const contractAddress = "0xdCADFdF24C15ADAcd40bCFb52923De5dbd36b843";

 function ChainCall(functionName,address) {
  const [returnVal]= useContractCall({
    abi: contractInterface,
    address: contractAddress,
    method: functionName,
    args: [address],
  }) ?? [];
  return returnVal;
}

export default ChainCall;