import React, { useState } from "react";
// import ethers library 
import { ethers } from "ethers";
// import reward token ABI
import ERC20ABI from "./ERC20ABI";
// import staking contract ABI
import StakingABI from "./StakingABI";
// import a notifier library
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StakingForm = () => {

  // set states for our staking form
  const [amount, setAmount] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState("idle");
  const [stakingStatus, setStakingStatus] = useState("idle");

  // create a function to handle input 
  const handleAmount = (event) => {
    event.preventDefault();
    setAmount(event.target.value);
  };

  // store staked token address
  const contractAddress = "0xe2a28aAC42Cf71BA802fc6bb715189b0A89B348a";
  // store staking contract address
  const stakingContractAddress = "0x2EAab956079E8CD97947C2d39A47D5374c83DF6B";

  // create a function "approveToken" to approve our token for spending
  async function approveToken() {
    try {
      setApprovalStatus("approving");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const ERC20 = new ethers.Contract(contractAddress, ERC20ABI, signer);

      // Approve tokens for spending
      const approveERC20 = await ERC20.approve(stakingContractAddress, amount);
      await approveERC20.wait();

      setApprovalStatus("approved");
      toast.success("Approval Successful");
    } catch (error) {
      console.log(error);
      setApprovalStatus("error");
      toast.error("Approval failed");
    }
  }

  // create a function for to stake token
  async function stakeToken() {
    try {
      setStakingStatus("staking");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const stakingContract = new ethers.Contract(
        stakingContractAddress,
        StakingABI,
        signer
      );

      // Stake tokens
      const stake = await stakingContract.stake(amount);
      await stake.wait();
      console.log(stake);

      setStakingStatus("staked");
      toast.success("Staking Successful");
    } catch (error) {
      console.log(error);
      setStakingStatus("error");
      toast.error("Staking failed");
    }
  }

  // create a function "getReward" to help get rewards of staked token
  async function getReward() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const stakingContract = new ethers.Contract(
        stakingContractAddress,
        StakingABI,
        signer
      );
      const getReward = await stakingContract.getReward();
      await getReward.wait();
      toast.success("Get Reward Success");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          <form className="bg-white rounded px-4 md:px-8 pt-6 pb-8 mb-4 shadow-md mx-2 md:mx-auto">
            <h2 className="text-extra-large font-bold my-4 text-center">
              Stake <span className="text-[#6837cf] mt-4">$BoredPepe</span>
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2 mt-2"
                htmlFor="amount"
              >
                Enter Amount To Stake:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                id="amount"
                type="number"
                placeholder="Enter amount to stake ($BoredPepe)"
                onChange={handleAmount}
              />
            </div>
            <div className="flex items-center justify-center">
              {approvalStatus === "approved" ? (
                <button
                  className="bg-[#6837cf] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={stakeToken}
                >
                  {stakingStatus === "staking" ? "Staking..." : "Stake Token"}
                </button>
              ) : (
                <button
                  className="bg-[#6837cf] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={approveToken}
                >
                  {approvalStatus === "approving"
                    ? "Approving..."
                    : "Approve Token"}
                </button>
              )}
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-[#C7E3E1] text-grey-100 font-bold py-2 px-4 rounded"
          onClick={getReward}
        >
          Claim Rewards
        </button>
      </div>
    </>
  );
};

export default StakingForm;
