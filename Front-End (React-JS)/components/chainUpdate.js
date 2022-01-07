import { ethers } from "ethers";
import { useContractFunction  } from "@usedapp/core";
import contractAbi from "../contractAbi/abi.json";
import { Contract } from "@ethersproject/contracts";


  
const contractInterface = new ethers.utils.Interface(contractAbi);
const contractAddress = "0xdCADFdF24C15ADAcd40bCFb52923De5dbd36b843";
const contract = new Contract(contractAddress, contractInterface);


export function useChainUpdate(methodName) {
  
  const { state, send } = useContractFunction(contract,methodName,{transactionName:methodName});
  return { state, send };
}

export default useChainUpdate;