import Web3 from 'web3';


let web3;
let account;
let dexContract;
let tokenContract;
let balance;
let tokenPrice;

let events = [];

function getWeb3() {
  return new Promise(async (resolve, reject) => {
    console.log('Loading web3');
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      console.log('Injected web3 detected.');
      resolve(web3);
    }
    // Fallback to localhost; use dev console port by default...
    else {
      reject(new Error('Please install metamask.'));
    }
  });
}

async function setupWeb3() {
  try {
    web3 = await getWeb3();

    balance = web3.utils.fromWei(b);
    return {
      web3,
      balance,
    };
  } catch (error) {
    console.log(error);
    let metamaskError = '';
    if (error.code === -32002) {
      metamaskError = 'Please open metamask and accept the connection request.';
    } else if (error.code === 4001) {
      metamaskError = 'User canceled the connection request.';
    } else {
      metamaskError = 'Something went wrong.';
    }
    throw new Error(metamaskError);
  }
}


function getEvents() {
  return events;
}

export { setupWeb3 };