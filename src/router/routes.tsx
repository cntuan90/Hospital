import * as React from "react";
import Login from "../pages/login";
import { IRoute, PrivateRouteType } from "./type";
import { lazy } from "react";
import ForgetPassword from "../pages/login/forgetPassword";
import ResetPassword from "../pages/login/resetPassword";

export const publicRoutes: IRoute[] = [
  {
    path: "/login",
    title: "Login",
    loadComponent: Login,
  },
  {
    path: "/forgetPassword",
    title: "ForgetPassword",
    loadComponent: ForgetPassword,
  },
  {
    path: "/resetPassword",
    title: "ResetPassword",
    loadComponent: ResetPassword,
  },
];

export const privateRoutesForAdmin: PrivateRouteType[] = [
  {
    title: "当直表編集",
    path: "/shiftBoardManagement",
    loadComponent: lazy(() => import("../pages/admin/shiftBoardManagement")),
    subRoutes: [
      {
        title: "当直表編集",
        path: "/edit",
        loadComponent: lazy(() => import("../pages/admin/shiftBoardManagement/edit")),
      },
      {
        title: "当直表の印刷/ダウンロード",
        path: "/edit/printOrDownload",
        loadComponent: lazy(() => import("../pages/admin/shiftBoardManagement/print")),
      },
    ],
  },
  {
    title: "スタッフ管理",
    path: "/staffManagement",
    loadComponent: lazy(() => import("../pages/admin/staffManagement")),
    subRoutes: [
      {
        title: "スタッフ管理",
        path: "/add",
        loadComponent: lazy(() => import("../pages/admin/staffManagement/add")),
      },
      {
        title: "スタッフ管理",
        path: "/edit/:id",
        loadComponent: lazy(() => import("../pages/admin/staffManagement/add")),
      },
    ],
  },
  {
    title: "",
    path: "/adminSetting",
    hasTitle: false,
    loadComponent: lazy(() => import("../pages/admin/adminSetting")),
  },
];

export const privateRoutesForStaff: PrivateRouteType[] = [
  {
    title: "AAA",
    path: "/staffTop",
    hasTitle: false,
    loadComponent: lazy(() => import("../pages/staff/top")),
  },
  {
    title: "ShiftBoard",
    path: "/shiftBoard",
    hasTitle: false,
    loadComponent: lazy(() => import("../pages/staff/shiftBoard")),
  },
  {
    title: "StaffSetting",
    path: "/staffSetting",
    hasTitle: false,
    loadComponent: lazy(() => import("../pages/staff/setting")),
  },
];
