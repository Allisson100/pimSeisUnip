import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

const MenuList = () => {
  const menuList = [
    {
      name: "Home",
      icon: "ion:home-outline",
      permission: ["atendente", "estoquista", "supervisor"],
      path: "/",
    },
    {
      name: "Produtos",
      icon: "dashicons:games",
      permission: ["atendente", "estoquista", "supervisor"],
      path: "/products",
    },
    {
      name: "Clientes",
      icon: "lucide:users-round",
      permission: ["atendente", "supervisor"],
      path: "/clients",
    },
    {
      name: "Funcionários",
      icon: "ci:users-group",
      permission: ["supervisor"],
      path: "/employees",
    },
    {
      name: "Financeiro",
      icon: "grommet-icons:money",
      permission: ["financeiro", "supervisor"],
      path: "/financial",
    },
    {
      name: "ADM",
      icon: "ri:admin-line",
      permission: ["supervisor"],
      path: "/adm",
    },
    {
      name: "Perfil",
      icon: "gg:profile",
      permission: ["supervisor"],
      path: "/profile",
    },
    {
      name: "Carrinho",
      icon: "mdi:cart",
      permission: ["atendente", "supervisor"],
      path: "/cart",
    },
  ];

  const { userDatas } = useContext(AuthContext);
  const { pathname } = useLocation();

  return (
    <List sx={{ paddingTop: 0 }}>
      {menuList
        .filter((item) =>
          userDatas?.permissionPaths?.endpoints?.frontMenu?.includes(item?.path)
        )
        .map((item, index) => (
          <Link
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
            key={index}
          >
            <ListItem
              disablePadding
              sx={{ backgroundColor: pathname === item.path && "#f0eeee" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon={item.icon} width={22} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
    </List>
  );
};

export default MenuList;
