import hierarchy from "./service-hierarchy.json";
import { practices as identities, serviceBanners as banners } from "./service-identities";

export type Capability = { title: string; children: string[]; sourceRow?: number };
const family = (index: number): Capability[] => hierarchy[index].subServices;
const select = (index: number, ...positions: number[]) => positions.map(position => family(index)[position]);
const existing = (...titles: string[]): Capability[] => titles.map(title => ({ title, children: [] }));

// Workbook family/group references, in the unchanged 21-entry dropdown order.
// Shared capabilities are referenced under each relevant practice, not renamed.
const mappings: Capability[][] = [
 family(0),
 family(1),
 family(2),
 [...family(3), ...select(2, 0, 5)],
 family(4), family(5), family(6), family(7),
 [
  { title: "Banking Advisory", children: ["Institutional banking strategy", "Banking arrangements and transaction support"], sourceRow: 390 },
  { title: "RBI Regulatory", children: ["RBI framework overview", "Regulatory mapping and compliance review"], sourceRow: 391 },
  { title: "NBFC Formation / Licensing Advisory", children: ["NBFC business model planning", "Licensing and regulatory process support"], sourceRow: 392 },
  { title: "NBFC Compliance", children: ["Ongoing compliance", "Governance and documentation support"], sourceRow: 393 },
  { title: "FinTech", children: ["Digital finance and regulatory mapping", "Technology-enabled financial services support"], sourceRow: 394 },
  { title: "Payment Systems", children: ["Payment model review", "Digital payment infrastructure and compliance mapping"], sourceRow: 395 },
  { title: "Financial Services Regulatory", children: ["Regulatory analysis", "Institutional financial services advisory"], sourceRow: 396 },
  { title: "Banking Documentation", children: ["Facility documentation", "Institutional and security review"], sourceRow: 397 },
  { title: "Loan / Security Documentation", children: ["Loan and security documentation", "Guarantee and security support"], sourceRow: 398 },
  { title: "Debt & Restructuring Advisory", children: ["Debt restructuring strategy", "Lender coordination and documentation"], sourceRow: 399 },
  { title: "Financial Institution Advisory", children: ["Institutional advisory", "Regulated entity strategy and governance review"], sourceRow: 400 },
 ],
 [
  { title: "IBC Advisory", children: ["Insolvency framework overview", "Stakeholder and process assessment"], sourceRow: 401 },
  { title: "Insolvency Strategy", children: ["Business stress assessment", "Strategic options and roadmap"], sourceRow: 402 },
  { title: "CIRP-related Advisory", children: ["Process review", "Stakeholder coordination and documentation"], sourceRow: 403 },
  { title: "Creditor Advisory", children: ["Claims review", "Security and recovery assessment"], sourceRow: 404 },
  { title: "Debtor Advisory", children: ["Debt stress review", "Restructuring and continuity planning"], sourceRow: 405 },
  { title: "Resolution Planning Support", children: ["Resolution strategy", "Implementation and coordination support"], sourceRow: 406 },
  { title: "NCLT / NCLAT Proceedings", children: ["Tribunal strategy", "Procedural and documentation review"], sourceRow: 407 },
  { title: "Debt Restructuring", children: ["Debt reorganisation", "Lender coordination and restructuring strategy"], sourceRow: 408 },
  { title: "Distressed Business Advisory", children: ["Stress assessment", "Strategic restructuring and turnaround options"], sourceRow: 409 },
  { title: "Liquidation / Closure Support", children: ["Closure strategy", "Process and stakeholder coordination"], sourceRow: 410 },
 ],
 [...select(2, 1), ...family(9)], family(8), select(3, 1, 2), family(10),
 [...select(3, 0), { title: "MSME / MSEFC", children: ["Udyam / MSME", "MSME Arbitration"], sourceRow: 133 }],
 select(2, 3), select(2, 2),
 [{title: "TDSAT", children: [], sourceRow: 136}, {title: "Telecommunications", children: [], sourceRow: 382}],
 existing("Tribunal Advisory", "Appeal Support", "Review / Representation", "Documentation"),
 [{title: "Real Estate / RERA", children: ["RERA", "Property Disputes"], sourceRow: 377}, ...existing("Project Approvals", "Land / Title Review", "Development Agreements", "Leasing", "Joint Development", "Due Diligence", "Dispute Support")],
 family(7), family(11), family(12), [...select(6, 4, 1, 2), ...select(3, 4), ...select(7, 3)],
];
const descriptions = [
 "Plan the corporate lifecycle with connected advice on entity formation, ownership structures, governance, commercial contracts and transactions. Coordinate legal due diligence, shareholder arrangements and restructuring around the operating needs of your business and its next stage of growth.",
 "Understand and organise obligations across corporate, financial and sector regulation. Build compliance frameworks, coordinate filings and approvals, and address technology, privacy and digital business requirements with a practical view of responsibilities, regulatory change and ongoing oversight.",
 "Strategic representation and dispute advisory across courts, tribunals, arbitration, banking recovery, special forums and economic-offence matters, helping clients assess legal rights, forum selection and practical resolution steps.",
 "Connect business strategy with the legal and regulatory decisions that shape implementation. Support market entry, growth, organisational design, investments and management processes, with coordinated advice when commercial disputes or investigation issues affect business plans and operating relationships.",
 "Identify and coordinate registrations, licences and permissions relevant to your business model. Support business, food and consumer, industrial and institutional requirements, bringing application documents, product obligations and sector approvals into a clear plan for establishment and ongoing operations.",
 "Protect and manage intellectual property through trademark, copyright, design and patent support. Connect registration, portfolio management, licensing and enforcement strategy with commercial objectives, including brand protection, transaction due diligence and patent prosecution through appropriately qualified professionals.",
 "Structure foreign investment and cross-border activity with attention to foreign exchange obligations. Coordinate FEMA, FDI, ODI and external commercial borrowing matters, including entry routes, reporting, share transfers, overseas ventures and repatriation within the broader commercial context of each transaction.",
 "Coordinate tax obligations across direct tax, GST, transaction tax and international tax matters, helping businesses interpret obligations and integrate compliance with business, investment and cross-border decisions.",
 "Advisory support across banking regulation, RBI matters, NBFCs, FinTech, payment systems, financial documentation, lending structures and regulated financial institutions.",
 "Strategic advisory for businesses, creditors, debtors and stakeholders navigating insolvency, restructuring, CIRP-related matters, tribunal proceedings and distressed situations.",
 "Coordinate corporate tribunal and insolvency matters from initial assessment through proceedings and resolution planning. Support company law disputes, creditor and debtor considerations, restructuring options and closure requirements with attention to documentation, procedural stages and the business context of the matter.",
 "Support banking and financial services businesses across regulatory, governance and transactional requirements. Address RBI matters, NBFC formation and compliance, payment systems, FinTech and lending documentation, connecting financial regulation with operational priorities and debt or restructuring considerations.",
 "Help founders and investors prepare for formation, fundraising and growth. Align startup structuring, founder arrangements, investment readiness, ESOP planning and compliance with commercial due diligence and transaction support, so decisions reflect both business ambitions and investment requirements.",
 "Build practical employment arrangements and workplace processes across the employee lifecycle. Support contracts, HR policies, statutory compliance, POSH matters and workplace investigations, alongside advice on employee disputes, separation and coordination of payroll and other employment-related obligations.",
 "Support smaller businesses with growth planning, regulatory coordination and commercial dispute requirements. Connect business advisory with Udyam registration, MSME arbitration and MSEFC matters, helping teams organise their documentation, understand the issues and plan appropriate next steps.",
 "Assess and manage disputes through arbitration, conciliation and mediation. Support domestic and institutional proceedings, including MSME arbitration, award enforcement and challenges, with an approach informed by the underlying commercial relationship, available documentation and the stage of the dispute.",
 "Coordinate debt recovery and banking disputes involving DRT and DRAT proceedings. Support assessment of recovery issues, SARFAESI matters and related documentation, helping businesses and stakeholders organise their position and determine the advisory or representation requirements for the matter.",
 "Support telecommunications matters and proceedings before the Telecom Disputes Settlement and Appellate Tribunal. Bring together the regulatory background, commercial relationship and relevant records to assess the dispute, clarify procedural requirements and coordinate appropriate advisory and representation support.",
 "Support matters before the Armed Forces Tribunal and Central Administrative Tribunal through case assessment, documentation and representation coordination. Review the background, available records and procedural stage to identify advisory needs, appeal considerations and practical next steps for the engagement.",
 "Connect real estate projects and transactions with regulatory and commercial requirements. Support RERA matters, approvals, title review, development and leasing agreements, due diligence and property disputes, keeping project context and stakeholder responsibilities central to the advisory process.",
 "Coordinate GST registration, returns, notices, refunds and disputes within a wider tax compliance framework. Connect indirect tax questions with direct tax, transaction tax and international tax coordination where relevant, bringing business records and transaction context into the review.",
 "Identify risks and examine concerns across governance, controls and business conduct. Support forensic reviews, corporate and financial investigations, compliance enquiries and due diligence, alongside fraud risk assessment and the development of ethics and anti-bribery frameworks for ongoing oversight.",
 "Translate sustainability objectives into governance, risk and compliance priorities. Support ESG strategy, environmental regulatory matters, due diligence and reporting coordination, helping businesses organise responsibilities and evidence within a practical framework for responsible business operations and stakeholder communication.",
 "Coordinate India entry and overseas expansion across entity selection, investment structures and regulatory requirements. Connect international joint ventures, cross-border transactions and foreign collaboration with ongoing business support and tax coordination, keeping jurisdictions and commercial objectives in view.",
];
const filters = ["Corporate", "Regulatory", "Legal", "Business", "Compliance", "Legal", "International", "Tax & Compliance", "Banking & Financial Services", "Insolvency & Restructuring", "Legal", "Regulatory", "Transactions", "Compliance", "Legal", "Legal", "Legal", "Legal", "Legal", "Legal", "Legal", "Compliance", "Risk", "Risk", "International"];
export const serviceBanners: Record<string, string> = { ...banners, "aft-and-cat-advisory-matters": "legal-professionals-hero.png", "insolvency-restructuring": "Banner-Technology & Digital.png" };
export const services = identities.map((service, index) => ({
 ...service,
 canonicalSlug: service.canonicalSlug || service.slug,
 number: String(index + 1).padStart(2, "0"),
 shortDescription: descriptions[index],
 image: service.slug === "fema-fdi-cross-border"
   ? "/images/services/fema-fdi-and-foreign-exchange-advisory.webp"
   : service.slug === "taxation-compliance"
     ? "/images/services/gst-and-indirect-tax-regulatory-support.webp"
     : service.slug === "banking-rbi-financial-services"
       ? "/images/services/banking-nbfc-and-financial-services-advisory.webp"
       : service.slug === "insolvency-restructuring"
         ? "/technology&digital/Banner-Technology & Digital.png"
         : `/images/services/${service.slug}.webp`,
 category: filters[index],
 subServices: mappings[index],
 // Preserve discovery of adjacent technology and specialist dispute capabilities.
 relatedCapabilities: index === 1 ? [...family(13), ...family(14), ...select(2, 4)] : [],
 highlights: mappings[index].slice(0, 4).map(group => group.title),
}));
export type Service = (typeof services)[number];
