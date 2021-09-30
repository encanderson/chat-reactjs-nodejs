import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// third-party
import { IntlProvider } from "react-intl";

// load locales files
const loadLocaleData = (locale) => {
  return import("@src/utils/locales/pt.json");
};

//-----------------------|| LOCALIZATION ||-----------------------//

const Locales = ({ children }) => {
  const customization = useSelector((state) => state.customization);
  const [messages, setMessages] = useState();

  useEffect(() => {
    loadLocaleData(customization.locale).then((d) => {
      setMessages(d.default);
    });
  }, [customization.locale]);

  return (
    <React.Fragment>
      {messages && (
        <IntlProvider
          locale={customization.locale}
          defaultLocale="pt"
          messages={messages}
        >
          {children}
        </IntlProvider>
      )}
    </React.Fragment>
  );
};

Locales.propTypes = {
  children: PropTypes.node,
};

export default Locales;
