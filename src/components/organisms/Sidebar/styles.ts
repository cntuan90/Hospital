import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const drawerWidth = 230;

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '200px', 
    background: '#3f8cff',
    // background: '#555555',
    '& a': {
      textDecoration: 'none',
    },
    '& span': {
      fontSize: '20px',
    },
    // background: theme.palette.grey[500], 
  },
  list: {
    color: 'white',
    '& .MuiButtonBase-root':{
      padding: '0',
    }
  },
  listItem: {
    '&.Mui-selected': {
      background: theme.palette.primary.main,
    },
    '&.Mui-selected[class*="collapseItem"]': {
      background: theme.palette.secondary.light,
      '&.has-children': {
        background: '#9e9e9e',
      },
    },
  },
  setSidebarWidth: {
    '& .MuiButtonBase-root':{
      padding: '0',
    },
    '& a':{
      display: 'block',
      width: '100%',
      paddingLeft: '15px',
    },
  },
  setSideBarText: {
    color: '#fff',
    fontSize: '30px !important',
  },
  listItemText: {
    paddingLeft: '10px',
  },
  listItemTextChild: {
    paddingLeft: '25px',
  },
  listItemNoPadding: {
    padding: '0px',
  },
  logoutButton: {
    background: 'white',
    borderRadius: '50px'
  },
  anchorStyle: {
    color: 'white',
  },
}));

export default useStyles;
