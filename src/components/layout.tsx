import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, Link } from "gatsby";
import clasNames from "classnames";

import * as styles from "./layout.module.scss";

const Layout = ({ pageContext, children }) => {
  const { site: { siteMetadata }} = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const TITLE = `${pageContext.frontmatter.title} | ${siteMetadata.title}`;
  const DESC = pageContext.frontmatter.description || siteMetadata.description;  

  return (
    <div className={styles.page}>
      <Helmet
        htmlAttributes={{ lang: 'cs' }}
        title={TITLE}
        meta={[
          {
            name: `description`,
            content: DESC,
          },
          {
            property: `og:title`,
            content: TITLE,
          },
          {
            property: `og:description`,
            content: DESC,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:title`,
            content: TITLE,
          },
          {
            name: `twitter:description`,
            content: DESC,
          },
        ]}
      />
      <main className={styles.main}>
        <div className={styles.menu}>
          <input type="checkbox" id="swith" />
          <label htmlFor="swith" />
          <ul>
            <li><Link to="/">Kdo jsem</Link></li>
            <li><Link to="/cim-se-zabyvam">Čím se zabývám</Link></li>
            <li><Link to="/co-prosazuji">Co prosazuji</Link></li>
            <li><Link to="/jak-me-muzete-podporit">Jak mě můžete podpořit</Link></li>
            <li><Link to="/chcete-byt-v-kontaktu">Chcete být v kontaktu</Link></li>
          </ul>
        </div>
        <section className={clasNames(styles.section)}>
          {children}
        </section>
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
};

export default Layout;