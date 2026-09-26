"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { practices } from "@/content/site";
import Icon from "./icon";
import styles from "./services-menu.module.css";
import shared from "./industries-menu.module.css";
import { isRouteActive } from "./navigation-state";

const groups = [
  { title: "Corporate & Business", caption: "Build · Grow · Transform", icon: "building", slugs: ["corporate-and-commercial-advisory", "business-advisory-consulting", "banking-rbi-financial-services", "banking-nbfc-and-financial-services-advisory", "startup-and-investment-advisory", "intellectual-property", "rera-and-real-estate-advisory"] },
  { title: "Regulatory & Cross-Border", caption: "Comply · Navigate · Expand", icon: "shield", slugs: ["regulatory-and-compliance", "licensing-registrations", "fema-fdi-cross-border", "taxation-compliance", "gst-and-indirect-tax-regulatory-support", "cross-border-and-international-business-support"] },
  { title: "Disputes & Tribunals", caption: "Resolve · Represent · Protect", icon: "scale", slugs: ["litigation-dispute-resolution", "insolvency-restructuring", "nclt-and-nclat-advisory", "msme-advisory-and-disputes", "arbitration-and-conciliation", "drt-and-drat-matters", "nclt-and-nclat-matters", "aft-and-cat-advisory-matters"] },
  { title: "People, Risk & Sustainability", caption: "Empower · Assure · Create Impact", icon: "people", slugs: ["hr-and-employment-advisory", "risk-governance-and-forensic-advisory", "esg-and-sustainability-advisory"] },
] as const;

const bySlug = new Map(practices.map((practice) => [practice.slug, practice]));

export default function ServicesMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const term = query.trim().toLowerCase();
  const matches = (practice: (typeof practices)[number]) => `${practice.title} ${practice.description}`.toLowerCase().includes(term);
  const count = practices.filter(matches).length;

  return <div className={`mega-menu ${styles.menu}`} id={id}>
    
    <div className={styles.body}>
      <div className={shared.main}>
      <div className={styles.columns}>
        {groups.map((group) => <section className={styles.column} key={group.title} aria-label={group.title}>
          <div className={styles.groupHeading}><Icon name={group.icon} /><div><h3>{group.title}</h3><p>{group.caption}</p></div></div>
          <div className={styles.links}>{group.slugs.map((slug) => {
            const practice = bySlug.get(slug);
            if (!practice || !matches(practice)) return null;
            const href = `/services/${practice.canonicalSlug}`;
            return <Link href={href} key={slug} onClick={onNavigate} className={isRouteActive(pathname, href) ? "active-submenu-item" : undefined}><span><strong>{practice.title}</strong><small>{practice.description}</small></span><Icon name="arrow" /></Link>;
          })}</div>
          {group.title === "People, Risk & Sustainability" && !term && <Link className={styles.model} href="/services" onClick={onNavigate}><span>Our integrated model</span><strong>Corporate × Regulatory<br />Legal × Business Advisory</strong><small>Connected advice for complex business decisions.</small><em>Discover our approach <Icon name="arrow" /></em></Link>}
        </section>)}
        {term && <p className={styles.result} role="status">{count ? `${count} matching services` : "No matching services. Try another keyword."}</p>}
      </div>

      <div className={shared.footer}>
        <span><Icon name="file" /><strong>{practices.length}</strong> Advisory Services</span>
        <span><Icon name="people" /><strong>Integrated</strong> Expertise</span>
        <span><Icon name="globe" /><strong>Cross-border</strong> Perspective</span>
        <span className={shared.footerStatement}>Complex challenges.<br />Practical solutions.</span>
      </div>
      </div>
      <aside className={shared.sidebar} aria-label="Find the right service">
        <span className={shared.sidebarEyebrow}>CONNECTED EXPERTISE</span>
        <h2>Find Your<br /><em>Service.</em></h2>
        <p>Search by service, issue, regulator or business need.</p>
        <div className={shared.search}><input id="service-menu-search" aria-label="Search services in menu" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services..." /><Icon name="search" /></div>
        <div className={shared.quickLinks}>
          <Link href="/services" onClick={onNavigate} className={isRouteActive(pathname, "/services") ? "active-submenu-item" : undefined}><Icon name="file" /><span><strong>Explore All Services</strong><small>View our complete advisory portfolio</small></span><Icon name="arrow" /></Link>
          <Link href="/insights" onClick={onNavigate} className={isRouteActive(pathname, "/insights") ? "active-submenu-item" : undefined}><Icon name="bulb" /><span><strong>Service Insights</strong><small>Articles, guides and publications</small></span><Icon name="arrow" /></Link>
          <Link href="/professionals" onClick={onNavigate} className={isRouteActive(pathname, "/professionals") ? "active-submenu-item" : undefined}><Icon name="people" /><span><strong>Find a Professional</strong><small>Connect with our experts</small></span><Icon name="arrow" /></Link>
        </div>
        <div className={shared.sidebarBottom}><Icon name="globe" /><span>AN INTEGRATED PERSPECTIVE.<br /><strong>Practical advice.</strong></span></div>
      </aside>
    </div>
  </div>;
}
