from brownie import accounts,DeFiContract,network
import os
import time


def main():
    account = accounts.add(os.getenv("PRIVATE_KEY"))
    contract_OBJECT = DeFiContract.deploy({"from":account},publish_source = True)
    print(contract_OBJECT)
    