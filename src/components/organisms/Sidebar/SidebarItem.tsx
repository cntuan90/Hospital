import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import { SidebarMenu } from './type';
import {
  Link as LinkRouter, matchPath, useLocation, useParams,
} from 'react-router-dom';
import { Link, ListItem, ListItemText } from '@mui/material';

const SidebarItem: React.FC<{
  menuItem: SidebarMenu,
  inset?: boolean
}> = ({ menuItem, inset = false }) => {
  const classes = useStyles();
  const { companyCode } = useParams<{ companyCode: string }>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isMenuShow, setIsMenuShow] = useState<boolean>(false);
  const location = useLocation();
  const match = matchPath(location.pathname, {
    path: `/:companyCode${menuItem.link || '-'}`, // in case of undefined link, return - so it won't match
  });

  const classnames = clsx(classes.listItem, menuItem?.items && 'has-children', classes.setSidebarWidth);

  const isMatchParent = () => {
    const parentUrl = match?.url.replace(`/${companyCode}/`, '');// extract parentUrl
    return parentUrl ? !!menuItem.link?.includes(parentUrl) : false;
  };

  useEffect(() => {
    const isMatch = isMatchParent();
    if (isMatch) {
      setIsSelected(true);
    }
    return () => {
      setIsSelected(false);
    };
  }, [location.pathname]);

  return (
    <ListItem
      button={true}
      className={classnames}
      selected={isSelected}
    >
      <Link
        component={LinkRouter}
        to={`${menuItem.link}`}
        color="inherit"
      >
        <ListItemText
          inset={inset}
          className={classes.setSideBarText}
          primary={menuItem.title}
        />
      </Link>
    </ListItem>
  );
};

export default React.memo(SidebarItem);
