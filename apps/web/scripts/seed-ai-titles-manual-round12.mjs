// One-off script: twelfth batch of hand-authored (not model-generated)
// topic titles — new veins this round: physical exam signs/maneuvers,
// tumor markers and lab-value pattern recognition, specific
// receptor/drug-mechanism cases, hormone axis feedback, and a few more
// organism-disease pairs. Written directly, not produced by calling an LLM
// API — only the FULL QUESTION content is ever generated lazily by AI
// later, on first use, exactly as before.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Diagnose anterior tibial displacement on knee examination as a positive anterior drawer sign for ACL injury'),
    T('Recognize a palpable clunk during knee rotation and extension as a positive McMurray test for meniscal tear'),
    T('Identify decreased radial pulse with arm abduction and external rotation as a positive Adson test for thoracic outlet syndrome'),
    T('Diagnose diminished blood flow to the hand after releasing compression on one artery as an abnormal Allen test result'),
    T('Recognize reproduction of radiating leg pain with passive leg elevation as a positive straight leg raise test for disc herniation'),
    T('Identify a positive Tinel sign at the wrist as suggestive of carpal tunnel syndrome'),
  ],
  Pathology: [
    T('Recognize pain on passive extension of the hip as a positive psoas sign in appendicitis'),
    T('Identify pain on internal rotation of the flexed hip as a positive obturator sign in appendicitis'),
    T('Diagnose pain at McBurney point with rebound tenderness as suggestive of acute appendicitis'),
    T('Recognize increased pain in the right lower quadrant during left-sided palpation as a positive Rovsing sign'),
    T('Identify inspiratory arrest during right upper quadrant palpation as a positive Murphy sign in cholecystitis'),
    T('Diagnose neck flexion causing involuntary hip and knee flexion as a positive Brudzinski sign in meningitis'),
    T('Recognize pain and resistance with passive knee extension after hip flexion as a positive Kernig sign in meningitis'),
    T('Identify calf pain with passive dorsiflexion of the foot as a positive Homans sign in deep vein thrombosis'),
    T('Recognize an elevated CA-125 level in a postmenopausal woman with an adnexal mass as suggestive of ovarian cancer'),
    T('Identify an elevated CA 19-9 level in a patient with painless jaundice as suggestive of pancreatic cancer'),
    T('Diagnose an elevated carcinoembryonic antigen (CEA) level as a marker used to monitor colorectal cancer recurrence'),
    T('Recognize an elevated alpha-fetoprotein in a patient with a liver mass as suggestive of hepatocellular carcinoma'),
    T('Identify an elevated PSA level in an elderly man as prompting further evaluation for prostate cancer'),
    T('Diagnose elevated beta-hCG and elevated AFP in a young man with a testicular mass as suggestive of a mixed germ cell tumor'),
    T('Recognize an elevated calcitonin level in a patient with a thyroid nodule as suggestive of medullary thyroid carcinoma'),
    T('Identify an elevated D-dimer in a patient with leg swelling and pleuritic chest pain as suggestive of venous thromboembolism'),
    T('Diagnose an elevated troponin level in a patient with chest pain as indicating myocardial injury'),
    T('Recognize an elevated BNP level in a patient with dyspnea as suggestive of heart failure'),
    T('Identify markedly elevated ESR and CRP in a patient with jaw claudication as suggestive of giant cell arteritis'),
    T('Diagnose an elevated ferritin with a normal or low TIBC as suggestive of an inflammatory process rather than iron deficiency'),
    T('Recognize elevated uric acid after starting chemotherapy for a hematologic malignancy as suggestive of tumor lysis syndrome'),
    T('Identify elevated serum lipase and amylase with epigastric pain radiating to the back as suggestive of acute pancreatitis'),
    T('Diagnose an isolated elevated alkaline phosphatase with normal liver enzymes as suggestive of a bone process rather than liver disease'),
  ],
  Pharmacology: [
    T('Recognize dose-dependent dopamine effects ranging from renal vasodilation to alpha-adrenergic vasoconstriction'),
    T('Identify dobutamine as a beta-1 selective agonist used to increase cardiac contractility in heart failure'),
    T('Diagnose reflex bradycardia after phenylephrine administration as a result of pure alpha-1 agonism'),
    T('Recognize QT prolongation risk in a patient on ondansetron as a class effect of 5-HT3 receptor antagonists'),
    T('Identify milrinone as a phosphodiesterase-3 inhibitor used to increase contractility in acute heart failure'),
    T('Diagnose hearing loss in a patient on high-dose furosemide as loop diuretic-induced ototoxicity'),
    T('Recognize the mechanism of sildenafil as inhibition of phosphodiesterase-5 to enhance nitric oxide signaling'),
  ],
  Physiology: [
    T('Explain the growth hormone-IGF-1 axis and its negative feedback regulation'),
    T('Recognize cortisol’s negative feedback suppression of CRH and ACTH secretion'),
    T('Identify testosterone’s negative feedback suppression of GnRH and LH secretion'),
    T('Diagnose the unique positive feedback effect of high estrogen levels triggering the LH surge before ovulation'),
    T('Recognize the aldosterone escape phenomenon as preventing continued sodium retention despite persistent hyperaldosteronism'),
  ],
  Microbiology: [
    T('Recognize fever and hemolytic anemia with ring forms on blood smear in an asplenic patient after a tick bite as babesiosis'),
    T('Identify fever with morulae inside leukocytes after a tick bite as ehrlichiosis or anaplasmosis'),
    T('Diagnose tender regional lymphadenopathy after a cat scratch as cat-scratch disease from Bartonella henselae'),
    T('Recognize rapidly spreading cellulitis after a dog or cat bite as Pasteurella multocida infection'),
    T('Identify sepsis in an asplenic patient after a dog bite as Capnocytophaga canimorsus infection'),
    T('Diagnose severe bullous skin lesions and sepsis after eating raw oysters in a cirrhotic patient as Vibrio vulnificus infection'),
    T('Recognize gas gangrene without a clear wound in a patient with colon cancer as Clostridium septicum infection'),
  ],
  Genetics: [
    T('Recognize the use of expanded carrier screening panels in couples of Ashkenazi Jewish descent for recessive conditions'),
    T('Identify cascade genetic testing as offering testing to at-risk relatives once a familial mutation is identified'),
    T('Diagnose the use of preimplantation genetic diagnosis in couples with a known heritable disease'),
  ],
  Biochemistry: [
    T('Recognize elevated homocysteine with normal methylmalonic acid as suggestive of folate deficiency rather than B12 deficiency'),
    T('Identify elevated methylmalonic acid and homocysteine together as suggestive of vitamin B12 deficiency'),
    T('Diagnose a low reticulocyte count in the setting of anemia as suggestive of a bone marrow production problem'),
    T('Recognize an elevated reticulocyte count in the setting of anemia as suggestive of ongoing hemolysis or blood loss'),
  ],
  Immunology: [
    T('Recognize a low CD4 count with a normal CD8 count as characteristic of HIV infection progression'),
    T('Identify a positive PPD skin test in a patient with prior BCG vaccination as a potential false positive'),
    T('Diagnose an elevated total IgE with recurrent skin and lung infections as suggestive of hyper-IgE syndrome'),
    T('Recognize low levels of all immunoglobulin classes in an infant older than six months as suggestive of a humoral immunodeficiency rather than physiologic hypogammaglobulinemia'),
  ],
  'Behavioral Science': [
    T('Recognize a physician disclosing a medical error to a patient as fulfilling an ethical obligation of honesty'),
    T('Identify a minor seeking treatment for a sexually transmitted infection without parental consent as generally permitted by law'),
    T('Diagnose a patient requesting to stop life-sustaining treatment while retaining decision-making capacity as an autonomous right'),
    T('Recognize a physician’s refusal to perform a legal procedure based on personal beliefs as an exercise of conscientious objection'),
  ],
  Embryology: [
    T('Recognize thalidomide-induced limb reduction defects as resulting from exposure during the critical period of limb development'),
    T('Identify a teratogen exposure during the fetal period as more likely to cause growth restriction than major structural malformation'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize a study reporting a wide confidence interval as reflecting greater uncertainty in the point estimate'),
    T('Identify a trial with a small sample size and a null result as unable to rule out a true effect due to inadequate power'),
    T('Diagnose a subgroup analysis showing significance only in a small subset as at risk of a false positive from multiple testing'),
  ],
  Histology: [
    T('Differentiate a primary lymphoid follicle from a secondary lymphoid follicle by the presence of a germinal center'),
    T('Distinguish active plasma cells from resting B lymphocytes by cytoplasmic and nuclear features'),
    T('Differentiate the zona glomerulosa from the zona fasciculata of the adrenal cortex by hormone product'),
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
