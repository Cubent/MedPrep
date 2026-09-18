// One-off script: eleventh batch of hand-authored (not model-generated)
// topic titles, continuing the "differentiate along a continuum" style.
// Written directly, not produced by calling an LLM API — only the FULL
// QUESTION content is ever generated lazily by AI later, on first use.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Histology: [
    T('Differentiate Merkel cells from Langerhans cells in the epidermis by their function'),
    T('Distinguish neutrophils from eosinophils by their granule staining characteristics'),
    T('Differentiate eosinophils from basophils by granule size and staining'),
    T('Distinguish mast cells from basophils by tissue location versus circulating presence'),
    T('Differentiate osteocytes from osteoblasts by their location and activity within bone'),
    T('Distinguish chondrocytes from osteocytes by the matrix each resides in'),
    T('Differentiate the macula densa from juxtaglomerular cells by their function within the juxtaglomerular apparatus'),
    T('Distinguish podocytes from mesangial cells by their function in the glomerulus'),
    T('Differentiate Type A intercalated cells from Type B intercalated cells by their role in acid-base balance'),
    T('Distinguish reticular fibers from collagen fibers by thickness and staining pattern'),
    T('Differentiate elastic fibers from collagen fibers by their mechanical properties'),
    T('Distinguish red blood cells from reticulocytes on a peripheral blood smear by staining characteristics'),
  ],
  Anatomy: [
    T('Differentiate the superficial fascia from the deep fascia by composition and function'),
    T('Distinguish the extensor compartment from the flexor compartment of the forearm by nerve supply'),
    T('Differentiate the anterior compartment from the posterior compartment of the thigh by muscle action and nerve supply'),
    T('Distinguish the anterior compartment from the posterior compartment of the leg by muscle action and nerve supply'),
    T('Differentiate the rotator cuff muscles from the deltoid by their role in shoulder abduction'),
    T('Distinguish the primary muscles of respiration from the accessory muscles of respiration by their level of activity'),
    T('Differentiate the intrinsic muscles of the larynx from the extrinsic muscles by their function'),
    T('Distinguish the intrinsic muscles of the tongue from the extrinsic muscles by their attachments and actions'),
    T('Differentiate the intrinsic muscles of the hand from the extrinsic muscles by their origin'),
    T('Distinguish the anterior pituitary from the posterior pituitary by embryological origin and hormone release mechanism'),
    T('Differentiate the anterior horn from the posterior horn of the spinal cord gray matter by function'),
  ],
  Physiology: [
    T('Differentiate a positive feedback loop from a negative feedback loop using a physiological example'),
    T('Distinguish autocrine signaling from paracrine signaling by the distance the signal travels'),
    T('Differentiate paracrine signaling from endocrine signaling by the distance the signal travels'),
    T('Distinguish steroid hormone mechanisms from peptide hormone mechanisms by receptor location'),
    T('Differentiate a first messenger from a second messenger in a signal transduction pathway'),
    T('Distinguish alpha-adrenergic receptor effects from beta-adrenergic receptor effects on target tissues'),
    T('Differentiate muscarinic receptor effects from nicotinic receptor effects in the autonomic nervous system'),
    T('Distinguish alpha-1 receptor effects from alpha-2 receptor effects on vascular smooth muscle'),
  ],
  Pathology: [
    T('Differentiate dystrophic calcification from metastatic calcification by serum calcium levels'),
    T('Distinguish granulation tissue from mature scar tissue by cellularity and vascularity'),
    T('Differentiate wound healing by primary intention from healing by secondary intention'),
    T('Distinguish a keloid from a hypertrophic scar by tissue extension beyond the wound margin'),
    T('Differentiate systolic heart failure from diastolic heart failure by ejection fraction'),
    T('Distinguish left-sided heart failure from right-sided heart failure by the pattern of congestion'),
    T('Differentiate concentric cardiac hypertrophy from eccentric cardiac hypertrophy by the underlying hemodynamic stress'),
  ],
  Biochemistry: [
    T('Differentiate anabolism from catabolism by net energy use and molecule size change'),
    T('Distinguish an oxidation reaction from a reduction reaction by electron transfer direction'),
    T('Differentiate a hydrolysis reaction from a dehydration synthesis (condensation) reaction'),
    T('Distinguish cis fatty acids from trans fatty acids by their structure and health effects'),
    T('Differentiate HDL from LDL by their role in cholesterol transport'),
    T('Distinguish chylomicrons from VLDL by their site of synthesis and lipid cargo'),
  ],
  Immunology: [
    T('Differentiate active natural immunity from active artificial immunity by the route of antigen exposure'),
    T('Distinguish passive natural immunity from passive artificial immunity by the source of antibodies'),
    T('Differentiate the direct Coombs test from the indirect Coombs test by what each detects'),
    T('Distinguish Type II hypersensitivity from Type III hypersensitivity by the location of immune complex deposition'),
  ],
  Microbiology: [
    T('Differentiate a positive-sense RNA virus from a negative-sense RNA virus by the need for RNA-dependent RNA polymerase in the virion'),
    T('Distinguish a segmented viral genome from a nonsegmented genome by the potential for genetic reassortment'),
    T('Differentiate obligate intracellular bacteria from facultative intracellular bacteria by their growth requirements'),
    T('Distinguish spore-forming bacteria from non-spore-forming bacteria by their environmental resistance'),
    T('Differentiate typical bacterial pneumonia from atypical pneumonia by clinical presentation and chest x-ray findings'),
  ],
  Genetics: [
    T('Differentiate codominance from incomplete dominance by phenotype expression in heterozygotes'),
    T('Distinguish genetic linkage from independent assortment by chromosomal location of genes'),
    T('Differentiate chromosomal mosaicism from uniparental disomy by their underlying mechanism'),
    T('Distinguish numerical chromosomal abnormalities from structural chromosomal abnormalities by example'),
    T('Differentiate a balanced translocation from an unbalanced translocation by phenotypic consequence'),
  ],
  Embryology: [
    T('Differentiate monozygotic twinning from dizygotic twinning by zygote number and genetic identity'),
    T('Distinguish vertical transmission from horizontal transmission of an infection during pregnancy'),
  ],
  Pharmacology: [
    T('Differentiate ester local anesthetics from amide local anesthetics by their site of metabolism'),
    T('Distinguish selective beta-1 blockers from nonselective beta-blockers by their effect on beta-2 receptors'),
    T('Differentiate reversible acetylcholinesterase inhibitors from irreversible acetylcholinesterase inhibitors by duration of action'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Differentiate descriptive epidemiology from analytical epidemiology by study purpose'),
    T('Distinguish a blinded clinical trial from an open-label trial by participant and investigator awareness'),
  ],
  'Behavioral Science': [
    T('Differentiate an ego-syntonic symptom from an ego-dystonic symptom by the patient’s subjective relationship to it'),
    T('Distinguish insight-oriented psychotherapy from supportive psychotherapy by their therapeutic goals'),
    T('Differentiate indications for group therapy from indications for individual therapy'),
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
