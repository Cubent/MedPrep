// One-off script: inserts a fifth batch of hand-authored (not model-
// generated) topic titles into the "AI Generated" System's title pool, per
// discipline — this round phrased as specific clinical case/pattern-
// recognition vignettes (classic USMLE buzzword associations) rather than
// abstract concept titles, per explicit request. Written directly, not
// produced by calling an LLM API — only the FULL QUESTION content
// (stem/choices/explanation) is ever generated lazily by AI later, on first
// use, exactly as before.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize a wrist drop in a patient with a humeral shaft fracture as radial nerve injury'),
    T('Identify a winged scapula in a patient after axillary lymph node dissection as long thoracic nerve injury'),
    T('Diagnose a foot drop in a patient after fibular neck fracture as common peroneal nerve injury'),
    T('Recognize a claw hand in a patient with a deep laceration at the wrist as ulnar nerve injury'),
    T('Identify a waiter’s tip posture in a newborn after a difficult delivery as Erb palsy'),
    T('Diagnose loss of sensation over the lateral thigh in an obese patient as meralgia paresthetica'),
    T('Recognize inability to raise the arm above the horizontal after shoulder dislocation as axillary nerve injury'),
    T('Identify a Saturday night palsy wrist drop after prolonged arm compression as radial nerve injury at the spiral groove'),
    T('Diagnose a Pope’s blessing hand posture in a patient with a supracondylar humerus fracture as median nerve injury'),
    T('Recognize dysphagia and hoarseness in a patient with an aortic arch aneurysm as recurrent laryngeal nerve compression'),
    T('Identify a positive Trendelenburg sign after hip surgery as superior gluteal nerve injury'),
    T('Diagnose loss of the corneal reflex in a patient with a cerebellopontine angle tumor as trigeminal and facial nerve compression'),
    T('Recognize a trick knee locking sensation in a young athlete as a torn meniscus'),
    T('Identify sudden groin pain and a bulge with straining in an older man as an inguinal hernia'),
    T('Diagnose numbness in the palm sparing the thenar eminence after wrist trauma as carpal tunnel syndrome with palmar cutaneous branch sparing'),
  ],
  'Behavioral Science': [
    T('Recognize a college student with binge eating followed by self-induced vomiting as bulimia nervosa'),
    T('Identify an adolescent girl with amenorrhea, intense fear of weight gain, and low BMI as anorexia nervosa'),
    T('Diagnose a veteran with intrusive flashbacks and hypervigilance after combat exposure as PTSD'),
    T('Recognize a child with inattention, hyperactivity, and impulsivity across home and school settings as ADHD'),
    T('Identify a patient with grandiosity, decreased need for sleep, and impulsive spending as a manic episode'),
    T('Diagnose a patient with a fixed false belief of a spouse’s infidelity without other psychotic symptoms as delusional disorder'),
    T('Recognize a patient who fabricates symptoms for external gain such as disability payments as malingering'),
    T('Identify a healthcare worker who repeatedly seeks unnecessary surgeries for internal psychological gain as factitious disorder'),
    T('Diagnose sudden unilateral leg weakness with a normal neurological workup after a stressful event as conversion disorder'),
    T('Recognize a child with reduced eye contact, repetitive behaviors, and delayed language as autism spectrum disorder'),
    T('Identify an elderly patient with fluctuating attention, visual hallucinations, and recent hospitalization as delirium'),
    T('Diagnose progressive memory loss and functional decline over years as Alzheimer dementia'),
    T('Recognize a patient with a grandiose sense of self-importance and need for admiration as narcissistic personality disorder'),
    T('Identify a patient with unstable relationships, impulsivity, and recurrent self-harm as borderline personality disorder'),
    T('Diagnose a patient with odd beliefs, magical thinking, and social discomfort as schizotypal personality disorder'),
    T('Recognize a patient who avoids social situations from fear of rejection despite wanting relationships as avoidant personality disorder'),
    T('Identify a new mother with persistent sadness and difficulty bonding beyond two weeks postpartum as postpartum depression'),
    T('Diagnose a patient with recurrent panic attacks and fear of another attack in public as panic disorder with agoraphobia'),
  ],
  Biochemistry: [
    T('Recognize a neonate with vomiting, lethargy, and a musty body odor as phenylketonuria'),
    T('Identify an infant with poor feeding, hepatomegaly, and cataracts after starting breast milk as galactosemia'),
    T('Diagnose a child with dark urine that turns black on standing as alkaptonuria'),
    T('Recognize a patient with easy bruising, joint hypermobility, and hyperextensible skin as Ehlers-Danlos syndrome'),
    T('Identify a tall patient with long limbs, lens dislocation, and aortic root dilation as Marfan syndrome'),
    T('Diagnose an infant with hypoglycemia, hepatomegaly, and lactic acidosis after fasting as a glycogen storage disease'),
    T('Recognize a patient with hemolytic anemia after eating fava beans as G6PD deficiency'),
    T('Identify a patient with muscle cramps and myoglobinuria after strenuous exercise as McArdle disease'),
    T('Diagnose an infant with hypotonia, cardiomegaly, and an enlarged tongue as Pompe disease'),
    T('Recognize a patient with xanthomas, early cardiovascular disease, and very high LDL as familial hypercholesterolemia', true),
    T('Identify a patient with sun sensitivity, blistering skin lesions, and dark urine as porphyria cutanea tarda'),
    T('Diagnose an infant with a sweet, maple syrup odor to the urine as maple syrup urine disease'),
    T('Recognize progressive muscle weakness with a cherry-red spot on fundoscopic exam as Tay-Sachs disease'),
    T('Identify a child with coarse facial features, hepatosplenomegaly, and corneal clouding as a mucopolysaccharidosis'),
    T('Diagnose a patient with recurrent gout, self-mutilation, and choreoathetosis as Lesch-Nyhan syndrome'),
    T('Recognize confusion, ataxia, and ophthalmoplegia after chronic alcohol use as Wernicke encephalopathy'),
    T('Identify megaloblastic anemia with numbness and ataxia as vitamin B12 deficiency'),
    T('Diagnose an infant with failure to thrive, vomiting, and a positive urine reducing substance test as hereditary fructose intolerance'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Interpret a study reporting a relative risk of 2.5 with a 95% confidence interval crossing 1 as not statistically significant', true),
    T('Analyze a screening test with high sensitivity but low specificity as suited for ruling out disease'),
    T('Evaluate a case-control study finding an odds ratio of 4 for smoking and lung cancer', true),
    T('Interpret a randomized controlled trial stopped early for overwhelming efficacy at an interim analysis'),
    T('Analyze a meta-analysis with a funnel plot showing asymmetry as evidence of possible publication bias'),
    T('Evaluate a cohort study in which loss to follow-up differs systematically between exposure groups'),
    T('Interpret a diagnostic test with a likelihood ratio close to 1 as providing little diagnostic information', true),
    T('Analyze a clinical trial with a large sample size finding a statistically significant but clinically trivial difference'),
    T('Evaluate a study where the same investigators assessed both exposure and outcome without blinding'),
    T('Interpret a survival curve showing overlapping confidence intervals between two treatment arms'),
    T('Analyze a study using an inappropriate paired statistical test on unpaired data'),
    T('Evaluate a vaccine trial reporting 95% vaccine efficacy based on relative risk reduction'),
  ],
  Embryology: [
    T('Recognize a newborn with a single umbilical artery as a marker for possible associated anomalies'),
    T('Identify a newborn with polyhydramnios and a double bubble sign on imaging as duodenal atresia'),
    T('Diagnose a newborn with a scaphoid abdomen and respiratory distress as congenital diaphragmatic hernia'),
    T('Recognize a newborn with bilious vomiting and a corkscrew appearance on imaging as midgut volvulus'),
    T('Identify a newborn with failure to pass meconium and a transition zone on contrast enema as Hirschsprung disease'),
    T('Diagnose a newborn with a midline neck mass that rises with tongue protrusion as a thyroglossal duct cyst'),
    T('Recognize a newborn with a lateral neck mass along the sternocleidomastoid as a branchial cleft cyst'),
    T('Identify an infant with a continuous machine-like murmur as patent ductus arteriosus'),
    T('Diagnose a cyanotic newborn with a boot-shaped heart on chest x-ray as tetralogy of Fallot'),
    T('Recognize an infant with hypocalcemia, recurrent infections, and a cardiac defect as DiGeorge syndrome'),
    T('Identify a newborn male with a ventral urethral opening as hypospadias'),
    T('Diagnose a newborn with an abdominal wall defect lacking a covering membrane as gastroschisis'),
  ],
  Genetics: [
    T('Recognize an infant with a flat facial profile, epicanthal folds, and a single palmar crease as Down syndrome'),
    T('Identify a newborn with rocker-bottom feet, clenched fists, and severe intellectual disability as trisomy 18'),
    T('Diagnose a newborn with cleft lip/palate, polydactyly, and microphthalmia as trisomy 13'),
    T('Recognize a tall male with gynecomastia, small testes, and infertility as Klinefelter syndrome'),
    T('Identify a short female with a webbed neck, lymphedema, and streak ovaries as Turner syndrome'),
    T('Diagnose an infant with a cat-like cry, microcephaly, and intellectual disability as cri-du-chat syndrome'),
    T('Recognize a child with a happy demeanor, ataxic movements, and seizures as Angelman syndrome'),
    T('Identify an obese child with hyperphagia and intellectual disability as Prader-Willi syndrome'),
    T('Diagnose a patient with cafe-au-lait spots, axillary freckling, and neurofibromas as neurofibromatosis type 1'),
    T('Recognize a patient with facial angiofibromas and a history of infantile seizures as tuberous sclerosis'),
    T('Identify a young athlete who collapses during exercise as having a possible genetic cardiomyopathy'),
    T('Diagnose a child with recurrent fractures, blue sclerae, and hearing loss as osteogenesis imperfecta'),
    T('Recognize a patient with early-onset colon cancer and a strong family history as Lynch syndrome'),
    T('Identify a patient with hundreds of colonic polyps on colonoscopy as familial adenomatous polyposis'),
    T('Diagnose a boy with progressive proximal muscle weakness and calf pseudohypertrophy as Duchenne muscular dystrophy'),
  ],
  Histology: [
    T('Identify Reed-Sternberg cells on a lymph node biopsy as diagnostic of Hodgkin lymphoma'),
    T('Recognize signet ring cells on a gastric biopsy as diagnostic of signet ring cell adenocarcinoma'),
    T('Diagnose psammoma bodies on a thyroid biopsy as suggestive of papillary thyroid carcinoma'),
    T('Identify Auer rods on a peripheral blood smear as diagnostic of acute myeloid leukemia'),
    T('Recognize a starry sky pattern on a lymph node biopsy as diagnostic of Burkitt lymphoma'),
    T('Diagnose an onion skin periosteal reaction on bone biopsy as suggestive of Ewing sarcoma'),
    T('Identify a Codman triangle on bone imaging as suggestive of osteosarcoma'),
    T('Recognize ground-glass hepatocytes on liver biopsy as suggestive of chronic hepatitis B infection'),
    T('Diagnose owl’s eye inclusions on tissue biopsy as diagnostic of cytomegalovirus infection'),
    T('Identify Negri bodies in neuronal cytoplasm as diagnostic of rabies infection'),
  ],
  Immunology: [
    T('Recognize an infant with recurrent severe infections and absent thymic shadow as SCID'),
    T('Identify a boy with recurrent pyogenic infections and absent B cells as X-linked agammaglobulinemia'),
    T('Diagnose a child with eczema, thrombocytopenia, and recurrent infections as Wiskott-Aldrich syndrome'),
    T('Recognize a patient with ataxia, telangiectasias, and recurrent sinopulmonary infections as ataxia-telangiectasia'),
    T('Identify a patient with delayed umbilical cord separation and infections without pus as leukocyte adhesion deficiency'),
    T('Diagnose a patient with recurrent Neisseria infections as a terminal complement deficiency'),
    T('Recognize a patient with a butterfly facial rash, joint pain, and photosensitivity as systemic lupus erythematosus'),
    T('Identify a patient with dry eyes, dry mouth, and parotid gland enlargement as Sjögren syndrome'),
    T('Diagnose a patient with proximal muscle weakness and a heliotrope rash as dermatomyositis'),
    T('Recognize a patient with recurrent angioedema without urticaria as hereditary angioedema'),
    T('Identify a patient with anaphylaxis, hives, and hypotension after a bee sting as a Type I hypersensitivity reaction'),
    T('Diagnose a transplant recipient with new organ dysfunction and lymphocytic infiltration weeks after surgery as acute rejection'),
  ],
  Microbiology: [
    T('Recognize a child with a slapped cheek rash as parvovirus B19 infection'),
    T('Identify a patient with a bull’s-eye rash after a tick bite as Lyme disease'),
    T('Diagnose a patient with fever and a rash starting on the wrists and ankles as Rocky Mountain spotted fever'),
    T('Recognize a sexually active patient with a painless genital ulcer as primary syphilis'),
    T('Identify a patient with currant jelly sputum as Klebsiella pneumoniae pneumonia'),
    T('Diagnose a patient with rusty-colored sputum and lobar consolidation as Streptococcus pneumoniae pneumonia'),
    T('Recognize a patient with a strawberry tongue and desquamating rash as scarlet fever'),
    T('Identify a patient with rice-water stool as cholera'),
    T('Diagnose a hiker with bloody diarrhea after drinking untreated stream water as giardiasis or cryptosporidiosis'),
    T('Recognize a patient with a painful punched-out genital ulcer as chancroid'),
    T('Identify a newborn with conjunctivitis in the first days of life as gonococcal ophthalmia neonatorum'),
    T('Diagnose an unvaccinated child with a sail sign on chest x-ray and fever as epiglottitis from Haemophilus influenzae'),
    T('Recognize a patient with fever, neck stiffness, and a petechial rash as Neisseria meningitidis meningitis'),
    T('Identify a patient with a cotton wool appearance on funduscopic exam and HIV as CMV retinitis'),
    T('Diagnose a patient with oral thrush and a low CD4 count as an AIDS-defining opportunistic infection'),
    T('Recognize an immunocompromised patient with a halo sign on chest CT as invasive aspergillosis'),
    T('Identify a farmer with fever and cough after exposure to bat droppings as histoplasmosis'),
    T('Diagnose a patient with a painless chancre that resolves spontaneously as primary syphilis'),
  ],
  Pathology: [
    T('Recognize an apple-core lesion on barium enema as colorectal carcinoma'),
    T('Identify a coffee bean sign on abdominal x-ray as sigmoid volvulus'),
    T('Diagnose a string sign on barium study as a Crohn disease stricture'),
    T('Recognize a lead pipe colon on imaging as chronic ulcerative colitis'),
    T('Identify onion-skinning of the renal artery on biopsy as malignant hypertension'),
    T('Diagnose wire-loop lesions on renal biopsy as lupus nephritis'),
    T('Recognize a tram-track appearance on renal biopsy as membranoproliferative glomerulonephritis'),
    T('Identify a spike and dome pattern on renal biopsy as membranous nephropathy'),
    T('Diagnose a flea-bitten kidney appearance as malignant hypertension'),
    T('Recognize chicken-wire fibrosis on liver biopsy as alcoholic hepatitis'),
    T('Identify a nutmeg liver appearance as chronic passive congestion from right heart failure'),
    T('Diagnose orphan Annie eye nuclei on thyroid biopsy as papillary thyroid carcinoma'),
    T('Recognize cafe-au-lait spots with fibrous dysplasia as McCune-Albright syndrome'),
    T('Identify a soap bubble appearance on bone imaging as a giant cell tumor of bone'),
    T('Diagnose a sunburst periosteal reaction on bone imaging as osteosarcoma'),
  ],
  Pharmacology: [
    T('Recognize tinnitus and metabolic acidosis after ingestion as aspirin overdose'),
    T('Identify cherry-red skin and headache as carbon monoxide poisoning'),
    T('Diagnose dry mouth, blurred vision, and urinary retention after antihistamine overdose as anticholinergic toxicity'),
    T('Recognize muscle rigidity and hyperthermia after starting an antipsychotic as neuroleptic malignant syndrome'),
    T('Identify hyperthermia, tremor, and hyperreflexia after combining an SSRI and MAOI as serotonin syndrome'),
    T('Diagnose pinpoint pupils and respiratory depression as opioid overdose'),
    T('Recognize blue-gray skin discoloration on long-term amiodarone therapy as amiodarone-induced skin pigmentation'),
    T('Identify gingival hyperplasia on long-term phenytoin therapy'),
    T('Diagnose gray baby syndrome after a neonate receives chloramphenicol'),
    T('Recognize tendon rupture after fluoroquinolone use'),
    T('Identify gray teeth discoloration after childhood tetracycline exposure'),
    T('Diagnose a disulfiram-like reaction after drinking alcohol while on metronidazole'),
    T('Recognize red-orange discoloration of body fluids on rifampin therapy'),
    T('Identify peripheral neuropathy on isoniazid therapy without pyridoxine supplementation'),
    T('Diagnose ototoxicity and nephrotoxicity after aminoglycoside therapy'),
  ],
  Physiology: [
    T('Recognize cold intolerance, weight gain, and bradycardia as hypothyroidism'),
    T('Identify heat intolerance, weight loss, and tachycardia as hyperthyroidism'),
    T('Diagnose polyuria and dilute urine unresponsive to desmopressin as nephrogenic diabetes insipidus'),
    T('Recognize hyponatremia with concentrated urine despite normal volume status as SIADH'),
    T('Identify muscle cramps with a positive Chvostek sign as hypocalcemia'),
    T('Diagnose a positive Trousseau sign as hypocalcemia'),
    T('Recognize peaked T waves on ECG as hyperkalemia', true),
    T('Identify U waves on ECG as hypokalemia', true),
    T('Diagnose Kussmaul breathing as a compensatory response to metabolic acidosis'),
    T('Recognize carpopedal spasm during hyperventilation as respiratory alkalosis-induced hypocalcemia symptoms'),
    T('Identify resting bradycardia and increased stroke volume in an athlete as physiological cardiac adaptation'),
    T('Diagnose orthostatic hypotension and autonomic dysfunction as possible diabetic autonomic neuropathy'),
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
