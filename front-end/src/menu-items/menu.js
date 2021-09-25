// third-party
import { FormattedMessage } from "react-intl";

// assets
import { IconDeviceAnalytics } from "@tabler/icons";

// constant
const icons = {
  IconDeviceAnalytics: IconDeviceAnalytics,
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const menu = {
  id: "dashboard",
  title: <FormattedMessage id="dashboard" />,
  type: "group",
  children: [
    {
      id: "analytics",
      title: <FormattedMessage id="analytics" />,
      type: "item",
      url: "/chat",
      icon: icons["IconDeviceAnalytics"],
      breadcrumbs: false,
    },
  ],
};
