// One-off script: thirteenth batch of hand-authored (not model-generated)
// topic titles — new veins this round: more physical exam maneuvers,
// peripheral blood smear findings, classic imaging signs, specific named
// antiepileptic/antiarrhythmic/DMARD drugs, autoantibody patterns, Gram
// stain/culture appearance findings, and upper/lower motor neuron exam
// findings. Written directly, not produced by calling an LLM API — only
// the FULL QUESTION content is ever generated lazily by AI later, on first
// use, exactly as before.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize anterior tibial displacement with the knee flexed to 20-30 degrees as a positive Lachman test for ACL injury'),
    T('Identify posterior tibial displacement on knee examination as a positive posterior drawer sign for PCL injury'),
    T('Diagnose excessive medial knee opening with valgus stress as suggestive of medial collateral ligament injury'),
    T('Recognize excessive lateral knee opening with varus stress as suggestive of lateral collateral ligament injury'),
    T('Identify pain with joint compression and rotation of the flexed knee as a positive Apley compression test for meniscal tear'),
    T('Diagnose relief of joint pain with distraction of the flexed knee as a positive Apley distraction test for ligamentous injury'),
    T('Recognize inability to fully extend the hip due to a fixed flexion contracture as a positive Thomas test'),
    T('Identify iliotibial band tightness as demonstrated by a positive Ober test'),
    T('Diagnose groin or hip pain reproduced by flexion, abduction, and external rotation as a positive FABER test'),
    T('Recognize arm pain and paresthesias reproduced by neck extension and lateral rotation as a positive Spurling test for cervical radiculopathy'),
    T('Identify an electric shock sensation down the spine with neck flexion as Lhermitte sign in cervical cord compression'),
    T('Diagnose postural sway with eyes closed as a positive Romberg test for impaired proprioception'),
    T('Recognize great toe extension with fanning of the other toes on plantar stimulation as a positive Babinski sign'),
    T('Identify reflexive thumb flexion when flicking the middle finger as a positive Hoffmann sign suggestive of cervical myelopathy'),
    T('Diagnose pain with resisted supination of the forearm as a positive Yergason test for biceps tendon pathology'),
    T('Recognize weakness of hip adduction after an obturator nerve injury during pelvic surgery'),
    T('Identify loss of sensation over the medial leg and foot as suggestive of saphenous nerve injury'),
    T('Diagnose loss of the cremasteric reflex as suggestive of a genitofemoral or ilioinguinal nerve lesion'),
  ],
  Pathology: [
    T('Recognize target cells on a peripheral blood smear as suggestive of thalassemia or liver disease'),
    T('Identify Heinz bodies on a peripheral blood smear as suggestive of G6PD deficiency'),
    T('Diagnose basophilic stippling on a peripheral blood smear as suggestive of lead poisoning'),
    T('Recognize schistocytes on a peripheral blood smear as suggestive of a microangiopathic hemolytic process'),
    T('Identify spherocytes on a peripheral blood smear as suggestive of hereditary spherocytosis or autoimmune hemolysis'),
    T('Diagnose burr cells (echinocytes) on a peripheral blood smear as suggestive of uremia'),
    T('Recognize acanthocytes (spur cells) on a peripheral blood smear as suggestive of severe liver disease'),
    T('Identify sickle-shaped erythrocytes on a peripheral blood smear as diagnostic of sickle cell disease'),
    T('Diagnose bite cells on a peripheral blood smear as evidence of oxidative hemoglobin damage in G6PD deficiency'),
    T('Recognize teardrop cells on a peripheral blood smear as suggestive of myelofibrosis or marrow infiltration'),
    T('Identify a thumbprint sign on a lateral neck x-ray as suggestive of epiglottitis'),
    T('Recognize a steeple sign on a frontal neck x-ray as suggestive of croup'),
    T('Diagnose a target sign on abdominal ultrasound as suggestive of intussusception'),
    T('Recognize Kerley B lines on chest x-ray as suggestive of pulmonary edema'),
    T('Identify a water bottle-shaped heart on chest x-ray as suggestive of a pericardial effusion'),
    T('Diagnose an egg-on-a-string appearance on chest x-ray as suggestive of transposition of the great vessels'),
    T('Recognize a figure-of-3 sign on chest x-ray as suggestive of coarctation of the aorta'),
    T('Identify a napkin-ring lesion on barium enema as suggestive of an annular colorectal carcinoma'),
    T('Diagnose a moth-eaten pattern of bone destruction on x-ray as suggestive of multiple myeloma or an aggressive malignancy'),
    T('Recognize a tree-in-bud pattern on chest CT as suggestive of endobronchial spread of tuberculosis'),
    T('Identify honeycombing on chest CT as suggestive of end-stage pulmonary fibrosis'),
    T('Diagnose ground-glass opacities on chest CT as a nonspecific finding in early interstitial lung disease or infection'),
  ],
  Pharmacology: [
    T('Identify phenytoin as a sodium channel blocker used for generalized tonic-clonic and focal seizures'),
    T('Recognize carbamazepine as a first-line treatment for trigeminal neuralgia and focal seizures'),
    T('Diagnose ethosuximide as the drug of choice for absence seizures by blocking T-type calcium channels'),
    T('Identify valproate as effective across multiple seizure types by blocking sodium channels and increasing GABA'),
    T('Recognize lamotrigine as requiring slow titration to reduce the risk of Stevens-Johnson syndrome'),
    T('Diagnose levetiracetam as a newer antiepileptic with a favorable side effect profile and unclear mechanism'),
    T('Identify quinidine as a Class IA antiarrhythmic that prolongs the QT interval'),
    T('Recognize lidocaine as a Class IB antiarrhythmic used preferentially in ischemic ventricular arrhythmias'),
    T('Diagnose flecainide as a Class IC antiarrhythmic contraindicated in structural heart disease'),
    T('Identify amiodarone as a Class III antiarrhythmic with multiple mechanisms and pulmonary and thyroid toxicity'),
    T('Recognize sotalol as combining beta-blockade with Class III antiarrhythmic potassium channel blockade'),
    T('Diagnose verapamil as a Class IV antiarrhythmic used to control ventricular rate in atrial fibrillation'),
    T('Identify hydroxychloroquine as a DMARD requiring routine ophthalmologic monitoring for retinopathy'),
    T('Recognize methotrexate-induced hepatotoxicity as requiring monitoring of liver function during long-term use'),
    T('Diagnose leflunomide as a DMARD that inhibits pyrimidine synthesis in rapidly dividing lymphocytes'),
    T('Identify sulfasalazine as a DMARD used in rheumatoid arthritis and inflammatory bowel disease'),
    T('Recognize infliximab as a chimeric monoclonal antibody targeting TNF-alpha with a risk of reactivating latent tuberculosis'),
  ],
  Biochemistry: [
    T('Recognize glossitis, angular cheilitis, and normocytic anemia as suggestive of riboflavin deficiency'),
    T('Identify a patient with dermatitis, diarrhea, and dementia as suggestive of niacin deficiency (pellagra)'),
    T('Diagnose bleeding gums, poor wound healing, and corkscrew hairs as suggestive of vitamin C deficiency (scurvy)'),
    T('Recognize rickets in a child with poor sun exposure as suggestive of vitamin D deficiency'),
    T('Identify night blindness and dry eyes as suggestive of vitamin A deficiency'),
    T('Diagnose bleeding with an elevated PT and a normal PTT as suggestive of vitamin K deficiency or early warfarin use'),
    T('Recognize peripheral neuropathy in an alcoholic patient as suggestive of thiamine deficiency'),
    T('Identify hemolytic anemia in a premature infant as suggestive of vitamin E deficiency'),
    T('Diagnose a macrocytic anemia with neurological symptoms including subacute combined degeneration as vitamin B12 deficiency'),
    T('Recognize a macrocytic anemia without neurological symptoms as more suggestive of folate deficiency than B12 deficiency'),
  ],
  Physiology: [
    T('Recognize hyperreflexia and clonus as suggestive of an upper motor neuron lesion'),
    T('Identify hyporeflexia and muscle atrophy as suggestive of a lower motor neuron lesion'),
    T('Diagnose fasciculations with weakness as suggestive of lower motor neuron involvement'),
    T('Recognize spasticity with a clasp-knife quality as suggestive of an upper motor neuron lesion'),
    T('Identify flaccid paralysis immediately after a spinal cord injury as spinal shock'),
    T('Diagnose autonomic dysreflexia with hypertension and bradycardia in a patient with a high spinal cord injury'),
    T('Recognize decorticate posturing as suggestive of a lesion above the red nucleus'),
    T('Identify decerebrate posturing as suggestive of a lesion at or below the red nucleus'),
    T('Diagnose a fixed and dilated pupil unresponsive to light as suggestive of increased intracranial pressure with brainstem compression'),
    T('Recognize pinpoint pupils with reduced consciousness as suggestive of a pontine lesion or opioid intoxication'),
    T('Identify a blown pupil with ptosis as suggestive of uncal herniation compressing the oculomotor nerve'),
    T('Diagnose loss of consciousness with preserved brainstem reflexes as suggestive of a diffuse cortical process rather than brainstem injury'),
  ],
  Microbiology: [
    T('Recognize a strawberry cervix on pelvic exam as suggestive of Trichomonas vaginalis infection'),
    T('Identify grape-like clusters on Gram stain as characteristic of Staphylococcus species'),
    T('Diagnose chains of cocci on Gram stain as characteristic of Streptococcus species'),
    T('Recognize a fried egg appearance on culture as characteristic of Mycoplasma colonies'),
    T('Identify a medusa head colony morphology as characteristic of Bacillus anthracis'),
    T('Diagnose a school of fish arrangement on Gram stain as characteristic of Gardnerella vaginalis in bacterial vaginosis'),
    T('Recognize clue cells on a wet mount as diagnostic of bacterial vaginosis'),
    T('Identify a whiff test with a fishy odor after adding KOH as suggestive of bacterial vaginosis'),
    T('Diagnose motile trophozoites on a wet mount as diagnostic of Trichomonas vaginalis'),
    T('Recognize budding yeast with pseudohyphae on a wet mount as suggestive of Candida vaginitis'),
    T('Identify an owl’s eye appearance on urine cytology as suggestive of cytomegalovirus infection'),
    T('Diagnose a safety pin appearance on Gram stain as characteristic of Yersinia pestis'),
  ],
  Genetics: [
    T('Recognize a patient with early-onset Parkinson disease and a family history as suggestive of a genetic form such as a PARK2 mutation'),
    T('Identify a patient with recurrent venous thrombosis and a family history as suggestive of an inherited thrombophilia'),
    T('Diagnose a patient with hereditary spherocytosis confirmed by an abnormal osmotic fragility test'),
    T('Recognize a newborn with a positive sweat chloride test as diagnostic of cystic fibrosis'),
    T('Identify an infant with hypotonia and a floppy baby presentation as warranting evaluation for spinal muscular atrophy'),
    T('Diagnose a patient with progressive muscle weakness and a positive Gowers sign as suggestive of a muscular dystrophy'),
    T('Recognize an infant with elevated phenylalanine on newborn screening as requiring further workup for phenylketonuria'),
    T('Identify a positive genetic test for the BRCA1 mutation as indicating increased risk for breast and ovarian cancer'),
    T('Diagnose a patient with early-onset colorectal cancer and microsatellite instability as suggestive of Lynch syndrome'),
    T('Recognize a child with tall stature, learning disability, and behavioral problems as warranting karyotype evaluation for Klinefelter syndrome'),
  ],
  Immunology: [
    T('Recognize a positive rheumatoid factor and anti-CCP antibody as supportive of a diagnosis of rheumatoid arthritis'),
    T('Identify a positive ANA test as a sensitive but nonspecific marker requiring further autoantibody testing'),
    T('Diagnose a positive anti-dsDNA antibody as specific for systemic lupus erythematosus and correlating with renal disease activity'),
    T('Recognize a positive anti-Smith antibody as highly specific for systemic lupus erythematosus'),
    T('Identify a positive anti-centromere antibody as suggestive of limited cutaneous systemic sclerosis (CREST syndrome)'),
    T('Diagnose a positive anti-Scl-70 antibody as suggestive of diffuse systemic sclerosis'),
    T('Recognize a positive anti-Jo-1 antibody as suggestive of polymyositis or dermatomyositis with lung involvement'),
    T('Identify a positive anti-mitochondrial antibody as suggestive of primary biliary cholangitis'),
    T('Recognize elevated tryptase levels shortly after a hypersensitivity reaction as confirming mast cell activation'),
    T('Identify a positive skin prick test as indicating IgE-mediated sensitization to a specific allergen'),
    T('Diagnose a patient with recurrent infections and low switched memory B cells as suggestive of a specific antibody deficiency'),
    T('Recognize eosinophilia with a parasitic infection as reflecting a Th2-mediated immune response'),
  ],
  Embryology: [
    T('Recognize a fetus with symmetric growth restriction as suggestive of an early insult such as a chromosomal abnormality or infection'),
    T('Identify a fetus with asymmetric growth restriction as suggestive of late placental insufficiency'),
    T('Diagnose oligohydramnios in a pregnancy as associated with fetal renal anomalies or urinary outflow obstruction'),
    T('Recognize polyhydramnios in a pregnancy as associated with fetal inability to swallow amniotic fluid'),
    T('Identify a newborn with pulmonary hypoplasia and limb contractures as consistent with Potter sequence from renal agenesis'),
    T('Diagnose macrosomia and neonatal hypoglycemia in an infant of a diabetic mother'),
    T('Recognize fetal microcephaly and intellectual disability from untreated maternal phenylketonuria during pregnancy'),
    T('Identify intrauterine growth restriction and characteristic facial features after alcohol exposure as fetal alcohol syndrome'),
    T('Diagnose limb defects following isotretinoin exposure during pregnancy as retinoic acid embryopathy'),
    T('Recognize a newborn with a small head circumference and calcifications after intrauterine Zika virus exposure as congenital Zika syndrome'),
  ],
  Histology: [
    T('Differentiate simple squamous epithelium from simple cuboidal epithelium by cell shape and typical location'),
    T('Distinguish simple columnar epithelium from pseudostratified columnar epithelium by nuclear alignment'),
    T('Differentiate transitional epithelium from stratified squamous epithelium by its capacity to stretch'),
    T('Distinguish keratinized stratified squamous epithelium from nonkeratinized stratified squamous epithelium by location'),
    T('Differentiate white pulp follicles from periarteriolar lymphoid sheaths in the spleen by their cellular composition'),
    T('Distinguish M cells from enterocytes in the intestinal epithelium by their function in antigen sampling'),
    T('Differentiate goblet cells from Paneth cells in the small intestine by their secretory products'),
    T('Distinguish enteroendocrine cells from goblet cells in the intestinal epithelium by their function'),
    T('Differentiate resting mast cells from degranulated mast cells by cytoplasmic granule content'),
    T('Distinguish naive B cells from plasma cells by cytoplasmic RER content and antibody secretion'),
    T('Differentiate primary spermatocytes from secondary spermatocytes by ploidy and stage of meiosis'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize a study with a very large sample size detecting a statistically significant but clinically meaningless difference'),
    T('Identify a diagnostic test used in a very low prevalence setting as likely to have a low positive predictive value despite high sensitivity'),
    T('Diagnose a diagnostic test used in a very high prevalence setting as likely to have a low negative predictive value despite high specificity'),
    T('Recognize a trial reporting results only for per-protocol completers as potentially overestimating treatment benefit'),
    T('Identify the use of intention-to-treat analysis as preserving the benefits of randomization despite non-adherence'),
    T('Diagnose a study that adjusts for a variable lying on the causal pathway as introducing overadjustment bias'),
    T('Recognize a collider variable that, when adjusted for, introduces a spurious association as collider bias'),
    T('Identify a study reporting only completers in a weight-loss trial as likely overestimating effectiveness due to attrition'),
    T('Diagnose a study using a validated risk prediction score as more clinically useful than an individual risk factor alone'),
  ],
  'Behavioral Science': [
    T('Diagnose a child with excessive worry about separation from a caregiver beyond developmentally appropriate levels as separation anxiety disorder'),
    T('Recognize a patient with a persistent, disproportionate fear of a specific object or situation leading to avoidance as a specific phobia'),
    T('Identify a patient with sudden, brief loss of muscle tone triggered by strong emotion as cataplexy associated with narcolepsy'),
    T('Diagnose a patient with recurrent impulsive, aggressive outbursts disproportionate to the trigger as intermittent explosive disorder'),
    T('Recognize a physician prescribing a placebo without disclosure as generally an ethical violation of informed consent'),
    T('Identify a research study using deception as requiring debriefing and IRB justification'),
    T('Diagnose a physician who continues treating a patient despite a conflict of interest as violating professional ethics'),
    T('Recognize a patient’s right to refuse blood transfusion on religious grounds as protected under informed consent and autonomy'),
    T('Identify a pregnant patient’s right to refuse a cesarean section as generally protected despite fetal risk'),
    T('Diagnose a physician sharing patient information with a spouse without consent as a HIPAA violation'),
    T('Recognize the use of a surrogate decision-maker hierarchy when a patient lacks capacity and has no advance directive'),
    T('Identify a physician’s obligation to continue emergency care regardless of a patient’s ability to pay under EMTALA'),
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
