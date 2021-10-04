// third-party
import { FormattedMessage } from "react-intl";

// assets
import { IconUserPlus, IconUsers } from "@tabler/icons";

// constant
const icons = {
  IconUserPlus: IconUserPlus,
  IconUsers: IconUsers,
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const contacts = {
  id: "contacts",
  title: <FormattedMessage id="contacts" />,
  type: "group",
  children: [
    {
      id: "contact",
      title: <FormattedMessage id="contact" />,
      type: "item",
      url: "/adionar-contato",
      icon: icons["IconUserPlus"],
      breadcrumbs: false,
    },
    {
      id: "contacts",
      title: <FormattedMessage id="contacts" />,
      type: "item",
      url: "/contatos",
      icon: icons["IconUsers"],
      breadcrumbs: false,
    },
  ],
};
