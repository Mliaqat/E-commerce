export const NavData = [
  {
    id: 1,
    name: "Conitnue As Guest",
    guard: "guest",
    link: "/store",
  },
  {
    id: 2,
    name: "Home",
    guard: "both",
    link: "/",
  },
  {
    id: 3,
    name: "Store",
    guard: "both",
    link: "/store",
  },
  {
    id: 4,
    name: "Frequently Ask Question",
    guard: "both",
    link: "/frequently-asked-question",
  },
  {
    id: 5,
    name: "Contact Us",
    guard: "both",
    link: "/contact-us",
  },
  { id: 7, name: "Login", link: "/login", guard: "guest" },
  { id: 9, name: "History", link: "/history", guard: "auth" },
  { id: 8, name: "Log out", link: "/login", guard: "auth" },
];
export const AdminNAvData = [
  {
    id: 1,
    name: "Home",
    guard: "both",
    link: "/",
  },
  {
    id: 2,
    name: "Product History",
    link: "/product-history",
  },
  {
    id: 3,
    name: "Order History",
    link: "/order-history",
  },
  { id: 4, name: "Log out", link: "/login", guard: "auth" },
];
