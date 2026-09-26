import type { ServicePractice } from "@/data/service-detail-types";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import ServiceHero from "./service-hero";
import SectionNavigation from "./section-navigation";
import ServiceGroupSection from "./service-group-section";
import ServiceSupport from "./service-support";
import styles from "./service-template.module.css";

export default function MainServicePage({ practice }: { practice: ServicePractice }) {
  const isDirectServicePractice = practice.groups.every(group => group.children.length <= 1);

  return <div className={styles.page} data-service-template>
    <ServiceHero practice={practice} />
    <section className={styles.introduction}><div className={`container ${styles.introGrid}`}>
      <div className={styles.introVisual}>
        <Image src={practice.groups[0].image} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" />
        <div className={styles.introVisualCaption}><span>{practice.visual === "regulatory" ? "FROM OBLIGATION TO IMPLEMENTATION" : "FROM FOUNDATION TO WHAT’S NEXT"}</span><strong>Every stage.<br />A broader perspective.</strong><div><span>{String(practice.groups.length).padStart(2,"0")}</span><p>Connected service groups.<br />One integrated approach.</p></div></div>
      </div>
      <div className={styles.introEditorial}><span className={styles.label}>{practice.introEyebrow || "ONE BUSINESS. CONNECTED EXPERTISE."}</span><h2>{practice.introHeading}</h2><p>{practice.introduction}</p><div className={styles.introStages}>{practice.groups.map(group => <div key={group.slug}><Icon name={group.icon} /><span>{group.shortTitle}</span></div>)}</div></div>
    </div></section>
    {isDirectServicePractice ? (
      <div className={`container ${styles.detailLayout}`}>
        <aside className={styles.detailAside}>
          <SectionNavigation variant="sidebar" title="Explore this service" items={practice.groups.map(group => ({id: group.slug, title: group.shortTitle, icon: group.icon}))} />
          <div className={styles.sidebarHelp}><span>LOOKING AT THE BIGGER PICTURE?</span><p>Explore the full banking and financial advisory approach and select the service that matches your requirement.</p></div>
        </aside>
        <div className={styles.detailContent} id="service-groups">{practice.groups.map((group,index) => <ServiceGroupSection practice={practice} group={group} index={index} key={group.slug} />)}</div>
      </div>
    ) : (
      <>
        <SectionNavigation variant="bar" title="Explore our capabilities" items={practice.groups.map(group => ({id:group.slug,title:group.shortTitle,icon:group.icon}))} />
        <div id="service-groups">{practice.groups.map((group,index) => <ServiceGroupSection practice={practice} group={group} index={index} key={group.slug} />)}</div>
      </>
    )}
    <ServiceSupport practice={practice} />
  </div>;
}
