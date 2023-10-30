// const { ethers } = require("ethers");

document.addEventListener("DOMContentLoaded", function () {
    //In that we are going to target the elements
    document.getElementById("accountList").addEventListener("click", changeAccount);
    document.getElementById("userAddress").addEventListener("click", copyAddress);
    document.getElementById("transferFund").addEventListener("click", handler);
    document.getElementById("headerNetwork").addEventListener("click", getOpenNetwork);
    document.getElementById("networkItem").addEventListener("click", getSelectedNetwork);
    document.getElementById("addNetwork").addEventListener("click", setNetwork);
    document.getElementById("loginAccount").addEventListener("click", loginUser);
    document.getElementById("accountCreate").addEventListener("click", createUser);
    document.getElementById("openCreate").addEventListener("click", openCreate);
    document.getElementById("signup").addEventListener("click", signup);
    document.getElementById("login").addEventListener("click", login);
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("openTransfer").addEventListener("click", openTransfer);
    document.getElementById("goBack").addEventListener("click", goBack);
    document.getElementById("openImport").addEventListener("click", openImport);
    document.getElementById("goBackImport").addEventListener("click", importGoBack);
    document.getElementById("openAssets").addEventListener("click", openAssets);
    document.getElementById("openActivity").addEventListener("click", openActivity);
    document.getElementById("goHomePage").addEventListener("click", goHomePage);
    document.getElementById("openAccountImport").addEventListener("click", openImportModal);
    document.getElementById("closeImportAccount").addEventListener("click", closeImportModal);
    document.getElementById("addNewToken").addEventListener("click", addToken);
    document.getElementById("addNewAccount").addEventListener("click", addAccount);
})
//State Variable
let providerURL = 'https://polygon-mumbai.g.alchemy.com/v2/cXMqsOUQlC092UTBGQNpbPc70UfpirXV';
let provider;
let privateKey;
let address;

//functions

const handler = () => {
    document.getElementById("transferCenter").style.display = "flex";
    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;
    // const private_key = " 5ec71c3ceb706970cc6ec811b01a79b3192eca86ed872b22cc2fb51b0aec783";
    // const testAccount = "0x5df55Ef1e7fa48Bd50aec83499d8b8571b279487";
    //PROVIDER
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    let wallet = new ethers.Wallet(privateKey, provider);
    const tx = {
        to: address,
        value: ethers.utils.parseEther(amount),
    }
    let a = document.getElementById("link");
    a.href = "somelink url";
    wallet.sendTransaction(tx).then((txObj) => {
        console.log("txHash:", txObj.hash);
        document.getElementById("transferCenter").style.display = "none";
        const a = document.getElementById("link");
        a.href = `https://mumbai.polygonscan.com/tx/${txObj.hash}`;
        a.style.display = "block";
    })
}

const checkBalance = () => {
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    provider.getBalance(address).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance);
        document.getElementById("accountBalance").innerHTML = `${balanceInEth} MATIC`
        document.getElementById("userAddress").innerHTML = `${address.slice(0,15)}...`
    })
}

const getOpenNetwork = () => {
    document.getElementById("network").style.display = "block";
}

const getSelectedNetwork = (e) => {
    const element = document.getElementById("selectedNetwork");
    element.innerHTML = e.target.innerHTML;
    if (e.target.innerHTML === "Ethereum mainnet")
        providerURL = "https://rpc.ankr.com/eth"
    else if (e.target.innerHTML === "Polygon mainnet")
        providerURL = "https://rpc.ankr.com/polygon"
    else if (e.target.innerHTML === "Polygon mumbai")
        providerURL = "https://rpc.ankr.com/polygon_mumbai"
    else if (e.target.innerHTML === "Goerli test network")
        providerURL = "https://rpc.ankr.com/eth_goerli"
    else
        providerURL = "https://rpc.ankr.com/eth_sepolia"
    document.getElementById("network").style.display = "none";
    console.log(providerURL);
}

const setNetwork = () => {
    document.getElementById("network").style.display = "none";
}

const loginUser = () => {
    document.getElementById("createAccount").style.display = "none"
    document.getElementById("loginUser").style.display = "block"
}

const createUser = () => {
    document.getElementById("createAccount").style.display = "block"
    document.getElementById("loginUser").style.display = "none"
}

const openCreate = () => {
    document.getElementById("createAccount").style.display = "none"
    document.getElementById("createPopup").style.display = "block"
}

const signup = () => {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const passwordConfirm = document.getElementById("signupPasswordConfirm").value;
    document.getElementById("field").style.display = "none";
    document.getElementById("center").style.display = "block";
    const wallet = ethers.Wallet.createRandom();
    if (wallet.address) {
        console.log(wallet);
        //API CALL
        const url = "http://localhost:3000/api/v1/user/signup";
        const data = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase,
        };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((result) => {
            document.getElementById("createdAddress").innerHTML = wallet.address;
            document.getElementById("createdPrivateKey").innerHTML = wallet.privateKey;
            document.getElementById("createdMnemonic").innerHTML = wallet.mnemonic.phrase;
            document.getElementById("center").style.display = "none";
            document.getElementById("accountData").style.display = "block";
            document.getElementById("signup").style.display = "none";

            const userWallet = {
                address: wallet.address,
                privateKey: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase
            }
            const jsonObj = JSON.stringify(userWallet);
            localStorage.setItem("userWallet", jsonObj);
            document.getElementById("goHomePage").style.display = "block"
            window.location.reload();
        }).catch((error) => {
            console.log("ERROR:",error)
        })
    }
}

