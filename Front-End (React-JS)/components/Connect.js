import {
    useEtherBalance,
    useEthers , useNotifications } from "@usedapp/core";
  import { formatEther } from "@ethersproject/units";
  import {useEffect} from "react"
  import Button from '@mui/material/Button';
  import Slider from '@mui/material/Slider';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import React, { useState } from 'react';
  import ChainCall from "./chaincalls.js"
  import useChainUpdate from "./chainUpdate"
  import { utils } from 'ethers'
  import { Alert, snackbarClasses } from "@mui/material";
  import { CircularProgress , Snackbar } from "@mui/material";

function valuetext(value) {
  return `${value}Eth`;
}




  function Connect() {
    const {notifications} = useNotifications()

  const [selectedVal, setSelected_Val] = useState(0);
  const [selectedVal1,setSelected_Val1]= useState(0);
  const [selectedVal2,setSelected_Val2]= useState(0);
  const { activateBrowserWallet, account , deactivate } = useEthers();
  const isConnected = account !== undefined
  const etherBalance = useEtherBalance(account);
  const tempeth = etherBalance

  let temp_account1= account;
  let temp_account2= account;
  let temp_account3= account;
  let staked_bal = ChainCall("viewStakedBal",temp_account1);
  let staking_reward = ChainCall("realTimeReward",temp_account2);
  let totalAccumulatedReward = ChainCall("realTimeTotalReward",temp_account3);

  let child = 0;
    let parent = 0;

 
  const {state:stakestate,send:stake} = useChainUpdate("stake");
  const {state:unstakestate,send:unstake} = useChainUpdate("unstake");
  const {state:widthdrawstate,send:withdraw} = useChainUpdate("withdrawRewards");
  const [isStaked, setIsStaked] = useState(false);
  const [isUnStaked, setIsUnStaked] = useState(false);
  const [isWithdrawn, setisWithdrawn] = useState(false);

  
  useEffect( () =>{
      if (notifications.filter(
        (notification) =>
      notification.type ==="transactionSucceed" &&
      notification.transactionName==="stake").length>0){
        setIsStaked (true)
      }
      if (notifications.filter(
        (notification) =>
      notification.type ==="transactionSucceed" &&
      notification.transactionName==="unstake").length>0){
        setIsUnStaked(true);
      }
      if (notifications.filter(
        (notification) =>
      notification.type ==="transactionSucceed" &&
      notification.transactionName==="withdrawRewards").length>0){
        setisWithdrawn(true);
      }

  },[notifications,isStaked,isUnStaked])


  
  const isStakingInProgress = stakestate.status =="Mining"
  const isUnStakingInProgress = unstakestate.status =="Mining"
  const isWithdrawlInProgress = widthdrawstate.status =="Mining"

  const handleCloseStake = () =>{
    setIsStaked (false)
  }
  const handleCloseUnstake = () =>{
    setIsUnStaked (false)
  }
  const handleCloseWithdraw = () =>{
    setisWithdrawn (false)
  }

 const handleStake = (val) =>{
   if(val){
  stake({value: utils.parseEther(val)});

        }
  }
  const handleUnStake = (val) =>{
    if (val >0){
    unstake(utils.parseEther(val));}

  }

  const handleWithdraw = (val) =>{
    if (val >0){
      withdraw(utils.parseEther(val));}
  }
    
  const getParent = (val) =>{
    parent = document.getElementById("slider3")
    child = parent.lastElementChild
    setSelected_Val2 (child.innerText)
  }
  const getchild = (val) =>{
    child = val;
  }
  
  let Balance = 1;
  tempeth?Balance = formatEther(tempeth)-0.01:Balance = 0
   
    return (
        <div className="main">
   
          {isConnected ? (

          <div className = "disconnect">
            <Button  variant="contained"  onClick={() => deactivate() }>Disconnect Your Wallet </Button>
          </div>
          
          ) 
          : (
          <div className = "connect">
            <Button  variant="contained" onClick={()=>activateBrowserWallet()}>Connect Your Wallet</Button>
          </div>
          ) 
        }
  <div>
  </div>
          {isConnected ? (
                        <div className ='DisplayAcc'>
                          <h2>Account Information</h2>
                        {account && <p>Account: {account.substring(0,25)}.....</p>}
                        {etherBalance && <p>Balance: {Number(formatEther(etherBalance)).toFixed(5)} Eth</p>}
                        </div>
          )
          :(<div></div>)}
  

            <div className="nouse">
            </div>
            <div className ="transfer">

            <div className="mid"></div>

                <div className="left">
                <h4 className="header_flex">STAKING/UNSTAKING </h4>
                        <Snackbar
open={isStaked}
autoHideDuration={6000}
onClose={handleCloseStake}
>
<Alert onClose={handleCloseStake} severity="success">
Your Funds Have Been Staked Successfully!!!
</Alert>

</Snackbar>

<Snackbar
open={isUnStaked}
autoHideDuration={6000}
onClose={handleCloseUnstake}
>
<Alert onClose={handleCloseUnstake} severity="success">
Your Funds Have Been Un-Staked Successfully. Please Check Your Wallet
</Alert>

</Snackbar>


<Snackbar
open={isWithdrawn}
autoHideDuration={6000}
onClose={handleCloseWithdraw}
>
<Alert onClose={handleCloseWithdraw} severity="success">
Rewards Transferred Successfully. Please Check Your Wallet
</Alert>

</Snackbar>


        
              
                  <div className = 'slider'>

               {isConnected ?  (
               

               
               <Box className = "box">
                  
                  <Slider
                  aria-label="Custom marks"
                  defaultValue={Number(document.getElementsByClassName("MuiSlider-valueLabelLabel")[0].innerHTML).toFixed(3)/2}
                  valueLabelDisplay="on"
                  getAriaValueText={valuetext}
                  step={0.05}
                  min={0.0}
                  onClick = {()=> setSelected_Val(Number(document.getElementsByClassName("MuiSlider-valueLabelLabel")[0].innerHTML).toFixed(3))}

                  onChange={()=> setSelected_Val(Number(document.getElementsByClassName("MuiSlider-valueLabelLabel")[0].innerHTML).toFixed(3)
                  )}
                  max={Number(Balance).toFixed(2)>0?Number(Balance).toFixed(2):0}
                />
                  <Typography id="input-slider" gutterBottom>
                    Amount to be staked : {selectedVal} Eth
                  </Typography>
                <p className="para"> Staked Balance : {staked_bal?Number(formatEther(staked_bal)).toFixed(3):0} Eth</p>
               
     
                     <Button variant="contained" size="Large" onClick={() => handleStake(selectedVal)} disabled={isStakingInProgress} className="button" color="primary" >{isStakingInProgress?(<CircularProgress size={25}></CircularProgress>): <div>Stake Funds</div>} </Button>
                

                     {staked_bal>0? (
                     <div>
                     <Slider
                  aria-label="Custom marks"
                  defaultValue={0}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  step={0.01}
                  min={0.0}
                  onClick = {()=> setSelected_Val1(Number(document.getElementsByClassName("MuiSlider-valueLabelLabel")[1].innerHTML).toFixed(3)
                  )}
                  onChange={()=> setSelected_Val1(Number(document.getElementsByClassName("MuiSlider-valueLabelLabel")[1].innerHTML).toFixed(3)
                  )}
                  max={Number(formatEther(staked_bal)).toFixed(2)}
                />

                  <Typography id="input-slider" gutterBottom>
                    Amount to be Unstaked : {selectedVal1} Eth
                  </Typography>
                  <Button variant="contained" size="Large" onClick={() => handleUnStake(selectedVal1)}
                   disabled = {isUnStakingInProgress}  className="button" color="primary">
                      {isUnStakingInProgress?(<CircularProgress size={25}></CircularProgress>)
                      : <div>UnStake Funds</div>} </Button>
                  </div>
                     ):
                     (<div></div>)}
                
              </Box> 
               )
              
              
              : (
              
               
                <Box sx={{ width: 450 }}>
                    
                <Slider
                aria-label="Custom marks" 
                defaultValue={0.01}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                step={0.1}
                min={0.0}
              
                max={0.1}
                disabled
              />
            </Box> )
             }
                  </div>
                  {isConnected?(
                <div>
                  </div>
                     
                  ): <p>Please Connect The Wallet To Stake Funds.</p>
                  
                  }
                </div>
               
          
                <div className="mid"></div>
              <div className="right">
              <h4 className="header_flex">WITHDRAW REWARDS </h4>
                
                <div className = 'slider1'>

             {isConnected ?  (
             
             <Box className = "box2">
         
            
                
             
              <p className="para1">  Available Reward: {staking_reward?Number(formatEther(staking_reward)).toFixed(3):0} DeFi Tokens</p>

              <p className="para1">  Total Reward Accumulated: {totalAccumulatedReward?Number(formatEther(totalAccumulatedReward)).toFixed(2):0} DeFi Tokens</p>

              <p className="para1"> Current Reward Rate: {staked_bal?Number(formatEther(staked_bal)).toFixed(2):0}  Tokens/Minute</p>
             
                {staking_reward>0?(
            <div>
              <Slider
                id ="slider3"
                aria-label="Custom marks"
                defaultValue={0}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                step={0.05}
                min={0.0}
                onClick = {()=> getParent()}
                onChange={()=> getParent()} 
                max={staking_reward?Number(formatEther(staking_reward)).toFixed(3):0}
              />
              
              <Typography id="input-slider" gutterBottom>
                  DeFi tokens to withdraw : {selectedVal2} 
                </Typography>

                <div>
                   <Button variant="contained" size="Large" onClick={()=> handleWithdraw(selectedVal2)} disabled = {isWithdrawlInProgress} className="button" color = "primary"> {isWithdrawlInProgress?(<CircularProgress size={25}></CircularProgress>): <div>Withdraw Rewards</div>} </Button>
                  
                   </div>

                <br></br>
                </div>
                ):
                <div>
                  <div>
                   <Button variant="" size="Large"  id="button" color = "warning">Withdraw Rewards </Button>
                  
                   </div>
                  </div>}
            </Box> 
             )
            
            
            : (
            
             
              <Box sx={{ width: 450 }}>
                  
              <Slider
              aria-label="Custom marks" 
              defaultValue={0.01}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              step={0.1}
              min={0.0}
            
              max={10}
              disabled
            />
          </Box> )
           }
                </div>
                {isConnected?(
                  <div>
                  
                   </div>
                ): <p>Please Connect The Wallet To Stake Funds.</p>
                
                }
             
              </div>

              

                
            </div>
            

            </div>
    );
  }
  export default Connect
