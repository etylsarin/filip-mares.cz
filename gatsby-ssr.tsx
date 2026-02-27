import * as React from "react";

import { PageLayout } from "./src/components/page-layout";

const REDIRECT_ORIGIN = "https://filip-mares.dev";

export const wrapPageElement = ({ element, props }) => {
  return <PageLayout {...props}>{element}</PageLayout>;
};

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="fm-redirect"
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var o=${JSON.stringify(
          REDIRECT_ORIGIN
        )};var h=window.location.hostname;if(h==="localhost"||h==="127.0.0.1"||h==="0.0.0.0"){return;}if(window.location.origin!==o){window.location.replace(o+window.location.pathname+window.location.search+window.location.hash);}}catch(e){}})();`,
      }}
    />,
  ]);
};
