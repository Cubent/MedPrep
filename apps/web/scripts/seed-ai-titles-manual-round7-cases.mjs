// One-off script: seventh batch of hand-authored (not model-generated)
// topic titles, continuing the specific clinical case/pattern-recognition
// vignette style. Written directly, not produced by calling an LLM API —
// only the FULL QUESTION content is ever generated lazily by AI later, on
// first use, exactly as before.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize wrist pain worsened by thumb movement with a positive Finkelstein test as de Quervain tenosynovitis'),
    T('Identify a finger that catches and locks when extended as trigger finger from flexor tendon stenosis'),
    T('Diagnose a finger that cannot extend at the distal interphalangeal joint after trauma as mallet finger'),
    T('Recognize a finger with flexion at the PIP joint and hyperextension at the DIP joint as a boutonnière deformity'),
    T('Identify a finger with hyperextension at the PIP joint and flexion at the DIP joint as a swan neck deformity'),
    T('Diagnose burning pain between the third and fourth toes worsened by tight shoes as Morton neuroma'),
    T('Recognize bowing of the legs outward at the knees as genu varum'),
    T('Identify knock-knee deformity with the knees angled inward as genu valgum'),
    T('Diagnose lateral curvature of the spine detected on a school screening exam as scoliosis'),
    T('Recognize forward slippage of one vertebral body over another as spondylolisthesis'),
    T('Identify leg pain relieved by leaning forward while walking as neurogenic claudication from spinal stenosis'),
    T('Diagnose leg pain radiating down the posterior thigh and calf as sciatica from lumbar nerve root compression'),
    T('Recognize weakness of great toe dorsiflexion and numbness of the first webspace as an L5 nerve root lesion'),
    T('Identify loss of the ankle reflex and numbness of the lateral foot as an S1 nerve root lesion', true),
  ],
  'Behavioral Science': [
    T('Recognize a hostage who develops sympathy for their captor as Stockholm syndrome'),
    T('Identify a high-achieving physician who feels like a fraud despite objective success as imposter syndrome'),
    T('Diagnose a patient who splits staff into all-good and all-bad categories as the defense mechanism of splitting'),
    T('Recognize a patient who expresses the opposite of an unacceptable unconscious feeling as reaction formation'),
    T('Identify a patient who redirects anger from a boss onto a family member as displacement'),
    T('Diagnose a patient who refuses to acknowledge a terminal diagnosis despite clear evidence as denial'),
    T('Recognize a patient who discusses a diagnosis in purely clinical, emotionless terms to avoid feelings as intellectualization'),
    T('Identify a patient who justifies an unacceptable behavior with a logical-sounding excuse as rationalization'),
    T('Diagnose a patient who expresses unconscious feelings through disruptive behavior rather than words as acting out'),
    T('Recognize a physician who reacts to a patient with unexplained strong emotion from their own past as countertransference'),
    T('Identify a resident with emotional exhaustion, depersonalization, and reduced sense of accomplishment as burnout'),
    T('Diagnose a nurse who feels emotionally depleted from repeated exposure to patient suffering as compassion fatigue'),
    T('Recognize a clinician unable to act on their ethical beliefs due to institutional constraints as moral distress'),
    T('Identify an adolescent struggling to form a coherent sense of self as identity diffusion'),
    T('Diagnose a patient who unconsciously adopts a caregiver’s mannerisms after a loss as identification'),
  ],
  Biochemistry: [
    T('Recognize an infant with kinky, brittle hair, hypotonia, and seizures as Menkes disease'),
    T('Identify a patient with low ceruloplasmin and copper accumulation in the liver and brain as Wilson disease'),
    T('Diagnose a newborn with hyperammonemia and elevated argininosuccinic acid as argininosuccinic aciduria'),
    T('Recognize a newborn with hyperammonemia and markedly elevated citrulline as citrullinemia'),
    T('Identify a newborn with severe hyperammonemia in the first days of life and orotic acid crystals as carbamoyl phosphate synthetase deficiency'),
    T('Diagnose a newborn with hyperammonemia unresponsive to typical urea cycle therapy as N-acetylglutamate synthase deficiency'),
    T('Recognize an infant with hypoketotic hypoglycemia and cardiomyopathy as very long chain acyl-CoA dehydrogenase deficiency'),
    T('Identify an infant with hypoglycemia and mild acidosis triggered by fasting as short chain acyl-CoA dehydrogenase deficiency'),
    T('Diagnose an infant with seizures, hypotonia, alopecia, and a rash unresponsive to biotin alone as multiple carboxylase deficiency'),
    T('Recognize an infant with macrocephaly and dystonia after a febrile illness as glutaric acidemia type 1'),
    T('Identify a patient with recurrent hypoglycemia and hepatomegaly relieved by frequent feeding as a glycogen storage disease'),
    T('Diagnose a newborn with poor feeding and a sweet-smelling urine odor as maple syrup urine disease'),
    T('Recognize an infant with vomiting and lethargy after a viral illness with microvesicular fatty liver as Reye syndrome and aspirin exposure'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize a study recruiting participants from a convenient but non-representative group as convenience sampling bias'),
    T('Identify a survey with a low response rate as at risk of nonresponse bias'),
    T('Diagnose a questionnaire with a high Cronbach alpha as demonstrating good internal consistency'),
    T('Recognize a diagnostic accuracy study using an imperfect reference standard as subject to verification bias'),
    T('Identify a diagnostic test evaluated only in severely ill patients as subject to spectrum bias'),
    T('Diagnose a trial using block randomization as ensuring balanced group sizes throughout enrollment'),
    T('Recognize a genetic association study where affected families are more likely to be identified as ascertainment bias'),
    T('Identify a study where one group receives more frequent monitoring, increasing detection of an outcome, as detection bias'),
    T('Diagnose a trial reporting a p-value of 0.04 as reaching conventional statistical significance at the 0.05 threshold'),
  ],
  Embryology: [
    T('Recognize a newborn with a heart on the right side and abnormally arranged abdominal organs as situs ambiguus (heterotaxy)'),
    T('Identify a newborn with the heart partially or fully outside the chest as ectopia cordis'),
    T('Diagnose a newborn with ectopia cordis, an abdominal wall defect, and a sternal cleft as pentalogy of Cantrell'),
    T('Recognize a newborn boy with deficient abdominal wall muscles, undescended testes, and urinary tract anomalies as prune belly syndrome'),
    T('Identify a male newborn with bilateral hydronephrosis and a distended bladder as posterior urethral valves'),
    T('Diagnose a newborn with exposed bladder mucosa on the lower abdominal wall as bladder exstrophy'),
    T('Recognize a newborn with the most severe form of bladder exstrophy involving the hindgut as cloacal exstrophy'),
    T('Identify an adolescent girl with cyclic abdominal pain and primary amenorrhea as an imperforate hymen with hydrocolpos'),
    T('Diagnose a newborn with one kidney fused across the midline as a horseshoe kidney'),
    T('Recognize an infant with a persistent connection between the bladder and umbilicus as a patent urachus'),
  ],
  Genetics: [
    T('Recognize a child with self-injurious behavior, sleep disturbance, and intellectual disability as Smith-Magenis syndrome'),
    T('Identify a child with elfin facies, a friendly personality, and hypercalcemia as Williams syndrome'),
    T('Diagnose a boy with a webbed neck, pulmonic stenosis, and short stature with a normal karyotype as Noonan syndrome'),
    T('Recognize a girl with normal development followed by regression and repetitive hand-wringing movements as Rett syndrome'),
    T('Identify a newborn with coloboma, heart defects, atresia of the choanae, and ear anomalies as CHARGE syndrome'),
    T('Diagnose an infant with cholestasis, a heart murmur, and butterfly-shaped vertebrae as Alagille syndrome'),
    T('Recognize a child with short stature, photosensitivity, and a predisposition to cancer as Bloom syndrome'),
    T('Identify a child with pancytopenia, short stature, and radial limb defects as Fanconi anemia'),
    T('Diagnose a patient with recurrent pancreatitis, diabetes, and exocrine insufficiency with a family history as hereditary pancreatitis'),
    T('Recognize a patient with tumors of the pituitary, parathyroid, and pancreas as multiple endocrine neoplasia type 1', true),
    T('Identify a patient with medullary thyroid carcinoma, pheochromocytoma, and mucosal neuromas as multiple endocrine neoplasia type 2B'),
  ],
  Histology: [
    T('Identify Anitschkow cells on cardiac biopsy as characteristic of rheumatic fever myocarditis'),
    T('Recognize ferruginous bodies on lung biopsy as evidence of asbestos exposure'),
    T('Diagnose Verocay bodies on a nerve sheath tumor biopsy as diagnostic of schwannoma'),
    T('Identify Homer-Wright rosettes on biopsy as characteristic of neuroblastoma'),
    T('Recognize Flexner-Wintersteiner rosettes on biopsy as characteristic of retinoblastoma'),
    T('Diagnose iron deposits highlighted by Prussian blue stain as evidence of hemosiderin accumulation'),
    T('Identify PAS-positive, diastase-resistant globules in hepatocytes as characteristic of alpha-1 antitrypsin deficiency'),
    T('Recognize psammoma bodies on ovarian biopsy as suggestive of a serous papillary cystadenocarcinoma'),
  ],
  Immunology: [
    T('Recognize a patient with simultaneous autoimmune hemolytic anemia and immune thrombocytopenia as Evans syndrome'),
    T('Identify a patient with hemolytic anemia worsened by cold exposure and a positive direct Coombs test for IgM as cold agglutinin disease'),
    T('Diagnose a patient with hemolytic anemia and a positive direct Coombs test for IgG as warm autoimmune hemolytic anemia'),
    T('Recognize a patient with hemoptysis, hematuria, and anti-glomerular basement membrane antibodies as Goodpasture syndrome'),
    T('Identify a patient with asthma, eosinophilia, and vasculitis affecting multiple organs as eosinophilic granulomatosis with polyangiitis'),
    T('Diagnose a patient with pauci-immune glomerulonephritis and a positive p-ANCA as microscopic polyangiitis'),
    T('Recognize a patient with sinusitis, lung nodules, and glomerulonephritis with a positive c-ANCA as granulomatosis with polyangiitis'),
    T('Identify a patient with autoimmune blistering skin lesions and an underlying malignancy as paraneoplastic pemphigus'),
  ],
  Microbiology: [
    T('Recognize watery diarrhea in a traveler as enterotoxigenic E. coli infection'),
    T('Identify bloody diarrhea followed by acute kidney injury and thrombocytopenia in a child as hemolytic uremic syndrome from E. coli O157:H7'),
    T('Diagnose right lower quadrant pain mimicking appendicitis after eating undercooked pork as Yersinia enterocolitica infection'),
    T('Recognize conjunctivitis, urethritis, and arthritis following a gastrointestinal or genital infection as reactive arthritis'),
    T('Identify tender red nodules on the shins following a streptococcal or fungal infection as erythema nodosum'),
    T('Diagnose an acutely swollen, painful knee in a sexually active young adult as gonococcal septic arthritis'),
    T('Recognize osteomyelitis caused by Salmonella in a patient with sickle cell disease'),
    T('Identify osteomyelitis following a nail puncture through a shoe as caused by Pseudomonas aeruginosa'),
    T('Diagnose a chronically infected hip prosthesis as caused by Staphylococcus epidermidis biofilm formation'),
    T('Recognize rapidly spreading skin necrosis with pain out of proportion to exam findings as necrotizing fasciitis'),
    T('Identify a diabetic patient with a black necrotic nasal eschar as mucormycosis'),
    T('Diagnose fever and a new heart murmur in an intravenous drug user as infective endocarditis of the tricuspid valve'),
  ],
  Pathology: [
    T('Recognize massive splenomegaly and a Philadelphia chromosome as chronic myeloid leukemia'),
    T('Identify disseminated intravascular coagulation with Auer rods on peripheral smear as acute promyelocytic leukemia'),
    T('Diagnose pancytopenia with hairy cytoplasmic projections on peripheral smear as hairy cell leukemia'),
    T('Recognize facial plethora, pruritus after bathing, and a JAK2 mutation as polycythemia vera'),
    T('Identify an isolated markedly elevated platelet count without another cause as essential thrombocythemia'),
    T('Diagnose teardrop-shaped red blood cells with a fibrotic bone marrow biopsy as primary myelofibrosis'),
    T('Recognize bone pain, an M spike on serum protein electrophoresis, and Bence Jones proteinuria as multiple myeloma'),
    T('Identify hyperviscosity syndrome with an IgM monoclonal spike as Waldenström macroglobulinemia'),
    T('Diagnose nephrotic-range proteinuria with an enlarged tongue as systemic amyloidosis'),
  ],
  Pharmacology: [
    T('Recognize high-dose methotrexate toxicity rescued by leucovorin as folinic acid rescue therapy'),
    T('Identify 5-fluorouracil overdose treated with uridine triacetate'),
    T('Diagnose peripheral neuropathy and constipation in a patient on vincristine as vincristine neurotoxicity'),
    T('Recognize dilated cardiomyopathy in a patient with a history of doxorubicin chemotherapy as anthracycline cardiotoxicity'),
    T('Identify progressive dyspnea and pulmonary fibrosis in a patient treated with bleomycin as bleomycin-induced lung toxicity'),
    T('Diagnose hearing loss and rising creatinine in a patient on cisplatin as cisplatin ototoxicity and nephrotoxicity'),
    T('Recognize hematuria in a patient on cyclophosphamide as hemorrhagic cystitis preventable with mesna'),
    T('Identify abnormal uterine bleeding in a patient on long-term tamoxifen as an increased risk of endometrial cancer'),
    T('Diagnose a patient on clozapine requiring routine blood count monitoring for agranulocytosis'),
    T('Recognize neural tube defects in an infant born to a mother on valproate during pregnancy as valproate teratogenicity'),
  ],
  Physiology: [
    T('Recognize a hypothermic, bradycardic, obtunded patient with severe hypothyroidism as myxedema coma'),
    T('Identify a hyperthermic, tachycardic, agitated patient with severe hyperthyroidism as thyroid storm'),
    T('Diagnose hyponatremia with concentrated urine in a patient with small cell lung cancer as SIADH'),
    T('Recognize hyponatremia with volume depletion after a subarachnoid hemorrhage as cerebral salt wasting'),
    T('Identify a patient who develops quadriplegia after overly rapid correction of hyponatremia as central pontine myelinolysis'),
    T('Diagnose a patient who faints after prolonged standing with a preceding prodrome of nausea and warmth as vasovagal syncope'),
    T('Recognize orthostatic hypotension without a compensatory rise in heart rate as autonomic failure'),
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