const login = () => {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("center").style.display = "block";
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    //API CALL
    const url = "http://localhost:3000/api/v1/user/login"
    const data = {
        email: email,
        password: password
    }
    // console.log(data);
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => response.json()).then((result) => {
        console.log(result);
        const userWallet = {
            address: result.data.user.address,
            privateKey: result.data.user.privateKey,
            mnemonic: result.data.user.mnemonic,
        }
        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet", jsonObj);
        window.location.reload();
    }).catch((error) => {
        console.log(error)
    })
}

const logout = () => {
    localStorage.removeItem("userWallet");
    window.location.reload();
}

const openTransfer = () => {
    document.getElementById("transferForm").style.display = "block";
    document.getElementById("home").style.display = "none";
}

const goBack = () => {
    document.getElementById("transferForm").style.display = "none";
    document.getElementById("home").style.display = "block";
}

const openImport = () => {
    document.getElementById("importToken").style.display = "block";
    document.getElementById("home").style.display = "none";
}

const importGoBack = () => {
    document.getElementById("importToken").style.display = "none";
    document.getElementById("home").style.display = "block";
}

const openActivity = () => {
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
}

const openAssets = () => {
    document.getElementById("activity").style.display = "none";
    document.getElementById("assets").style.display = "block";
}

const goHomePage = () => {
    document.getElementById("createPopup").style.display = "none";
    document.getElementById("home").style.display = "block";
}

const openImportModal = () => {
    document.getElementById("importAccount").style.display = "block";
    document.getElementById("home").style.display = "none";
}

const closeImportModal = () => {
    document.getElementById("importAccount").style.display = "none";
    document.getElementById("home").style.display = "block";
}

const addToken = () => {
    const address = document.getElementById("tokenAddress").value;
    const name = document.getElementById("tokenName").value;
    const symbol = document.getElementById("tokenSymbol").value;
    //API CALL

    const url = 'http://localhost:3000/api/v1/tokens/createtoken'
    const data = {
        name: name,
        address: address,
        symbol: symbol,
    };
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()).then((result) => {
        console.log(result);
        window.location.reload();
    }).catch((error) => {
        console.log(error);
    })
}

const addAccount = () => {
    const privateKey = document.getElementById("addAccountPrivateKey").value;
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    let wallet = new ethers.Wallet(privateKey, provider);
    console.log(wallet);
    const url = "http://localhost:3000/api/v1/account/createaccount";
    const data = {
        privateKey: privateKey,
        address: wallet.address,
    }
    // console.log(data);
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error);
    })
}

const mainFunction = () => {
    const str = localStorage.getItem("userWallet");
    const parsedObj = JSON.parse(str);
    if (parsedObj?.address) {
        document.getElementById("loginUser").style.display = "none";
        document.getElementById("home").style.display = "block";
        privateKey = parsedObj.privateKey;
        address = parsedObj.address;
        checkBalance(parsedObj.address);
    }
    const tokenRender = document.querySelector(".assets");
    const accountRender = document.getElementById("accountList");
    const url = "http://localhost:3000/api/v1/tokens/alltoken";
    fetch(url).then((response) => (response.json())).then((data) => {
        let elements = "";
        data.data.tokens.map((token) => (
            elements += `<div class="assetsItem">
            <img class="assetsItemImg" src="./assets/theBlockchainCoders.png" alt=""/>
            <span>${token.address.slice(0,15)}...</span>
            <span>${token.symbol}</span>
            </div>`
        ))
        tokenRender.innerHTML = elements;
    }).catch((error) => {
        console.log(error);
    })

    fetch("http://localhost:3000/api/v1/account/allaccount").then((response) => (response.json())).then((data) => {
        let accounts = "";
        data.data.accounts.map((account, i) => (
            accounts += `<div class="lists">
            <p>${i+1}</p>
            <p class="accountValue" data-address=${account.address} data-privateKey=${account.privateKey}>${account.address.slice(0,25)}...</p>
            </div>`
        ))
        accountRender.innerHTML = accounts;
    }).catch((error) => {
        console.log(error);
    })
    console.log(privateKey);
}

const copyAddress = () => {
    navigator.clipboard.writeText(address);
}

const changeAccount = () => {
    const data = document.querySelector(".accountValue");
    const address = data.getAttribute("data-address");
    const privateKey = data.getAttribute("data-privateKey");
    console.log(address, privateKey);
    const userWallet = {
        address: address,
        privateKey: privateKey,
        mnemonic: "Changed",
    }
    const jsonObj = JSON.stringify(userWallet);
    checkBalance();
    localStorage.setItem("userWallet", jsonObj);
    window.location.reload();
}

window.onload = mainFunction;