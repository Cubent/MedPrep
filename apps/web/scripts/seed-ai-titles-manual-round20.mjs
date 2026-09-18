// One-off script: twentieth batch of hand-authored (not model-generated)
// topic titles, closing out a large multi-round push toward 1000 new
// titles. This final round covered WPW/antiarrhythmic interactions and
// organ-specific drug pharmacology, chlamydial serovars and travel-medicine
// microbiology, hepatic/cardiac/pulmonary/renal pathology, hepatic surface
// anatomy and cardiac auscultation landmarks, coagulation-factor and
// muscular-dystrophy genetics, hemodynamic (Poiseuille/Laplace) physiology,
// and RANKL/osteoprotegerin bone biochemistry. Written directly, not
// produced by calling an LLM API — only the FULL QUESTION content is ever
// generated lazily by AI later, on first use. Every title was checked
// against the existing ~4803-title pool before inclusion; the script's own
// case-insensitive dedup is a final safety net.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize the caudate lobe of the liver as receiving blood supply from both the right and left hepatic arteries, sparing it in certain surgical resections'),
    T('Identify the hepatic veins as draining directly into the inferior vena cava, distinct from the portal venous system'),
    T('Diagnose the ligamentum venosum as separating the caudate lobe from the left lobe of the liver'),
    T('Recognize the gallbladder fossa as separating the right lobe from the quadrate lobe of the liver'),
    T('Identify the porta hepatis as the point where the portal vein, hepatic artery, and bile duct enter and exit the liver'),
    T('Diagnose the apex of the heart as typically palpable at the fifth intercostal space in the midclavicular line'),
    T('Recognize the four heart valve auscultation points as corresponding to but not directly overlying their anatomical locations'),
    T('Identify the aortic valve auscultation point as the right second intercostal space'),
    T('Diagnose the pulmonic valve auscultation point as the left second intercostal space'),
    T('Recognize the tricuspid valve auscultation point as the left fourth/fifth intercostal space near the sternum'),
    T('Identify the mitral valve auscultation point as the fifth intercostal space at the midclavicular line'),
    T('Diagnose the femoral triangle landmarks as used to locate the femoral artery for catheterization, with the vein medial and the nerve lateral to the artery'),
    T('Recognize the internal jugular vein as commonly accessed for central venous catheterization using the triangle formed by the sternocleidomastoid heads'),
    T('Identify the subclavian vein as at risk of pneumothorax during central line placement due to its proximity to the lung apex'),
    T('Diagnose the basilic vein as a common site for peripherally inserted central catheter (PICC) placement due to its size and course'),
    T('Recognize testing of cranial nerve I as often omitted from routine exams but assessed by identifying specific odors'),
    T('Identify testing of cranial nerve V motor function as assessed by palpating the masseter and temporalis during jaw clenching'),
    T('Diagnose testing of cranial nerve XI as assessed by having the patient shrug the shoulders and turn the head against resistance'),
    T('Recognize the jaw jerk reflex as testing the trigeminal nerve, useful for localizing lesions above versus below the pons'),
    T('Identify the sternal angle (angle of Louis) as marking the level of the second costal cartilage and the transition from ascending to descending aorta'),
    T('Diagnose the transpyloric plane as also marking the origin of the superior mesenteric artery'),
    T('Recognize the semilunar line as the lateral border of the rectus sheath, an important landmark for lateral abdominal incisions'),
    T('Identify the bulbospongiosus and ischiocavernosus muscles as superficial perineal muscles involved in sexual function'),
    T('Diagnose the clivus as a bony surface at the skull base supporting the brainstem, adjacent to the pituitary fossa'),
    T('Recognize the petrous portion of the temporal bone as housing the inner ear structures and providing a dense bony landmark on imaging'),
    T('Identify mastoiditis as a complication of otitis media involving infection of the mastoid air cells'),
    T('Diagnose the round window as allowing pressure release from the cochlear fluid during sound transmission'),
    T('Recognize the oval window as the site where the stapes footplate transmits vibrations into the inner ear'),
  ],
  Pathology: [
    T('Recognize Budd-Chiari syndrome as hepatic vein thrombosis presenting with the triad of abdominal pain, ascites, and hepatomegaly'),
    T('Identify portal vein thrombosis as a cause of portal hypertension without underlying cirrhosis'),
    T('Diagnose primary sclerosing cholangitis as causing a "beads on a string" appearance on cholangiography, strongly associated with ulcerative colitis'),
    T('Recognize primary sclerosing cholangitis as increasing the risk of cholangiocarcinoma'),
    T('Identify a "nutmeg liver" progressing to cardiac cirrhosis as a chronic complication of long-standing right heart failure'),
    T('Diagnose hepatic encephalopathy as related to elevated ammonia levels impairing neurotransmission, though ammonia levels do not always correlate with severity'),
    T('Recognize spontaneous bacterial peritonitis as an infection of ascitic fluid without an identifiable intra-abdominal source, most commonly from E. coli'),
    T('Identify an ascitic fluid neutrophil count greater than 250 cells/mm3 as diagnostic of spontaneous bacterial peritonitis'),
    T('Diagnose a serum-ascites albumin gradient greater than 1.1 g/dL as suggestive of portal hypertension as the cause of ascites'),
    T('Recognize restrictive cardiomyopathy as causing impaired ventricular filling due to a stiff myocardium, as seen in amyloidosis or sarcoidosis'),
    T('Identify a systolic anterior motion of the mitral valve as contributing to left ventricular outflow tract obstruction in hypertrophic cardiomyopathy'),
    T('Diagnose sudden cardiac death in a young athlete as a feared complication of undiagnosed hypertrophic cardiomyopathy'),
    T('Recognize a usual interstitial pneumonia pattern as showing patchy, subpleural, basal-predominant fibrosis in idiopathic pulmonary fibrosis'),
    T('Identify nonspecific interstitial pneumonia as a more uniform pattern of lung fibrosis, often with a better prognosis than usual interstitial pneumonia'),
    T('Diagnose acute respiratory distress syndrome as characterized by a PaO2/FiO2 ratio below 300'),
    T('Recognize diffuse alveolar damage as the histologic correlate of ARDS, with hyaline membrane formation'),
    T('Identify IgA vasculitis as sharing an underlying immunopathology with IgA nephropathy'),
    T('Diagnose anti-glomerular basement membrane disease as a Type II hypersensitivity reaction, causing pulmonary hemorrhage and rapidly progressive glomerulonephritis'),
    T('Recognize a linear immunofluorescence pattern on renal biopsy as characteristic of anti-GBM disease, distinct from the granular pattern of immune complex diseases'),
    T('Identify ischemic colitis as most commonly affecting watershed areas of the colon such as the splenic flexure'),
    T('Diagnose pseudomembranous colitis as characterized by yellow-white plaques on the colonic mucosa from C. difficile toxin-mediated damage'),
    T('Recognize a solitary thyroid nodule with decreased radioactive iodine uptake ("cold nodule") as having a higher relative risk of malignancy than a "hot nodule"'),
    T('Identify a "hot nodule" with increased radioactive iodine uptake as usually benign and associated with autonomous hormone production'),
    T('Diagnose fine-needle aspiration as the initial diagnostic procedure of choice for evaluating a thyroid nodule'),
  ],
  Pharmacology: [
    T('Recognize bidirectional ventricular tachycardia as a classic but rare finding in severe digoxin toxicity'),
    T('Identify corneal deposits (vortex keratopathy) as a common, generally benign finding with long-term amiodarone use'),
    T('Diagnose flecainide as capable of unmasking a Brugada pattern on ECG in susceptible individuals'),
    T('Recognize dofetilide as a Class III antiarrhythmic requiring inpatient initiation due to QT prolongation and torsades risk'),
    T('Identify ibutilide as a Class III antiarrhythmic used for acute pharmacologic cardioversion of atrial fibrillation'),
    T('Diagnose adenosine as used with caution in atrial fibrillation with Wolff-Parkinson-White syndrome due to the risk of accelerating conduction down the accessory pathway'),
    T('Recognize AV nodal blocking agents (calcium channel blockers, beta blockers, digoxin) as relatively contraindicated in WPW with atrial fibrillation'),
    T('Identify ARBs as an alternative to ACE inhibitors in patients who develop a cough, since they do not affect bradykinin metabolism'),
    T('Diagnose hyperkalemia as a shared risk of ACE inhibitors, ARBs, and potassium-sparing diuretics'),
    T('Recognize bilateral renal artery stenosis as a contraindication to ACE inhibitor or ARB use due to the risk of acute kidney injury'),
    T('Identify propranolol as used for primary prophylaxis against variceal bleeding by reducing portal pressure'),
    T('Diagnose octreotide as used in the acute management of variceal bleeding to reduce splanchnic blood flow'),
    T('Recognize terlipressin as a vasopressin analog used for both variceal bleeding and hepatorenal syndrome'),
    T('Identify lactulose dosing as titrated to produce 2-3 soft bowel movements per day in hepatic encephalopathy management'),
    T('Diagnose spironolactone as a first-line diuretic for ascites due to secondary hyperaldosteronism in cirrhosis'),
    T('Recognize albuterol as a short-acting beta-2 agonist used for acute bronchospasm relief'),
    T('Identify salmeterol and formoterol as long-acting beta-2 agonists that should not be used as monotherapy in asthma'),
    T('Diagnose ipratropium as a short-acting muscarinic antagonist used for acute COPD exacerbations and asthma'),
    T('Recognize zileuton as a 5-lipoxygenase inhibitor used in asthma, requiring liver function monitoring'),
    T('Identify cromolyn sodium as a mast cell stabilizer used prophylactically in asthma, with a good safety profile but limited efficacy'),
    T('Diagnose penicillin G as effective against most gram-positive organisms but inactivated by beta-lactamase-producing bacteria'),
    T('Recognize amoxicillin as having improved oral bioavailability compared to ampicillin'),
    T('Identify nafcillin and oxacillin as penicillinase-resistant penicillins used for methicillin-susceptible Staphylococcus aureus'),
    T('Diagnose a Jarisch-Herxheimer-like reaction as possible after antibiotic treatment of any spirochetal infection, not just syphilis'),
    T('Recognize daptomycin as requiring creatine kinase monitoring due to a risk of myopathy'),
    T('Identify propylthiouracil\'s additional mechanism (beyond thyroid peroxidase inhibition) as peripheral inhibition of T4-to-T3 conversion'),
    T('Diagnose beta-blockers as used adjunctively in thyroid storm to control the adrenergic symptoms of thyrotoxicosis'),
    T('Recognize iodinated contrast agents as capable of precipitating thyroid storm in a patient with underlying hyperthyroidism (Jod-Basedow phenomenon)'),
    T('Identify oxybutynin as an anticholinergic used to treat overactive bladder by reducing detrusor muscle contractions'),
    T('Diagnose mirabegron as a beta-3 agonist alternative to anticholinergics for overactive bladder with fewer anticholinergic side effects'),
    T('Recognize finasteride as also used to reduce prostate size and PSA levels, complicating prostate cancer screening interpretation'),
    T('Identify flumazenil\'s use as generally avoided in patients with chronic benzodiazepine use due to the risk of precipitating seizures'),
    T('Diagnose N-acetylcysteine\'s mechanism in acetaminophen toxicity as replenishing hepatic glutathione stores'),
    T('Recognize the four stages of acetaminophen toxicity, with the second stage showing apparent clinical improvement despite ongoing hepatotoxicity'),
    T('Identify serum acetaminophen levels plotted on the Rumack-Matthew nomogram as used to guide the need for N-acetylcysteine treatment'),
    T('Diagnose iron toxicity as classically progressing through GI symptoms, a latent period, and then metabolic acidosis with shock'),
    T('Recognize an abdominal x-ray as potentially useful in acute iron ingestion since iron tablets are radiopaque'),
  ],
  Biochemistry: [
    T('Recognize RANK ligand as produced by osteoblasts to stimulate osteoclast differentiation and activity'),
    T('Identify osteoprotegerin as a decoy receptor that binds RANKL, inhibiting osteoclastogenesis'),
    T('Diagnose denosumab\'s mechanism as mimicking osteoprotegerin by binding and neutralizing RANKL'),
    T('Recognize sclerostin as an osteocyte-derived inhibitor of osteoblast activity via Wnt signaling suppression'),
    T('Identify romosozumab as a sclerostin inhibitor used to increase bone formation in osteoporosis treatment'),
    T('Diagnose the bone remodeling cycle as involving coupled phases of osteoclastic resorption followed by osteoblastic formation'),
  ],
  Physiology: [
    T('Recognize the Poiseuille equation as describing how flow rate depends on vessel radius, pressure gradient, viscosity, and vessel length'),
    T('Identify vessel radius as having the greatest effect on resistance to flow, since resistance is inversely proportional to radius to the fourth power'),
    T('Diagnose Reynolds number as predicting the transition from laminar to turbulent blood flow'),
    T('Recognize turbulent flow as producing an audible bruit or murmur, unlike smooth laminar flow'),
    T('Identify the law of Laplace as explaining why a larger aneurysm has a higher wall tension and risk of rupture at the same pressure'),
    T('Diagnose blood viscosity as increased in conditions such as polycythemia, contributing to increased resistance to flow'),
    T('Recognize the Frank-Starling curve as shifting upward and to the left with increased contractility (e.g., from catecholamines)'),
    T('Identify a rightward and downward shift of the Frank-Starling curve as suggestive of decreased contractility, as in heart failure'),
    T('Diagnose the vasa recta as functioning as countercurrent exchangers to passively maintain, rather than actively create, the medullary concentration gradient'),
    T('Recognize the hypothalamic set point as the target core temperature the body regulates toward, raised during fever by pyrogens'),
  ],
  Microbiology: [
    T('Recognize Chlamydia trachomatis serovars A-C as causing trachoma, a leading infectious cause of blindness worldwide'),
    T('Identify Chlamydia trachomatis serovars D-K as causing genital infections, inclusion conjunctivitis, and neonatal pneumonia'),
    T('Diagnose Chlamydia trachomatis serovars L1-L3 as causing lymphogranuloma venereum'),
    T('Recognize chlamydial conjunctivitis in a newborn as typically presenting later (5-14 days) than gonococcal ophthalmia neonatorum'),
    T('Identify erythromycin ointment as administered to newborns to prevent gonococcal ophthalmia neonatorum'),
    T('Diagnose Chlamydia species as obligate intracellular organisms with a unique biphasic life cycle of elementary and reticulate bodies'),
    T('Recognize the elementary body as the infectious, extracellular form of Chlamydia'),
    T('Identify the reticulate body as the intracellular, replicating form of Chlamydia'),
    T('Diagnose Chlamydia\'s unique cell wall as lacking classic peptidoglycan, explaining beta-lactam antibiotic resistance'),
    T('Recognize Rickettsia species as obligate intracellular organisms that cannot synthesize their own ATP, relying on the host cell'),
    T('Identify malaria chemoprophylaxis choice as depending on the destination\'s chloroquine-resistance pattern'),
    T('Diagnose doxycycline as a chemoprophylaxis option for malaria in most chloroquine-resistant regions'),
    T('Recognize atovaquone-proguanil as a malaria chemoprophylaxis option with a shorter post-travel dosing course than doxycycline or mefloquine'),
    T('Identify Necator americanus as entering the body through skin contact with contaminated soil, unlike Ascaris which is acquired by ingestion'),
    T('Diagnose hookworm larvae migration through the lungs as part of their life cycle before reaching the small intestine'),
    T('Recognize eosinophilia as a common but nonspecific laboratory finding across many helminthic infections'),
    T('Identify a Gram stain as the most rapid initial test to help narrow a bacterial differential diagnosis'),
    T('Diagnose a Gram-positive organism as retaining crystal violet stain due to a thick peptidoglycan cell wall'),
    T('Recognize a Gram-negative organism as losing crystal violet stain and taking up the safranin counterstain due to a thin peptidoglycan layer and outer membrane'),
    T('Identify acid-fast staining as relying on the mycolic acid content of the Mycobacterium cell wall to resist decolorization'),
    T('Diagnose a spore stain as used to visualize the resistant endospores formed by Bacillus and Clostridium species'),
    T('Recognize beta-lactam antibiotics as bactericidal, working by inhibiting cell wall synthesis via penicillin-binding proteins'),
    T('Identify time-dependent killing as characteristic of beta-lactams, where efficacy correlates with the duration above the minimum inhibitory concentration'),
    T('Diagnose concentration-dependent killing as characteristic of aminoglycosides and fluoroquinolones, where efficacy correlates with peak drug concentration'),
    T('Recognize Chromobacterium violaceum infection risk as increased after exposure to soil or stagnant water in tropical regions'),
    T('Identify Aeromonas species as causing wound infections and gastroenteritis after freshwater exposure, including from medicinal leech therapy'),
    T('Diagnose Mycobacterium abscessus as a rapidly growing nontuberculous mycobacterium causing skin and soft tissue infections after cosmetic procedures'),
  ],
  Genetics: [
    T('Recognize hemophilia A as an X-linked deficiency of factor VIII, causing hemarthroses and deep tissue bleeding'),
    T('Identify hemophilia B (Christmas disease) as an X-linked deficiency of factor IX, clinically indistinguishable from hemophilia A without factor assays'),
    T('Diagnose von Willebrand disease type 1 as a partial quantitative deficiency of von Willebrand factor, the most common and mildest form'),
    T('Recognize von Willebrand disease type 3 as a severe, complete deficiency of von Willebrand factor with bleeding similar to hemophilia'),
    T('Identify factor XI deficiency (hemophilia C) as an autosomal recessive bleeding disorder more common in Ashkenazi Jewish populations'),
    T('Diagnose factor XII (Hageman factor) deficiency as prolonging the PTT without causing a clinical bleeding tendency'),
    T('Recognize Becker muscular dystrophy as caused by an in-frame dystrophin mutation, resulting in a partially functional, truncated protein with a milder phenotype'),
    T('Identify an elevated creatine kinase level as an early laboratory finding in Duchenne muscular dystrophy, often before clinical symptoms appear'),
    T('Diagnose Romano-Ward syndrome as the autosomal dominant, non-syndromic form of long QT syndrome'),
    T('Recognize Jervell and Lange-Nielsen syndrome as an autosomal recessive form of long QT syndrome associated with congenital sensorineural deafness'),
    T('Identify Ehlers-Danlos syndrome vascular type as caused by a COL3A1 mutation, carrying a risk of arterial and organ rupture'),
    T('Diagnose Marfan syndrome\'s lens dislocation as typically occurring in the upward direction, distinct from homocystinuria\'s downward lens dislocation'),
    T('Recognize achondroplasia as demonstrating full penetrance with variable expressivity, though most cases arise from new mutations'),
    T('Identify a "double hit" mechanism as required for tumor suppressor gene inactivation, unlike the single-hit mechanism for oncogene activation'),
    T('Diagnose familial hypertriglyceridemia as an autosomal dominant disorder increasing the risk of pancreatitis at very high triglyceride levels'),
    T('Recognize apolipoprotein C-II deficiency as a cause of severe hypertriglyceridemia through impaired lipoprotein lipase activation'),
    T('Identify congenital nephrotic syndrome (Finnish type) as caused by a nephrin gene mutation, presenting with massive proteinuria shortly after birth'),
    T('Diagnose Denys-Drash syndrome\'s diffuse mesangial sclerosis as a distinctive renal histologic finding'),
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
