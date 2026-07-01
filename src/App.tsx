import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { UIProvider } from "@/context/UIContext";

import ScrollTopButton from "@/components/floating/ScrollTopButton";
import WhatsAppButton from "@/components/floating/WhatsAppButton";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <UIProvider>
      <BrowserRouter basename={__BASE_PATH__}>
        <>
          <AppRoutes />

          <ScrollTopButton />
          <WhatsAppButton />
        </>
      </BrowserRouter>
      </UIProvider>
    </I18nextProvider>
  );
}

export default App;