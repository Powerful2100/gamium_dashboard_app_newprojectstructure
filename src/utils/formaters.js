class NumberFormater {
    static numberWithCommas(x) {
        if (Number(x) > 1) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return x;
        }
    }

    static fancyNumber(x) {
        if (x !== null && x !== undefined) {
            if (!x) {
                return "0";
            }
            if (Number(x) < 0.0001) {
                return "< 0.0001";
            } else {
                x = x.toFixed(x >= 1 ? 0 : 4);
                return NumberFormater.numberWithCommas(x);
            }
        } else {
            return "N/A";
        }
    }
}

export function shortWeb3Acount(currentAccount) {
    if(currentAccount){
        return currentAccount.slice(0, 6).concat("...").concat(currentAccount.slice(currentAccount.length - 4, currentAccount.length));
    } else  {
        return false
    }
  }
  
export function shortWeb3Address(currentAccount, length = 4) {
    if(currentAccount){
        return currentAccount.slice(0, 2 + length).concat("...").concat(currentAccount.slice(currentAccount.length - length, currentAccount.length));
    } else {
        return false
    }
}

export default NumberFormater;