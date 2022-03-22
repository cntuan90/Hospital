import { Box, Tab, Tabs, Typography } from "@mui/material";
import { stringify } from "qs";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useQuery from "../../../hooks/useQuery";
import { Store } from "../../../redux/store";
import ChangeInfo from "./changeInfo";
import GroupSetting from "./group";
import HolidaySetting from "./holiday";
import Initialization from "./initialization";
import NotificationSetting from "./notification";
import RequiredStaffs from "./requiredStaffs";
import useStyles from "./styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function returnProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const AdminSetting: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const history = useHistory();
  const { loginData } = useSelector((state: Store) => state.auth);

  const URLSearchParams = useQuery();
  const tabNow = Number(URLSearchParams.get("tab")) || 0;

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...rest } = props;

    return (
      <div
        {...rest}
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        style={{ width: "100%" }}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const params = { tab: newValue };
    history.replace({ search: stringify(params) });
  };

  useEffect(() => {
    setValue(tabNow);
  }, [tabNow]);

  return (
    <Box className={classes.cssSidebar}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
        className={classes.setTextColor}
      >
        <Typography variant="h6">当直表設定</Typography>
        <Tab label=" 作成設定" {...returnProps(1)} />
        <Tab label=" グループ設定" {...returnProps(2)} />
        <Tab label=" 必要人数設定" {...returnProps(3)} />
        <Tab label=" 祝日設定" {...returnProps(4)} />
        <Typography variant="h6">通知・メッセージ設定</Typography>
        <Tab label="スタッフへの通知設定" {...returnProps(6)} />
        <Typography variant="h6">管理者設定</Typography>
        <Tab label="管理者設定" {...returnProps(8)} />
      </Tabs>
      <TabPanel value={value} index={1}>
        <Initialization />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GroupSetting />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RequiredStaffs />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <HolidaySetting />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <NotificationSetting />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <ChangeInfo />
      </TabPanel>
    </Box>
  );
};

export default React.memo(AdminSetting);
