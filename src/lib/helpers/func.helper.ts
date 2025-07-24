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
