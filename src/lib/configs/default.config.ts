import { flatIcon } from "../../../prisma/seed-flat-icon";

export const defaultExpenseCategory = [
  {
    name: "Ăn uống",
    idIcon: flatIcon.food,
    children: [
      { name: "Ăn", idIcon: flatIcon.food },
      { name: "Chợ", idIcon: flatIcon.market },
      { name: "Cà phê", idIcon: flatIcon.coffee },
      { name: "Nhà hàng", idIcon: flatIcon.restaurant },
      { name: "Party", idIcon: flatIcon.party },
    ],
  },
  {
    name: "Xe",
    idIcon: flatIcon.motorbike,
    children: [
      { name: "Xăng xe", idIcon: flatIcon.fuel },
      { name: "Bảo dưỡng", idIcon: flatIcon.maintenance },
      { name: "Xe Khách", idIcon: flatIcon.transport },
      { name: "Grab", idIcon: flatIcon.bus },
    ],
  },
  {
    name: "Mua sắm",
    idIcon: flatIcon.appliances,
    children: [
      { name: "Lặt vặt", idIcon: flatIcon.market },
      { name: "Đồ gia dụng", idIcon: flatIcon.appliances },
    ],
  },
  {
    name: "Gia đình",
    idIcon: flatIcon.family,
    children: [
      { name: "Cha mẹ", idIcon: flatIcon.parent },
      { name: "Người yêu", idIcon: flatIcon.lover },
    ],
  },
  {
    name: "Làm đẹp",
    idIcon: flatIcon.cosmetics,
    children: [
      { name: "Cắt tóc", idIcon: flatIcon.haircut },
      { name: "Mỹ phẩm", idIcon: flatIcon.cosmetics },
      { name: "Outfit", idIcon: flatIcon.outfit },
    ],
  },
  {
    name: "Giải trí",
    idIcon: flatIcon.movies,
    children: [
      { name: "Game", idIcon: flatIcon.games },
      { name: "Phim", idIcon: flatIcon.movies },
    ],
  },
  {
    name: "Hoá đơn",
    idIcon: flatIcon.invoice,
    children: [
      { name: "Điện", idIcon: flatIcon.electricity },
      { name: "Phí Quản lý", idIcon: flatIcon.management },
      { name: "Internet", idIcon: flatIcon.internet },
      { name: "Thuê nhà", idIcon: flatIcon.rent },
    ],
  },
];

export const defaultIncomeCategory = [
  { name: "Lương", idIcon: flatIcon.salary },
  { name: "Thưởng", idIcon: flatIcon.bonus },
  { name: "Lãi", idIcon: flatIcon.profit },
  { name: "Mua bán", idIcon: flatIcon.trading },
];
