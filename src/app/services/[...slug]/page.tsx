import { notFound, permanentRedirect } from "next/navigation";
import { resolvePractice, servicePractices } from "@/data/service-practices";
import { groupPath, practicePath } from "@/data/service-detail-types";
import MainServicePage from "../_template/main-service-page";
import ServiceGroupPage from "../_template/service-group-page";
import {
  practices,
  serviceFaqs,
  serviceGroups,
  slugify,
} from "@/content/site";
import { Banner } from "../../_components/ui";
import Overview from "./overview";
import ServiceCapabilities from "../service-capabilities";
function resolve(slugs: string[]) {
  const group = serviceGroups.find((g) => g.slug === slugs[0]);
  const practice = practices.find((p) => p.slug === slugs[0]);
  if (slugs.length > 2 || (!group && !practice)) return null;
  const item =
    slugs.length === 2
      ? group?.items.find((i) => slugify(i) === slugs[1])
      : undefined;
  if (slugs.length === 2 && !item) return null;
  const title = item || practice?.title || group!.title;
  const faqKey = item ? slugify(item) : group?.slug || practice!.slug;
  return {
    title,
    description: item
      ? `${title} support as part of our ${group!.title.toLowerCase()} practice. Connect with Astronis Global to discuss your business needs.`
      : practice?.description ||
        `Business-focused support across ${title.toLowerCase()}, with legal, regulatory and commercial perspective.`,
    group: slugs[0],
    items: item ? [] : group?.items || [],
    faqs: serviceFaqs[faqKey] || serviceFaqs[group?.slug || practice!.slug] || [],
  };
}
export function generateStaticParams() {
  return [
    ...servicePractices.flatMap(practice => [{slug:[practice.slug]}, ...practice.groups.map(group => ({slug:[practice.slug,group.slug]}))]),
    ...serviceGroups.flatMap((g) => [
      { slug: [g.slug] },
      ...g.items.map((i) => ({ slug: [g.slug, slugify(i)] })),
    ]),
    ...practices
      .filter((p) => !serviceGroups.some((g) => g.slug === p.slug))
      .map((p) => ({ slug: [p.slug] })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slugs = (await params).slug;
  const detailed = resolvePractice(slugs);
  if (detailed) {
    const {practice, group} = detailed;
    return {
      title: {absolute:(group ? group.seoTitle : practice.seoTitle) || `${group?.title || practice.title} Services | Astronis`},
      description: group?.description || practice.description,
      alternates: {canonical:group ? groupPath(practice,group) : practicePath(practice)},
    };
  }
  const data = resolve(slugs);
  return { title: ["corporate-advisory", "corporate-and-commercial-advisory"].includes(data?.group ?? "") && (await params).slug.length === 1 ? "Corporate & Commercial" : data?.title || "Service", description: data?.description };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slugs = (await params).slug;
  const alias = slugs.length === 1 && servicePractices.find((practice) => practice.slug !== slugs[0] && practice.aliases.includes(slugs[0]));
  if (alias) permanentRedirect(practicePath(alias));
  const detailed = resolvePractice(slugs);
  if (detailed) {
    const {practice, group} = detailed;
    const crumbs = [{name:"Home",path:"/"},{name:"Services",path:"/services"},{name:practice.title,path:practicePath(practice)},...(group ? [{name:group.title,path:groupPath(practice,group)}] : [])];
    const schema = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:crumbs.map((crumb,index) => ({"@type":"ListItem",position:index+1,name:crumb.name,item:`https://www.astronisglobal.com${crumb.path}`}))};
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />{group ? <ServiceGroupPage practice={practice} group={group} /> : <MainServicePage practice={practice} />}</>;
  }
  const data = resolve(slugs);
  if (!data) notFound();
  return (
    <>
      <Banner title={data.title} text={data.description} eyebrow="Services" />
      {(await params).slug.length === 1 && <ServiceCapabilities slug={data.group} />}
      <Overview {...data} />
    </>
  );
}
