


export const handlePercentDiscount = (temps) => {
  const newList = temps.map((temp) => {
    const percentDiscount =
      100 - Math.round((temp.salePrice * 100) / temp.price);
    return { ...temp, percentDiscount: percentDiscount };
  });
  return newList;
};

export const hotSale = (temps) => {
  const results = temps.filter(item => item.percentDiscount >= 10)
  return results
}

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("vi");
  return formatter.format(price);
};

export const getFirstCharacterUser = (name) => {
  const arrCharacter = name ? name.split("")[0] : '';
  return arrCharacter;
};

export const formatDateOrderPaypal = (timestamp) => {
  const d = new Date(timestamp);
  const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
  return date;
};

export const changePriceUsa = (price) => {
  const temp = Math.floor(price /120000)
  const formatter = new Intl.NumberFormat('en-US')
  return formatter.format(temp); 
}