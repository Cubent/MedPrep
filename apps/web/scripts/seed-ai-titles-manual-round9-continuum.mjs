// One-off script: ninth batch of hand-authored (not model-generated) topic
// titles, built around a category barely tapped in earlier rounds:
// differentiating one structure/process from an adjacent one along a real
// anatomical or physiological continuum by combining multiple discriminating
// features (e.g. trachea vs. bronchus vs. bronchiole, told apart by
// cartilage + glands + muscle + epithelium together) — exactly the "compare
// several features to pinpoint which segment this is" vignette style.
// Written directly, not produced by calling an LLM API — only the FULL
// QUESTION content is ever generated lazily by AI later, on first use.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Histology: [
    T('Differentiate the trachea from the main bronchus by the shape and completeness of its cartilage rings'),
    T('Distinguish a bronchus from a bronchiole by the presence or absence of cartilage and submucosal glands'),
    T('Differentiate a bronchiole from a terminal bronchiole by the presence of Clara cells and loss of goblet cells'),
    T('Distinguish a terminal bronchiole from a respiratory bronchiole by the presence of scattered alveoli budding from the wall'),
    T('Differentiate a respiratory bronchiole from an alveolar duct by the proportion of the wall lined by alveoli'),
    T('Differentiate the esophagus from the stomach by the transition from stratified squamous to simple columnar epithelium'),
    T('Distinguish the duodenum from the jejunum by the presence of Brunner glands in the submucosa'),
    T('Differentiate the jejunum from the ileum by the density of Peyer patches and villus height'),
    T('Distinguish the small intestine from the large intestine by the presence or absence of villi'),
    T('Differentiate the colon from the rectum by the transition in the muscularis externa and taenia coli'),
    T('Distinguish the anal canal above versus below the pectinate line by epithelial type and blood and nerve supply'),
    T('Differentiate the proximal convoluted tubule from the distal convoluted tubule by the presence of a brush border and cell height'),
    T('Distinguish the thin descending limb from the thin ascending limb of the loop of Henle by water permeability'),
    T('Differentiate the thick ascending limb from the distal convoluted tubule by their reabsorptive functions and location'),
    T('Distinguish collecting duct principal cells from intercalated cells by their roles in sodium and acid-base handling'),
    T('Differentiate the renal cortex from the renal medulla by the structures each contains'),
    T('Differentiate the seminiferous tubule from the rete testis by its epithelial lining'),
    T('Distinguish the efferent ductules from the epididymis by epithelial height and ciliation'),
    T('Differentiate the epididymis from the vas deferens by the thickness of the smooth muscle wall'),
    T('Distinguish the vas deferens from the ejaculatory duct by their surrounding structures'),
    T('Differentiate the ampulla from the isthmus of the fallopian tube by mucosal folding and ciliated cell density'),
    T('Distinguish the endocervix from the ectocervix by epithelial type at the transformation zone'),
    T('Differentiate the vagina from the cervix by the presence or absence of glands'),
    T('Differentiate an elastic (conducting) artery from a muscular (distributing) artery by the composition of the tunica media'),
    T('Distinguish an arteriole from a capillary by the presence of smooth muscle in the wall'),
    T('Differentiate a vein from an artery of similar size by the thickness of the tunica media and presence of valves'),
    T('Distinguish a large vein from the vena cava by the presence of longitudinal smooth muscle bundles'),
    T('Differentiate an intralobular bile ductule from an interlobular bile duct by size and surrounding connective tissue'),
    T('Distinguish a pancreatic intercalated duct from an interlobular duct by epithelial height'),
    T('Differentiate exocrine pancreatic acini from the islets of Langerhans by staining and cellular architecture'),
  ],
  Pathology: [
    T('Differentiate well-differentiated from poorly-differentiated adenocarcinoma by glandular architecture on biopsy'),
    T('Distinguish carcinoma in situ from invasive carcinoma by the integrity of the basement membrane'),
    T('Differentiate a low-grade from a high-grade urothelial carcinoma by nuclear atypia and mitotic rate'),
    T('Distinguish dysplasia from carcinoma in situ by the extent of epithelial involvement'),
    T('Differentiate acute from chronic inflammation by the predominant cell type on histology'),
    T('Distinguish coagulative necrosis from liquefactive necrosis by tissue architecture preservation'),
    T('Differentiate caseous necrosis from coagulative necrosis by gross and microscopic appearance'),
    T('Distinguish fat necrosis from fibrinoid necrosis by the underlying mechanism and appearance'),
    T('Differentiate a benign leiomyoma from a leiomyosarcoma by mitotic count and cellular atypia'),
    T('Distinguish Hodgkin lymphoma from non-Hodgkin lymphoma by the presence of Reed-Sternberg cells and pattern of spread'),
  ],
  Anatomy: [
    T('Differentiate the ileum from the jejunum on gross inspection by mesenteric fat and vascular arcades'),
    T('Distinguish the true ribs from the false and floating ribs by their costal cartilage attachment'),
    T('Differentiate the greater omentum from the lesser omentum by their peritoneal attachments'),
    T('Distinguish the internal from the external anal sphincter by muscle type and voluntary control'),
    T('Differentiate the true pelvis from the false pelvis by the pelvic brim'),
    T('Distinguish the superficial from the deep inguinal ring by their anatomical relationships'),
    T('Differentiate the greater sciatic foramen from the lesser sciatic foramen by the structures passing through each'),
    T('Distinguish the borders of the anatomical snuffbox from adjacent wrist structures by its tendinous boundaries'),
  ],
  Physiology: [
    T('Differentiate type I (slow-twitch) from type II (fast-twitch) skeletal muscle fibers by their metabolic and contractile properties'),
    T('Distinguish the receptor potential from the action potential by their graded versus all-or-none properties'),
    T('Differentiate the absolute refractory period from the relative refractory period in cardiac action potentials'),
    T('Distinguish phase 0 from phase 2 of the cardiac action potential by the ion channels involved'),
    T('Differentiate fast pain carried by A-delta fibers from slow pain carried by C fibers by conduction velocity'),
    T('Distinguish tonic from phasic muscle stretch receptor responses'),
  ],
  Microbiology: [
    T('Differentiate alpha-hemolysis from beta-hemolysis on blood agar by the pattern of red cell destruction'),
    T('Distinguish coagulase-positive from coagulase-negative Staphylococcus species by clinical significance'),
    T('Differentiate lactose-fermenting from non-lactose-fermenting Gram-negative rods on MacConkey agar'),
    T('Distinguish obligate aerobes from obligate anaerobes by their growth pattern in thioglycollate broth'),
    T('Differentiate a DNA virus from an RNA virus by the cellular site of genome replication'),
  ],
  Genetics: [
    T('Differentiate complete penetrance from incomplete penetrance using a pedigree example'),
    T('Distinguish a missense mutation from a nonsense mutation by its effect on the protein product'),
    T('Differentiate a frameshift mutation from an in-frame deletion by their effect on the reading frame'),
    T('Distinguish a silent mutation from a missense mutation by its effect on the amino acid sequence'),
  ],
  Biochemistry: [
    T('Differentiate a competitive inhibitor from a noncompetitive inhibitor by their effect on Km and Vmax'),
    T('Distinguish an irreversible from a reversible enzyme inhibitor by recovery of activity after removal'),
    T('Differentiate simple diffusion from facilitated diffusion by carrier protein dependence'),
    T('Distinguish primary active transport from secondary active transport by direct versus indirect ATP use'),
  ],
  Immunology: [
    T('Differentiate a primary from a secondary antibody response by isotype, magnitude, and latency'),
    T('Distinguish central tolerance from peripheral tolerance by anatomical location and mechanism'),
    T('Differentiate innate from adaptive immunity by specificity and immunological memory'),
  ],
  Embryology: [
    T('Differentiate the yolk sac stage from the fetal liver stage of hematopoiesis by anatomical site and timing'),
    T('Distinguish a primary from a secondary ossification center by timing and location'),
    T('Differentiate first-trimester chorionic villi from third-trimester chorionic villi by structural maturity'),
  ],
  Pharmacology: [
    T('Differentiate a full agonist from a partial agonist by maximal efficacy'),
    T('Distinguish a competitive antagonist from a noncompetitive antagonist by its effect on the dose-response curve'),
    T('Differentiate zero-order from first-order drug elimination kinetics by the relationship between dose and clearance rate'),
  ],
};

