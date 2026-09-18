// One-off script: fourteenth batch of hand-authored (not model-generated)
// topic titles — new veins this round: more physical exam eponymous signs
// (abdominal, cardiac auscultation/pulse findings), peripheral blood smear
// findings, classic imaging signs, specific anesthesia/opioid pharmacology,
// RASopathy genetic syndromes, heart sound/murmur physiology, fungal and
// parasite morphology pairs, autoantibody patterns, inborn error odor/test
// findings, and a handful of ethics/biostatistics concepts. Written
// directly, not produced by calling an LLM API — only the FULL QUESTION
// content is ever generated lazily by AI later, on first use.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize unequal knee height when the hips and knees are flexed as a positive Galeazzi (Allis) sign for developmental hip dislocation'),
  ],
  Pathology: [
    T('Recognize periumbilical ecchymosis as a positive Cullen sign suggestive of retroperitoneal or intra-abdominal hemorrhage'),
    T('Identify flank ecchymosis as a positive Grey Turner sign suggestive of retroperitoneal hemorrhage in acute pancreatitis'),
    T('Diagnose pain with cervical motion and gallbladder-like jarring on pelvic exam as a positive chandelier sign in pelvic inflammatory disease'),
    T('Recognize a palpable, nontender, distended gallbladder with painless jaundice as a positive Courvoisier sign suggestive of pancreatic head malignancy'),
    T('Identify increased abdominal wall tenderness when tensing the rectus muscles as a positive Carnett sign indicating an abdominal wall source of pain'),
    T('Recognize a bounding pulse with rapid rise and collapse as a water-hammer (Corrigan) pulse in severe aortic regurgitation'),
    T('Identify alternating flushing and blanching of the nail bed with light pressure as a positive Quincke sign in aortic regurgitation'),
    T('Diagnose a to-and-fro murmur heard over the femoral artery with proximal compression as a positive Duroziez sign in aortic regurgitation'),
    T('Recognize head bobbing synchronous with the heartbeat as a positive de Musset sign in aortic regurgitation'),
    T('Identify an exaggerated fall in systolic blood pressure with inspiration as pulsus paradoxus in cardiac tamponade'),
    T('Diagnose a weak and delayed carotid upstroke as pulsus parvus et tardus in severe aortic stenosis'),
    T('Recognize relief of angina-like chest pain with a clenched fist held over the sternum as a positive Levine sign'),
    T('Identify a pistol-shot sound auscultated over the femoral artery as a positive Traube sign in aortic regurgitation'),
    T('Recognize stacked red blood cells resembling a stack of coins as rouleaux formation suggestive of multiple myeloma'),
    T('Identify smudge cells on peripheral blood smear as characteristic of chronic lymphocytic leukemia'),
    T('Diagnose toxic granulation and Döhle bodies in neutrophils as suggestive of severe bacterial infection'),
    T('Recognize a left shift with increased band neutrophils as suggestive of acute bacterial infection'),
    T('Recognize free air under the diaphragm on upright chest x-ray as suggestive of a perforated abdominal viscus'),
    T('Identify the Rigler sign on abdominal x-ray as air outlining both sides of the bowel wall suggestive of pneumoperitoneum'),
    T('Diagnose a football-shaped lucency on supine abdominal x-ray as the football sign of massive pneumoperitoneum'),
    T('Recognize a solitary dilated loop of bowel on x-ray as a sentinel loop suggestive of adjacent inflammation'),
    T('Identify a corkscrew appearance of the esophagus on barium swallow as suggestive of diffuse esophageal spasm'),
    T('Diagnose a bird’s beak appearance on barium swallow as suggestive of achalasia'),
    T('Recognize a string of beads appearance on renal angiography as suggestive of fibromuscular dysplasia'),
  ],
  Pharmacology: [
    T('Differentiate morphine from fentanyl by lipophilicity and onset of action'),
    T('Recognize methadone as a long-acting opioid agonist used in opioid use disorder maintenance therapy'),
    T('Identify buprenorphine as a partial mu-opioid agonist with a ceiling effect on respiratory depression'),
    T('Diagnose bradycardia and hypotension after remifentanil administration as an expected effect of this ultra-short-acting opioid'),
    T('Recognize propofol as an induction agent that can cause significant hypotension via vasodilation'),
    T('Identify etomidate as an induction agent favored in hemodynamically unstable patients due to minimal cardiovascular effects'),
    T('Diagnose emergence delirium and dissociative effects after ketamine administration as an expected adverse effect'),
    T('Recognize flushing, pruritus, and hypotension after rapid vancomycin infusion as red man syndrome'),
    T('Identify daptomycin as inactivated by pulmonary surfactant and therefore ineffective for pneumonia'),
    T('Diagnose pseudomembranous colitis after clindamycin use as Clostridioides difficile infection'),
  ],
  Genetics: [
    T('Recognize a patient with a large head, coarse facial features, and a predisposition to cardiac hypertrophy as Costello syndrome'),
    T('Identify cardiofaciocutaneous syndrome as a RASopathy with features overlapping Costello and Noonan syndromes'),
    T('Diagnose a patient with lentigines, ECG abnormalities, ocular hypertelorism, and deafness as LEOPARD syndrome (Noonan syndrome with multiple lentigines)'),
    T('Recognize focal dermal hypoplasia with linear skin defects and limb anomalies as Goltz syndrome'),
    T('Identify asymmetric overgrowth of limbs and skin with cerebriform connective tissue nevi as Proteus syndrome'),
  ],
  Physiology: [
    T('Recognize a low-pitched extra heart sound after S2 as an S3 gallop suggestive of volume overload or heart failure'),
    T('Identify a low-pitched extra heart sound before S1 as an S4 gallop suggestive of a stiff, noncompliant ventricle'),
    T('Diagnose a split S2 that does not vary with respiration as fixed splitting suggestive of an atrial septal defect'),
    T('Recognize an S2 split that widens with expiration as paradoxical splitting suggestive of left bundle branch block or severe aortic stenosis'),
    T('Identify a split S2 that widens with inspiration as physiologically normal wide splitting'),
    T('Diagnose a holosystolic murmur best heard at the apex radiating to the axilla as mitral regurgitation'),
    T('Recognize a crescendo-decrescendo systolic murmur radiating to the carotids as aortic stenosis'),
    T('Identify an increase in murmur intensity during the strain phase of the Valsalva maneuver as suggestive of hypertrophic cardiomyopathy'),
    T('Diagnose an early diastolic opening snap followed by a diastolic rumble as mitral stenosis'),
    T('Recognize a mid-systolic click as suggestive of mitral valve prolapse'),
  ],
  Microbiology: [
    T('Recognize ring forms or a Maltese cross tetrad on blood smear in a febrile asplenic patient as Babesia microti infection'),
    T('Identify banana-shaped gametocytes on blood smear as characteristic of Plasmodium falciparum'),
    T('Diagnose sulfur granules draining from a jaw abscess as suggestive of Actinomyces israelii infection'),
    T('Recognize beaded, branching, partially acid-fast filaments on Gram stain as suggestive of Nocardia infection'),
    T('Identify a "spaghetti and meatballs" appearance on skin scraping as Malassezia (tinea versicolor)'),
    T('Diagnose broad-based budding yeast on tissue biopsy as Blastomyces dermatitidis'),
    T('Recognize spherules containing endospores on histology as diagnostic of Coccidioides immitis'),
    T('Identify narrow-based budding yeast with a thick capsule on India ink stain as Cryptococcus neoformans'),
    T('Diagnose septate hyphae branching at acute angles as characteristic of Aspergillus species'),
  ],
  Immunology: [
    T('Recognize a positive p-ANCA with myeloperoxidase specificity as suggestive of microscopic polyangiitis or eosinophilic granulomatosis with polyangiitis'),
    T('Identify a positive c-ANCA with proteinase-3 specificity as suggestive of granulomatosis with polyangiitis'),
    T('Diagnose a positive anti-histone antibody as suggestive of drug-induced lupus'),
    T('Recognize a positive anti-La (SSB) and anti-Ro (SSA) antibody as suggestive of Sjögren syndrome'),
    T('Identify a positive anti-U1-RNP antibody as suggestive of mixed connective tissue disease'),
    T('Diagnose a positive rapid plasma reagin (RPR) test as a nontreponemal screening test requiring confirmation for syphilis'),
  ],
  Biochemistry: [
    T('Recognize a positive nitroprusside test for ketone bodies as indicative of diabetic ketoacidosis or starvation ketosis'),
    T('Differentiate hereditary fructose intolerance from essential fructosuria (fructokinase deficiency) by clinical severity'),
    T('Distinguish classic galactosemia from galactokinase deficiency by systemic involvement versus cataracts alone'),
    T('Recognize a positive urine ferric chloride test as suggestive of phenylketonuria'),
    T('Diagnose a musty body odor in an infant with intellectual disability and fair skin as suggestive of phenylketonuria'),
    T('Identify a cabbage-like odor in a newborn with liver failure as suggestive of tyrosinemia'),
  ],
  Embryology: [
    T('Identify a patent vitellointestinal duct presenting with fecal drainage from the umbilicus in an infant'),
    T('Recognize lingual thyroid as ectopic thyroid tissue at the base of the tongue from failure of thyroid descent'),
  ],
  'Behavioral Science': [
    T('Diagnose a physician continuing to treat a patient after termination of the relationship in an emergency as an ethical obligation to avoid patient abandonment'),
    T('Recognize the use of the "teach-back" method as a technique to confirm patient understanding of instructions'),
    T('Identify the four-box method (medical indications, patient preferences, quality of life, contextual features) as a systematic approach to clinical ethics case analysis'),
    T('Recognize physician self-disclosure to a patient as generally discouraged unless it clearly benefits the therapeutic relationship'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Diagnose a factorial trial design as testing two or more interventions and their interaction simultaneously'),
    T('Recognize a stepped-wedge trial design as sequentially rolling out an intervention to all clusters over time'),
  ],
  Histology: [
    T('Distinguish the papillary dermis from the reticular dermis by collagen fiber organization and thickness'),
    T('Differentiate the pars fasciculata from the pars reticularis of the adrenal cortex by cell cord arrangement'),
    T('Distinguish the pars distalis from the pars nervosa of the pituitary gland by embryological origin and secretory cell type'),
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
