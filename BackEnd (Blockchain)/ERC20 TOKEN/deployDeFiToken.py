from brownie import accounts,DeFiToken,network
import os
import time


def main():
    initial_supply = 100000000 #100 Million tokens
    account = accounts.add(os.getenv("PRIVATE_KEY"))
    token_object = DeFiToken.deploy(initial_supply,{"from":account},publish_source = True)
    