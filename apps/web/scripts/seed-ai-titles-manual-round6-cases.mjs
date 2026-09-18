// One-off script: sixth batch of hand-authored (not model-generated) topic
// titles, continuing the specific clinical case/pattern-recognition
// vignette style from round 5. Written directly, not produced by calling
// an LLM API — only the FULL QUESTION content is ever generated lazily by
// AI later, on first use, exactly as before.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize numbness in the ring and little fingers after elbow trauma as cubital tunnel syndrome'),
    T('Identify a positive Tinel sign at the elbow as ulnar nerve irritation at the cubital tunnel'),
    T('Diagnose forearm pain and contracture after a supracondylar fracture as Volkmann ischemic contracture'),
    T('Recognize numbness over the thumb, index, and middle fingers after a distal radius (Colles) fracture as median nerve injury'),
    T('Identify an OK sign weakness in a patient with forearm trauma as anterior interosseous nerve syndrome'),
    T('Diagnose wrist extension weakness without sensory loss as posterior interosseous nerve syndrome'),
    T('Recognize ptosis, miosis, and anhidrosis in a smoker with a lung apex mass as Horner syndrome from a Pancoast tumor'),
    T('Identify shoulder weakness and sensory loss after an anterior shoulder dislocation as quadrilateral space syndrome'),
    T('Diagnose a fluctuant swelling behind the knee that limits flexion as a Baker cyst'),
    T('Recognize ipsilateral motor loss and contralateral pain/temperature loss below a spinal lesion as Brown-Séquard syndrome', true),
    T('Identify bilateral loss of pain and temperature with preserved proprioception after spinal trauma as anterior cord syndrome'),
    T('Diagnose saddle anesthesia and urinary retention after disc herniation as cauda equina syndrome'),
    T('Recognize buttock pain radiating down the leg worsened by sitting as piriformis syndrome'),
    T('Identify loss of sensation on the dorsum of the first webspace after a fibular neck fracture as deep peroneal nerve injury'),
    T('Diagnose a high-stepping gait after fibular neck trauma as common peroneal nerve palsy'),
    T('Recognize weakness of thumb opposition and an ape hand deformity as a severe median nerve lesion at the wrist'),
    T('Identify a positive Phalen test as suggestive of carpal tunnel syndrome'),
    T('Diagnose loss of the triceps reflex after a mid-humeral shaft fracture as radial nerve injury'),
  ],
  'Behavioral Science': [
    T('Recognize fluent speech with poor comprehension after a stroke as Wernicke aphasia', true),
    T('Identify nonfluent, effortful speech with intact comprehension as Broca aphasia'),
    T('Diagnose a patient who believes a family member has been replaced by an imposter as Capgras syndrome'),
    T('Recognize a patient who believes they are dead or do not exist as Cotard syndrome'),
    T('Identify a patient who shares a family member’s delusional belief as folie à deux'),
    T('Diagnose a patient with an unshakeable belief that a celebrity is in love with them as erotomania'),
    T('Recognize a patient with recurrent depressive episodes only during winter months as seasonal affective disorder'),
    T('Identify a patient with mood symptoms tied to the luteal phase of the menstrual cycle as premenstrual dysphoric disorder'),
    T('Diagnose a patient with paralysis and a surprisingly calm affect as conversion disorder with la belle indifférence'),
    T('Recognize a patient who travels unexpectedly and cannot recall their identity as dissociative fugue'),
    T('Identify a patient with persistent feelings of unreality about their surroundings as depersonalization-derealization disorder'),
    T('Diagnose a prisoner who gives approximate answers to simple questions as Ganser syndrome'),
    T('Recognize a patient who habitually tells elaborate, dramatic lies believed even by themselves as pseudologia fantastica'),
    T('Identify a patient with chronic feigned illness for the internal need to assume the sick role as factitious disorder imposed on self'),
    T('Diagnose a child who reverts to bedwetting after the birth of a sibling as regression'),
    T('Recognize a patient who blames others for their own unacceptable feelings as projection'),
    T('Identify a patient who channels aggressive impulses into a socially acceptable activity as sublimation'),
    T('Diagnose a patient who treats a physician like an authority figure from their past as transference'),
  ],
  Biochemistry: [
    T('Recognize hepatosplenomegaly and a cherry-red spot with foam cells on biopsy as Niemann-Pick disease'),
    T('Identify hepatosplenomegaly, bone crises, and Gaucher cells on bone marrow biopsy as Gaucher disease'),
    T('Diagnose a young man with angiokeratomas and burning pain in the extremities as Fabry disease'),
    T('Recognize a child with coarse facial features, corneal clouding, and developmental delay as Hurler syndrome', true),
    T('Identify a child with coarse facial features and aggressive behavior without corneal clouding as Hunter syndrome'),
    T('Diagnose an infant with hypotonia, seizures, and elevated very long chain fatty acids as adrenoleukodystrophy'),
    T('Recognize an infant with optic atrophy, peripheral neuropathy, and globoid cells on brain biopsy as Krabbe disease'),
    T('Identify a child with progressive ataxia and demyelination with arylsulfatase A deficiency as metachromatic leukodystrophy'),
    T('Diagnose a newborn with hypotonia, seizures, and hepatomegaly with absent peroxisomes as Zellweger syndrome'),
    T('Recognize an infant with failure to thrive, orotic acid crystals in urine, and megaloblastic anemia without hyperammonemia as orotic aciduria'),
    T('Identify an infant with seizures, alopecia, and a skin rash responsive to biotin as biotinidase deficiency'),
    T('Diagnose a patient with hypoketotic hypoglycemia and skeletal muscle weakness as a carnitine transport defect'),
    T('Recognize a patient with dark connective tissue pigmentation and arthritis as alkaptonuria'),
    T('Identify an infant with vomiting, hypoglycemia, and hepatomegaly worsened by fruit juice as hereditary fructose intolerance'),
    T('Diagnose a newborn with lethargy, poor feeding, and elevated ammonia in the first days of life as a urea cycle disorder'),
    T('Recognize a patient with muscle weakness worsened by fasting and exercise, relieved by glucose, as McArdle disease'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize a drug reported with an NNT of 10 as needing 10 patients treated to prevent one adverse outcome'),
    T('Identify a screening program with a high false positive rate as causing unnecessary patient anxiety and follow-up testing'),
    T('Diagnose favorable trial results published only in industry-funded studies as evidence of possible funding bias'),
    T('Recognize a study linking national-level dietary data to disease rates as at risk of ecological fallacy'),
    T('Identify a study comparing outcomes between hospitals without adjusting for patient severity as confounding by indication'),
    T('Diagnose a trial where sicker patients disproportionately dropped out of one arm as attrition bias'),
    T('Recognize a cohort study that misclassifies patient-years before drug exposure began as immortal time bias'),
    T('Identify a hospital-based case-control study with a non-representative control group as Berkson bias'),
    T('Diagnose a screening test that appears to improve five-year survival without changing mortality as lead-time bias'),
    T('Recognize a screening program that preferentially detects slow-growing tumors as demonstrating length-time bias'),
    T('Identify a study where participants improve simply from being observed as demonstrating the Hawthorne effect'),
    T('Diagnose a clinical improvement following an extreme initial measurement as regression to the mean'),
  ],
  Embryology: [
    T('Recognize elevated maternal serum alpha-fetoprotein with polyhydramnios as suggestive of a neural tube defect'),
    T('Identify low maternal serum alpha-fetoprotein with an abnormal triple screen as suggestive of Down syndrome'),
    T('Diagnose a newborn with a single fused eye field and severe midline facial defects as holoprosencephaly'),
    T('Recognize a newborn with fused lower limbs as sirenomelia (mermaid syndrome)'),
    T('Identify a fetus with a large nuchal translucency and cystic hygroma on ultrasound as suggestive of Turner syndrome'),
    T('Diagnose newborns joined at a shared body region as conjoined twins from incomplete embryonic disc separation'),
    T('Recognize a newborn with a large mass at the base of the spine as a sacrococcygeal teratoma'),
    T('Identify a male infant with infertility, chronic sinusitis, and situs inversus as Kartagener syndrome'),
    T('Diagnose a newborn with an abdominal wall defect covered by a membranous sac at the umbilicus as omphalocele'),
    T('Recognize a fetus with amniotic fluid bands causing limb amputations as amniotic band syndrome'),
    T('Identify a newborn with a cleft occurring between the medial nasal and maxillary prominences as cleft lip'),
    T('Diagnose an infant with ambiguous genitalia and a salt-wasting crisis as congenital adrenal hyperplasia'),
  ],
  Genetics: [
    T('Recognize a tall patient with a marfanoid habitus, downward lens dislocation, and thrombosis as homocystinuria'),
    T('Identify a tall patient with upward lens dislocation, long fingers, and aortic dilation as Marfan syndrome'),
    T('Diagnose a patient with hyperextensible joints, stretchy skin, and easy bruising as Ehlers-Danlos syndrome'),
    T('Recognize a patient with short limbs, a normal-length trunk, and a large head as achondroplasia'),
    T('Identify an infant with multiple fractures from minor trauma and blue sclerae as osteogenesis imperfecta'),
    T('Diagnose a patient with Kayser-Fleischer rings, liver disease, and psychiatric symptoms as Wilson disease'),
    T('Recognize a patient with bronze skin, diabetes, and cirrhosis as hereditary hemochromatosis'),
    T('Identify a young patient with early-onset emphysema and liver disease as alpha-1 antitrypsin deficiency'),
    T('Diagnose a patient with chorea, personality changes, and a family history of a similar illness as Huntington disease'),
    T('Recognize a boy with a long face, large ears, and macroorchidism as fragile X syndrome'),
    T('Identify a patient with grip myotonia, cataracts, and frontal balding as myotonic dystrophy'),
    T('Diagnose a patient with bilateral acoustic neuromas as neurofibromatosis type 2'),
    T('Recognize a patient with retinal and cerebellar hemangioblastomas and renal cell carcinoma as Von Hippel-Lindau disease'),
    T('Identify a child with a Wilms tumor, aniridia, and genitourinary anomalies as WAGR syndrome'),
    T('Diagnose an infant with macroglossia, omphalocele, and hemihyperplasia as Beckwith-Wiedemann syndrome'),
  ],
  Histology: [
    T('Identify Call-Exner bodies on ovarian biopsy as diagnostic of a granulosa cell tumor'),
    T('Recognize Schiller-Duval bodies on testicular or ovarian biopsy as diagnostic of a yolk sac tumor'),
    T('Diagnose Michaelis-Gutmann bodies on bladder biopsy as diagnostic of malakoplakia'),
    T('Identify Councilman bodies on liver biopsy as evidence of hepatocyte apoptosis in viral hepatitis'),
    T('Recognize Mallory bodies on liver biopsy as characteristic of alcoholic liver disease'),
    T('Diagnose Russell bodies in plasma cells as accumulated immunoglobulin from excess protein synthesis'),
    T('Identify Birbeck granules on electron microscopy as diagnostic of Langerhans cell histiocytosis'),
    T('Recognize Weibel-Palade bodies in endothelial cells as the storage site for von Willebrand factor'),
    T('Diagnose myelin figures resembling zebra bodies on renal biopsy as suggestive of Fabry disease'),
    T('Identify Curschmann spirals in sputum as characteristic of a severe asthma exacerbation'),
  ],
  Immunology: [
    T('Recognize an infant with recurrent viral and fungal infections and absent MHC class II expression as bare lymphocyte syndrome'),
    T('Identify a patient with chronic Candida infections limited to skin and mucous membranes as chronic mucocutaneous candidiasis'),
    T('Diagnose a child with recurrent pyogenic infections and elevated IgM with low IgG and IgA as hyper-IgM syndrome'),
    T('Recognize a patient who develops anaphylaxis after a blood transfusion as selective IgA deficiency'),
    T('Identify an adult with recurrent sinopulmonary infections and low immunoglobulin levels as common variable immunodeficiency'),
    T('Diagnose a neonate with tetany, a conotruncal heart defect, and recurrent infections as DiGeorge syndrome'),
    T('Recognize a child with recurrent infections from catalase-positive organisms as chronic granulomatous disease'),
    T('Identify a child with partial albinism, recurrent infections, and giant cytoplasmic granules as Chediak-Higashi syndrome'),
    T('Diagnose a post-splenectomy patient with Howell-Jolly bodies on peripheral smear as evidence of asplenia'),
    T('Recognize a patient with recurrent Neisseria infections and a family history as a terminal complement deficiency'),
    T('Identify an infant with thrombocytopenia, eczema, and recurrent infections as Wiskott-Aldrich syndrome'),
    T('Diagnose a child with telangiectasias, ataxia, and an elevated alpha-fetoprotein as ataxia-telangiectasia'),
  ],
  Microbiology: [
    T('Recognize a painless black eschar after exposure to livestock as cutaneous anthrax'),
    T('Identify rose-colored spots on the trunk of a febrile traveler as typhoid fever'),
    T('Diagnose cold agglutinins and a patchy pneumonia in a young adult as Mycoplasma pneumoniae infection'),
    T('Recognize descending paralysis starting with cranial nerves after eating home-canned food as botulism'),
    T('Identify jaw muscle rigidity and risus sardonicus after a puncture wound as tetanus'),
    T('Diagnose a gray pseudomembrane on the tonsils with a bull neck appearance as diphtheria'),
    T('Recognize honey-crusted skin lesions in a child as impetigo'),
    T('Identify small red spots on the buccal mucosa preceding a rash as Koplik spots in measles'),
    T('Diagnose fever, conjunctivitis, and pharyngitis spreading in a swimming pool outbreak as pharyngoconjunctival fever from adenovirus'),
    T('Recognize vesicular lesions on the hands, feet, and mouth in a child as hand-foot-mouth disease from coxsackievirus'),
    T('Identify a child with paroxysmal coughing fits followed by an inspiratory whoop as pertussis'),
    T('Diagnose a patient with fever and a maculopapular rash spreading from the face downward as measles'),
    T('Recognize a patient with fever, arthralgia, and a lace-like rash on the extremities as parvovirus B19 in an adult'),
    T('Identify vesicular lesions in a dermatomal distribution as herpes zoster reactivation'),
    T('Diagnose a sexually active patient with a frothy, malodorous vaginal discharge as Trichomonas vaginalis infection'),
  ],
  Pathology: [
    T('Recognize fever, jaundice, and right upper quadrant pain as Charcot triad in ascending cholangitis'),
    T('Identify Charcot triad plus hypotension and confusion as Reynolds pentad in suppurative cholangitis'),
    T('Diagnose jugular venous distension, hypotension, and muffled heart sounds as Beck triad in cardiac tamponade'),
    T('Recognize hypertension, bradycardia, and irregular respirations as Cushing triad from increased intracranial pressure'),
    T('Identify hypoglycemic symptoms relieved by glucose with low blood glucose during an episode as Whipple triad in insulinoma'),
    T('Diagnose an ovarian fibroma with ascites and pleural effusion as Meigs syndrome'),
    T('Recognize migratory superficial thrombophlebitis in a patient with pancreatic cancer as Trousseau syndrome'),
    T('Identify severe chest pain after forceful vomiting with esophageal rupture as Boerhaave syndrome'),
    T('Diagnose upper GI bleeding after forceful retching without full-thickness rupture as a Mallory-Weiss tear'),
    T('Recognize refractory peptic ulcers with diarrhea and elevated gastrin as Zollinger-Ellison syndrome'),
    T('Identify a triad of confusion, ataxia, and ophthalmoplegia in an alcoholic patient as Wernicke encephalopathy'),
    T('Diagnose flank pain, hematuria, and a palpable abdominal mass as renal cell carcinoma'),
  ],
  Pharmacology: [
    T('Recognize yellow-green vision changes and arrhythmia in a patient on digoxin as digoxin toxicity'),
    T('Identify tremor, ataxia, and confusion in a patient on lithium as lithium toxicity'),
    T('Diagnose painful skin necrosis shortly after starting warfarin in a patient with protein C deficiency as warfarin-induced skin necrosis'),
    T('Recognize a falling platelet count days after starting heparin as heparin-induced thrombocytopenia'),
    T('Identify hearing loss and tinnitus in a patient on long-term aminoglycoside therapy as aminoglycoside ototoxicity'),
    T('Diagnose peripheral neuropathy in a patient on isoniazid without pyridoxine supplementation'),
    T('Identify muscle pain and elevated creatine kinase in a patient on a statin as statin-induced myopathy'),
    T('Diagnose a dry cough and facial swelling in a patient started on an ACE inhibitor as ACE inhibitor-induced cough and angioedema'),
    T('Recognize rebound tachycardia and hypertension after abruptly stopping a beta-blocker as beta-blocker withdrawal'),
    T('Identify rebound hypertension after abruptly stopping clonidine as clonidine withdrawal'),
    T('Diagnose chest pain and ECG changes in a cocaine user as cocaine-induced coronary vasospasm'),
    T('Recognize a wide QRS complex and anticholinergic symptoms after an overdose as tricyclic antidepressant toxicity'),
  ],
  Physiology: [
    T('Recognize moon facies, a buffalo hump, and abdominal striae as Cushing syndrome'),
    T('Identify hyperpigmentation, hypotension, and hyperkalemia as Addison disease'),
    T('Diagnose episodic hypertension, palpitations, and headache as pheochromocytoma'),
    T('Recognize enlarged hands and feet with coarse facial features in an adult as acromegaly'),
    T('Identify polyuria and dilute urine responsive to desmopressin as central diabetes insipidus'),
    T('Diagnose hypertension with hypokalemia and metabolic alkalosis as primary hyperaldosteronism'),
    T('Recognize tetany and a positive Chvostek sign after thyroid surgery as hypoparathyroidism'),
    T('Identify bone pain, kidney stones, abdominal pain, and psychiatric symptoms as primary hyperparathyroidism'),
    T('Diagnose flushing, diarrhea, and wheezing as carcinoid syndrome'),
    T('Recognize Kussmaul breathing and a fruity breath odor in a diabetic patient as diabetic ketoacidosis'),
    T('Identify a patient with polyuria, polydipsia, and weight loss as new-onset diabetes mellitus'),
    T('Diagnose lethargy, hyporeflexia, and a shortened QT interval as hypercalcemia'),
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
