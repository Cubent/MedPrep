// One-off script: twenty-third, closing batch for the second large
// multi-round push toward 1000 more new titles. Same relaxed standard as
// round 22 — similar-but-not-identical to existing titles is acceptable;
// the exact-match case-insensitive dedup is the sole gate. Written directly,
// not produced by calling an LLM API — only the FULL QUESTION content is
// ever generated lazily by AI later, on first use.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize the median nerve as at risk during elbow supracondylar fractures in children'),
    T('Identify the radial nerve as at risk during midshaft humeral fractures'),
    T('Diagnose the axillary nerve as at risk during surgical neck of humerus fractures and anterior shoulder dislocations'),
    T('Recognize the common fibular nerve as at risk during fibular neck fractures or prolonged leg crossing'),
    T('Identify the tibial nerve as at risk during posterior knee dislocations'),
    T('Diagnose the long thoracic nerve as at risk during axillary lymph node dissection'),
    T('Recognize the spinal accessory nerve as at risk during posterior triangle neck surgery'),
    T('Identify the recurrent laryngeal nerve as at risk during thyroidectomy'),
    T('Diagnose the ilioinguinal nerve as at risk during inguinal hernia repair'),
    T('Recognize the genitofemoral nerve as at risk during retroperitoneal or inguinal surgery'),
  ],
  Pathology: [
    T('Recognize a positive urine culture with more than 100,000 colony-forming units as diagnostic of a urinary tract infection'),
    T('Identify pyuria and bacteriuria on urinalysis as supportive of a urinary tract infection diagnosis'),
    T('Diagnose white cell casts on urinalysis as suggestive of pyelonephritis rather than a lower urinary tract infection'),
    T('Recognize eosinophiluria as a classic but insensitive finding in acute interstitial nephritis'),
    T('Identify fatty casts on urinalysis as suggestive of nephrotic syndrome'),
    T('Diagnose red cell casts on urinalysis as suggestive of glomerulonephritis'),
    T('Recognize hyaline casts as a nonspecific finding that can occur in concentrated normal urine'),
    T('Identify a positive leukocyte esterase and nitrite test as supportive of a urinary tract infection'),
    T('Diagnose sterile pyuria as suggestive of a partially treated UTI, urethritis, or less commonly tuberculosis'),
    T('Recognize a positive urine pregnancy test as the first step in evaluating a woman of reproductive age with abdominal pain'),
  ],
  Pharmacology: [
    T('Recognize atropine as a muscarinic antagonist used to treat symptomatic bradycardia'),
    T('Identify atropine as used as an antidote for cholinergic toxicity from organophosphate poisoning'),
    T('Diagnose glycopyrrolate as an anticholinergic used to reduce secretions during anesthesia'),
    T('Recognize physostigmine as a reversible acetylcholinesterase inhibitor used for anticholinergic toxicity'),
    T('Identify neostigmine as used to reverse nondepolarizing neuromuscular blockade after surgery'),
    T('Diagnose edrophonium as a short-acting acetylcholinesterase inhibitor historically used to diagnose myasthenia gravis'),
    T('Recognize pyridostigmine as a longer-acting acetylcholinesterase inhibitor used for chronic myasthenia gravis management'),
    T('Identify bethanechol as a direct muscarinic agonist used to treat urinary retention'),
    T('Diagnose methacholine as used in a bronchial challenge test to diagnose asthma'),
    T('Recognize atropine as causing mydriasis and cycloplegia when applied topically to the eye'),
  ],
  Biochemistry: [
    T('Recognize glycolysis as occurring in the cytoplasm, converting glucose to pyruvate with a net gain of two ATP'),
    T('Identify hexokinase (or glucokinase in the liver) as the enzyme trapping glucose within the cell by phosphorylation'),
    T('Diagnose phosphofructokinase-1 as the rate-limiting and most highly regulated enzyme of glycolysis'),
    T('Recognize pyruvate dehydrogenase as linking glycolysis to the TCA cycle by converting pyruvate to acetyl-CoA'),
    T('Identify a deficiency of pyruvate dehydrogenase as causing lactic acidosis and neurologic impairment'),
    T('Diagnose glycogenolysis as the breakdown of glycogen to glucose-1-phosphate, primarily in liver and muscle'),
    T('Recognize glycogen phosphorylase as the rate-limiting enzyme of glycogenolysis'),
    T('Identify glycogen synthase as the rate-limiting enzyme of glycogen synthesis'),
    T('Diagnose insulin as promoting glycogen synthesis and inhibiting glycogenolysis'),
    T('Recognize glucagon and epinephrine as promoting glycogenolysis and inhibiting glycogen synthesis'),
  ],
  Physiology: [
    T('Recognize residual volume plus expiratory reserve volume as equal to functional residual capacity'),
    T('Identify inspiratory capacity as the sum of tidal volume and inspiratory reserve volume'),
    T('Diagnose minute ventilation as the product of tidal volume and respiratory rate'),
    T('Recognize alveolar ventilation as minute ventilation minus dead space ventilation'),
    T('Identify physiologic dead space as approximately equal to anatomic dead space in a healthy lung'),
    T('Diagnose a ventilation-perfusion mismatch as a common cause of hypoxemia in lung disease'),
    T('Recognize a right-to-left shunt as causing hypoxemia that does not fully correct with supplemental oxygen'),
    T('Identify diffusion limitation as a cause of hypoxemia that worsens with exercise, as in interstitial lung disease'),
    T('Diagnose hypoventilation as a cause of hypoxemia accompanied by an elevated PCO2'),
    T('Recognize the alveolar gas equation as used to calculate the alveolar-arterial oxygen gradient'),
  ],
  Microbiology: [
    T('Recognize Streptococcus agalactiae (group B strep) as a leading cause of neonatal sepsis and meningitis'),
    T('Identify universal prenatal screening for group B strep as recommended in the third trimester'),
    T('Diagnose intrapartum antibiotic prophylaxis as used to prevent early-onset neonatal group B strep disease'),
    T('Recognize Ureaplasma and Mycoplasma species as lacking a cell wall, making them intrinsically resistant to beta-lactam antibiotics'),
    T('Identify Rickettsia rickettsii as the causative agent of Rocky Mountain spotted fever'),
    T('Diagnose a rash beginning on the wrists and ankles and spreading centrally as suggestive of Rocky Mountain spotted fever'),
    T('Recognize Ehrlichia chaffeensis as transmitted by the lone star tick, causing ehrlichiosis'),
    T('Identify Babesia microti as transmitted by the same Ixodes tick that transmits Lyme disease'),
    T('Diagnose co-infection with Borrelia burgdorferi and Babesia microti as possible after a single tick bite'),
    T('Recognize doxycycline as the empiric treatment of choice for suspected Rocky Mountain spotted fever, even in children'),
  ],
  Immunology: [
    T('Recognize the innate immune system as providing a rapid, nonspecific first line of defense against pathogens'),
    T('Identify the adaptive immune system as providing a slower but highly specific and long-lasting immune response'),
    T('Diagnose neutrophils as the most abundant circulating white blood cell and the primary responder to acute bacterial infection'),
    T('Recognize eosinophils as primarily involved in defense against parasitic infections and allergic responses'),
    T('Identify basophils and mast cells as releasing histamine and other mediators during allergic reactions'),
    T('Diagnose monocytes as circulating precursors that differentiate into tissue macrophages'),
    T('Recognize macrophages as phagocytic cells that also present antigen to T cells'),
    T('Identify the skin and mucous membranes as the body\'s first line of physical defense against pathogens'),
    T('Diagnose lysozyme in tears and saliva as an innate antimicrobial enzyme that degrades bacterial cell walls'),
    T('Recognize the acute phase response as an innate systemic reaction to infection or tissue injury'),
  ],
  Genetics: [
    T('Recognize a pedigree showing an affected child with two unaffected parents as suggestive of autosomal recessive inheritance'),
    T('Identify a pedigree showing an affected individual in every generation as suggestive of autosomal dominant inheritance'),
    T('Diagnose a pedigree with no male-to-male transmission as suggestive of X-linked inheritance'),
    T('Recognize a pedigree with only affected males as suggestive of X-linked recessive inheritance'),
    T('Identify a pedigree with all offspring of an affected mother being affected as suggestive of mitochondrial inheritance'),
    T('Diagnose a recurrence risk of 25% as expected for two carrier parents of an autosomal recessive condition'),
    T('Recognize a recurrence risk of 50% as expected for one affected parent with an autosomal dominant condition'),
    T('Identify a recurrence risk of 50% for sons as expected when the mother is a carrier of an X-linked recessive condition'),
    T('Diagnose genetic testing as most informative when combined with a detailed three-generation family history'),
    T('Recognize a de novo mutation as explaining an affected child with no family history of a genetic disorder'),
  ],
  Embryology: [
    T('Recognize week 2 of development as following the "rule of twos," with bilaminar disc formation'),
    T('Identify week 3 of development as the period of gastrulation and trilaminar disc formation'),
    T('Diagnose weeks 4 through 8 as the period of organogenesis, when the embryo is most vulnerable to teratogens'),
    T('Recognize the fetal period (week 9 onward) as primarily involving growth and maturation of already-formed organs'),
    T('Identify fertilization as normally occurring in the ampulla of the fallopian tube'),
    T('Diagnose the zygote as undergoing cleavage divisions to form a morula, then a blastocyst'),
    T('Recognize implantation as occurring approximately 6 days after fertilization'),
    T('Identify the corpus luteum as maintaining early pregnancy until the placenta takes over hormone production around week 8-10'),
    T('Diagnose beta-hCG as detectable in maternal serum shortly after implantation, forming the basis of pregnancy testing'),
    T('Recognize an abnormally low or plateauing beta-hCG rise as suggestive of a nonviable or ectopic pregnancy'),
  ],
  Histology: [
    T('Recognize the pleura as a serous membrane consisting of visceral and parietal layers surrounding the lungs'),
    T('Identify the pericardium as a serous membrane surrounding the heart, analogous to the pleura'),
    T('Diagnose the peritoneum as a serous membrane lining the abdominal cavity and covering abdominal organs'),
    T('Recognize mesothelium as the simple squamous epithelium lining serous cavities'),
    T('Identify synovium as the specialized connective tissue lining joint cavities, producing lubricating synovial fluid'),
    T('Diagnose articular cartilage as lacking a perichondrium, limiting its capacity for repair after injury'),
    T('Recognize the periosteum as a fibrous membrane covering the outer surface of bone, containing osteoprogenitor cells'),
    T('Identify the endosteum as lining the internal surfaces of bone, including the medullary cavity'),
    T('Diagnose the growth plate (epiphyseal plate) as the site of longitudinal bone growth in children'),
    T('Recognize closure of the growth plate as marking the end of longitudinal bone growth at the end of puberty'),
  ],
  'Behavioral Science': [
    T('Recognize the placebo effect as a therapeutic response occurring due to the expectation of benefit rather than the treatment itself'),
    T('Identify the nocebo effect as the occurrence of adverse symptoms due to the expectation of harm'),
    T('Diagnose the Hawthorne effect as a change in behavior resulting from awareness of being observed'),
    T('Recognize malingering as the conscious feigning of illness for external gain'),
    T('Identify factitious disorder as the conscious feigning of illness for internal psychological gain'),
    T('Diagnose somatic symptom disorder as excessive distress about physical symptoms regardless of an identifiable medical cause'),
    T('Recognize illness anxiety disorder as persistent worry about having a serious illness despite minimal or no symptoms'),
    T('Identify conversion disorder as neurologic symptoms that are inconsistent with recognized neurologic disease, associated with psychological stress'),
    T('Diagnose la belle indifférence as a classic but unreliable feature sometimes seen in conversion disorder'),
    T('Recognize secondary gain as an external benefit obtained from illness, such as financial compensation or attention'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize a forest plot as a graphical display summarizing individual study results within a meta-analysis'),
    T('Identify heterogeneity in a meta-analysis as variability in results between the included studies'),
    T('Diagnose a funnel plot as used to visually assess for publication bias in a meta-analysis'),
    T('Recognize a fixed-effects model as assuming a single true effect size across all included studies'),
    T('Identify a random-effects model as accounting for variability in the true effect size across studies'),
    T('Diagnose a subgroup analysis as exploring whether an effect differs across predefined patient subgroups'),
    T('Recognize a sensitivity analysis as testing whether study conclusions are robust to changes in assumptions or methods'),
    T('Identify clinical significance as distinct from statistical significance, reflecting real-world importance of a finding'),
    T('Diagnose a surrogate endpoint as a substitute measure used in place of a true clinical outcome'),
    T('Recognize a composite endpoint as combining multiple individual outcomes into a single measure'),
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
