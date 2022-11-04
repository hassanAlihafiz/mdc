import store from 'epics/store'
import moment from "moment";

export const asPrice = (priceNumber) => {
  const state = store.getState()

  if (priceNumber == null) return "";
  if (isNaN(priceNumber)) return priceNumber;
  priceNumber = priceNumber*state.common.currency.rate;
  priceNumber = (priceNumber * 1).toFixed(2);
  priceNumber = priceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  priceNumber = (state.common.currency.place==1?state.common.currency.symbol:'')+
    priceNumber+
    (state.common.currency.place==2?state.common.currency.symbol:'');
  return priceNumber
};

export const asLocalPrice = (priceNumber) => {
  const state = store.getState()

  if (priceNumber == null) return "";
  if (isNaN(priceNumber)) return priceNumber;
  priceNumber = (priceNumber * 1).toFixed(2);
  priceNumber = priceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  priceNumber = (state.common.currency.place==1?state.common.currency.symbol:'')+
    priceNumber+
    (state.common.currency.place==2?state.common.currency.symbol:'')
  return priceNumber
};

export const asUsdPrice = (priceNumber) => {
  if (priceNumber == null) return "";
  if (isNaN(priceNumber)) return priceNumber;
  priceNumber = (priceNumber * 1).toFixed(2);
  priceNumber = priceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  priceNumber = '$'+
    priceNumber
  return priceNumber
};

export const asNumber = (number) => {
  if (number == null) return "";
  if (isNaN(number)) return number;
  return (number * 1).toLocaleString();
};

export const asPercent = (number) => {
  if (number == null) return "";
  if (isNaN(number)) return number;
  return (number * 100).toFixed(2) + "%";
};

export const asDate = (date) => {
  if (date == null) return "";
  return moment(date).format("MM/DD/YY");
};

export const asDateTime = (x) => {
  var date = moment(x);
  if (!date.isValid()) return x;

  if (x.includes("T")) {
    let d = new Date(x).toLocaleString();
    let splittedDate = d.split(":");
    let formattedDate =
      splittedDate[0] + ":" + splittedDate[1] + splittedDate[2].slice(2);
    return formattedDate.replace(",", "");
  } else {
    let d_ = x.replace(" ", "T") + ".000000Z";
    let d = new Date(d_).toLocaleString();
    let splittedDate = d.split(":");
    let formattedDate =
      splittedDate[0] + ":" + splittedDate[1] + splittedDate[2].slice(2);
    return formattedDate.replace(",", "");
  }
};
