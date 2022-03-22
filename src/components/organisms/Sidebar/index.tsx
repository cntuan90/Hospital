import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { SidebarMenu } from "./type";
import SidebarItem from "./SidebarItem";
import useStyles from "./styles";
import { List } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import { Box } from "@mui/system";
import PillButton from "../../atoms/Buttons/PillButton";
import { Store } from "../../../redux/store";
import useAuth from "../../../hooks/useAuth";
import { getLocalStorage } from "../../../utility/browserStorageUtil";

export default React.memo(() => {
  const classes = useStyles();
  const userType = getLocalStorage('userType') || '0';

  // const companyCode = '';
  // const [companyName, setCompanyName] = useState<string>('');
  // const mediumSizeIcon = {
  //   width: '36px',
  //   height: '36px',
  // };
  const { signout } = useAuth();

  // const { drawerState } = useSelector((reduxState: Store) => reduxState.auth);
  // const dispatch = useDispatch();

  // const handleCloseOpenClick = () => {
  //   dispatch(setDrawerStateRedux(!drawerState));
  // };

  const sidebarItems: SidebarMenu[] = userType === '0' ? [
    {
      title: "当直表",
      accessible: true,
      link: "/shiftBoard",
    },
    {
      title: "設定",
      accessible: true,
      link: "/staffSetting",
    },
  ] : [
    {
      title: "当直表管理",
      accessible: true,
      link: '/shiftBoardManagement',
    },
    {
      title: "スタッフ管理",
      accessible: true,
      link: "/staffManagement",
    },
    {
      title: "設定",
      accessible: true,
      link: "/adminSetting",
    },
  ];

  return (
    <Box className={classes.toolbar}>
      <Box>
        <List className={classes.list}>
          {sidebarItems
            .filter((item) => item.accessible)
            .map((menuItem, i) => (
              <SidebarItem
                key={menuItem.title + String(i)}
                menuItem={menuItem}
              />
            ))}
        </List>
      </Box>

      <Box margin="1rem auto">
        <PillButton
          variant="contained"
          color="inherit"
          className={classes.logoutButton}
          onClick={signout}
        >
          <strong>ログアウトする</strong>
        </PillButton>
      </Box>
    </Box>
  );
});
