export const convertIdFlatIcon = (iconId: string): string => {
  const id = String(iconId);
  let prefix;
  if (id.length <= 3) {
    prefix = id;
  } else {
    prefix = id.slice(0, id.length - 3);
  }
  return `https://cdn-icons-png.flaticon.com/512/${prefix}/${id}.png`;
};

export const compareId = (obj1: any, obj2: any): boolean => {
  return obj1?._id?.toString() === obj2?._id?.toString();
};

export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    signDisplay: "never",
    currencyDisplay: "code",
    currencySign: "accounting",
  })
    .format(amount)
    .replace("VND", "")
    .trim();
};
