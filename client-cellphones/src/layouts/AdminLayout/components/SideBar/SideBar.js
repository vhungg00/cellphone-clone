import { FileImageOutlined, WechatOutlined } from "@ant-design/icons";
import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  MailOutline,
  Report,
  ShoppingBasket,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@material-ui/icons";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { routesAdmin } from "~/config";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

export default function SideBar() {
  return (
    <div className={cx("sidebar")}>
      <div className={cx("sidebarWrapper")}>
        <div className={cx("sidebarMenu")}>
          <h3 className={cx("sidebarTitle")}>Dashboard</h3>
          <ul className={cx("sidebarList")}>
            <NavLink
              to={routesAdmin.home}
              className={(nav) => cx("link", { active: nav.isActive })}
            >
              <li className={cx("sidebarListItem")}>
                <LineStyle className={cx("sidebarIcon")} />
                Home
              </li>
            </NavLink>
            <NavLink
              to={routesAdmin.order}
              className={(nav) => cx("link", { active: nav.isActive })}
            >
              <li className={cx("sidebarListItem")}>
                <ShoppingBasket className={cx("sidebarIcon")} />
                Orders
              </li>
            </NavLink>
            <NavLink
              to="/as"
              className={(nav) => cx("link", { active: nav.isActive })}
            >
              <li className={cx("sidebarListItem")}>
                <TrendingUp className={cx("sidebarIcon")} />
                Sales
              </li>
            </NavLink>
            <NavLink
              to={routesAdmin.listProduct}
              className={(nav) => cx("link", { active: nav.isActive })}
            >
              <li className={cx("sidebarListItem")}>
                <Storefront className={cx("sidebarIcon")} />
                Products
              </li>
            </NavLink>
            <NavLink
              to={routesAdmin.appChat}
              className={(nav) => cx("link", { active: nav.isActive })}
            >
              <li className={cx("sidebarListItem")}>
                <WechatOutlined className={cx("sidebarIcon")} />
                App Chat
              </li>
            </NavLink>
            <NavLink
              to={routesAdmin.slider}
              className={(nav) => cx("link", { active: nav.isActive })}
            >
              <li className={cx("sidebarListItem")}>
                <FileImageOutlined className={cx("sidebarIcon")} />
                Slider
              </li>
            </NavLink>
          </ul>
        </div>
        <div className={cx("sidebarMenu")}>
          <h3 className={cx("sidebarTitle")}>Quick Menu</h3>
          <ul className={cx("sidebarList")}>
            <li className={cx("sidebarListItem")}>
              <AttachMoney className={cx("sidebarIcon")} />
              Transactions
            </li>
            <li className={cx("sidebarListItem")}>
              <BarChart className={cx("sidebarIcon")} />
              Reports
            </li>
          </ul>
        </div>
        <div className={cx("sidebarMenu")}>
          <h3 className={cx("sidebarTitle")}>Notifications</h3>
          <ul className={cx("sidebarList")}>
            <li className={cx("sidebarListItem")}>
              <MailOutline className={cx("sidebarIcon")} />
              Mail
            </li>
            <li className={cx("sidebarListItem")}>
              <DynamicFeed className={cx("sidebarIcon")} />
              Feedback
            </li>
            <li className={cx("sidebarListItem")}>
              <ChatBubbleOutline className={cx("sidebarIcon")} />
              Messages
            </li>
          </ul>
        </div>
        <div className={cx("sidebarMenu")}>
          <h3 className={cx("sidebarTitle")}>Staff</h3>
          <ul className={cx("sidebarList")}>
            <li className={cx("sidebarListItem")}>
              <WorkOutline className={cx("sidebarIcon")} />
              Manage
            </li>
            <li className={cx("sidebarListItem")}>
              <Timeline className={cx("sidebarIcon")} />
              Analytics
            </li>
            <li className={cx("sidebarListItem")}>
              <Report className={cx("sidebarIcon")} />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
