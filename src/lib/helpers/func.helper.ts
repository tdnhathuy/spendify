import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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

export const formatTitleDate = (date: string): string => {
  if (dayjs(date, "DD/MM/YYYY").isSame(dayjs(), "day")) {
    return "Today";
  }

  if (dayjs(date, "DD/MM/YYYY").isSame(dayjs().subtract(1, "day"), "day")) {
    return "Yesterday";
  }
  return dayjs(date, "DD/MM/YYYY").format("DD/MM/YYYY");
};

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatOption = <T>(
  object: T | null | undefined,
  keyId: keyof T,
  keyLabel: keyof T
): { id: string; label: string } => {
  if (!object) return { id: "", label: "" };

  return {
    id: object[keyId]?.toString() || "null",
    label: object[keyLabel]?.toString() || "null",
  };
};