async function main() {
  const system = await database.system.upsert({
    where: { examType_name: { examType: EXAM_TYPE, name: AI_SYSTEM_NAME } },
    create: { examType: EXAM_TYPE, name: AI_SYSTEM_NAME, sortOrder: 999 },
    update: {},
  });

  let totalCreated = 0;
  for (const [discipline, titles] of Object.entries(TITLES_BY_DISCIPLINE)) {
    const existing = await database.learningObjective.findMany({
      where: { systemId: system.id, discipline },
      select: { title: true },
    });
    const existingTitles = new Set(existing.map((e) => e.title.trim().toLowerCase()));
    const seen = new Set();
    const toCreate = titles.filter((t) => {
      const key = t.title.trim().toLowerCase();
      if (existingTitles.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (toCreate.length) {
      await database.learningObjective.createMany({
        data: toCreate.map(({ title, requiresTable }) => ({
          systemId: system.id,
          examType: EXAM_TYPE,
          discipline,
          title,
          requiresTable,
          yieldWeight: 50,
        })),
      });
    }

    totalCreated += toCreate.length;
    console.log(discipline, '->', toCreate.length, 'new titles added (', titles.length - toCreate.length, 'duplicates skipped )');
  }

  console.log('TOTAL new titles created:', totalCreated);
  await database.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
