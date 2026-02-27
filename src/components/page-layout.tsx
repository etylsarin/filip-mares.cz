import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, Link } from "gatsby";
import clasNames from "classnames";

import * as styles from "./page-layout.module.scss";

const CANONICAL_ORIGIN = "https://filip-mares.dev";

export const PageLayout = ({ pageContext, children, location }) => {
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
  const frontmatter = pageContext?.frontmatter || {};
  const pageTitle = frontmatter.title;
  const TITLE = pageTitle ? `${pageTitle} | ${siteMetadata.title}` : siteMetadata.title;
  const DESC = frontmatter.description || siteMetadata.description;
  const pathname = location?.pathname || "/";
  const canonicalUrl = new URL(pathname, CANONICAL_ORIGIN).toString();

  return (
    <div className={styles.page}>
      <Helmet
        htmlAttributes={{ lang: 'cs' }}
        title={TITLE}
        link={[
          {
            rel: "canonical",
            href: canonicalUrl,
          },
        ]}
        meta={[
          {
            name: `description`,
            content: DESC,
          },
          {
            property: `og:url`,
            content: canonicalUrl,
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
            name: `twitter:url`,
            content: canonicalUrl,
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

export default PageLayout;