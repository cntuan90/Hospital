import { SvgIconProps } from "@mui/material";

export type SidebarMenu = {
    title: string,
    icon?: (props: SvgIconProps) => JSX.Element
    accessible?: boolean,
    link?: string,
    items?: SidebarMenu[],
    anchor?:string
    isChild?: boolean,
}
