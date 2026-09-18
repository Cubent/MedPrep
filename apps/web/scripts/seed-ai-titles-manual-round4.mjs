// One-off script: inserts a fourth batch of hand-authored (not model-
// generated) topic titles into the "AI Generated" System's title pool, per
// discipline. Written directly, not produced by calling an LLM API — only
// the FULL QUESTION content (stem/choices/explanation) is ever generated
// lazily by AI later, on first use, exactly as before.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Describe the Couinaud segmental anatomy of the liver and its surgical relevance'),
    T('Explain the anatomy of the biliary tree including the cystic duct and sphincter of Oddi'),
    T('Identify the anatomical relations of the duodenum and pylorus'),
    T('Describe the blood supply of the appendix through the mesoappendix'),
    T('Explain the anatomy of the sigmoid colon and its predisposition to volvulus'),
    T('Identify the blood supply of the rectum and anal canal from superior, middle, and inferior rectal vessels', true),
    T('Describe the anatomy of the perineal membrane and its relation to the urogenital triangle'),
    T('Explain the layers of the scrotum and their embryological correspondence to the abdominal wall'),
    T('Identify the anatomy of the corpora cavernosa and corpus spongiosum in erectile function'),
    T('Describe the anatomy of the clitoris and vestibular bulbs'),
    T('Explain the anatomy of the female urethra and its relation to the anterior vaginal wall'),
    T('Identify the anatomy of the pudendal canal (Alcock canal) and its clinical relevance'),
    T('Describe the anatomy of the coccygeus muscle and its role in the pelvic floor'),
    T('Explain the anatomy of the hip abductor muscles and the mechanism of a positive Trendelenburg sign'),
    T('Identify the anatomy of the lateral ankle ligament complex and the mechanism of an inversion sprain', true),
    T('Describe the blood supply of the Achilles tendon and its relevance to rupture risk'),
    T('Explain the anatomy of the carpal bones and the mechanism of a lunate dislocation', true),
    T('Identify the anatomy of the flexor and extensor retinacula of the wrist'),
    T('Describe the anatomy of the deltoid ligament of the ankle and the mechanism of eversion injury'),
    T('Explain the anatomy of the iliotibial band and its relevance to iliotibial band syndrome'),
  ],
  'Behavioral Science': [
    T('Explain Bandura’s theory of observational (social) learning'),
    T('Identify the concept of locus of control and its influence on health behavior'),
    T('Describe the concept of self-efficacy and its role in behavior change'),
    T('Explain the concept of cognitive dissonance and its resolution'),
    T('Identify the halo effect and its influence on clinical judgment'),
    T('Describe the availability heuristic and its effect on risk perception'),
    T('Explain the anchoring bias in clinical decision-making'),
    T('Identify the concept of base rate neglect in diagnostic reasoning'),
    T('Describe the sunk cost fallacy and its influence on treatment decisions'),
    T('Explain the paternalistic, informative, interpretive, and deliberative models of the physician-patient relationship', true),
    T('Identify the use of the cultural formulation interview in psychiatric assessment'),
    T('Describe the cross-cultural variation in the presentation of somatization'),
    T('Explain the diagnostic criteria for adjustment disorder'),
    T('Identify the clinical features of disinhibited social engagement disorder'),
    T('Describe the clinical presentation of post-traumatic stress disorder in children'),
    T('Explain the legal distinction between decision-making capacity and legal competency', true),
    T('Identify the mature minor doctrine and its application to consent for treatment'),
    T('Describe the physician’s duty to warn under the Tarasoff ruling'),
    T('Explain the confidentiality exceptions that apply when a patient poses a danger to others'),
    T('Identify the signs of neglect versus abuse in a vulnerable elderly patient', true),
  ],
  Biochemistry: [
    T('Describe the biochemical consequences of riboflavin (vitamin B2) deficiency'),
    T('Explain the biochemical role of pantothenic acid (vitamin B5) as a component of coenzyme A'),
    T('Identify the biochemical mechanism of advanced glycation end product (AGE) formation in diabetes'),
    T('Describe the biochemical basis of the sorbitol (polyol) pathway in diabetic complications'),
    T('Explain the biochemical basis of hemoglobin variants including HbS, HbC, and HbE'),
    T('Identify the biochemical role of 2,3-bisphosphoglycerate in modulating hemoglobin oxygen affinity'),
    T('Describe the molecular basis of the hemoglobin switch from gamma-globin to beta-globin after birth'),
    T('Explain the levels of protein structure: primary, secondary, tertiary, and quaternary'),
    T('Identify the six major classes of enzymes based on the reaction they catalyze'),
    T('Describe the concept of allosteric regulation and cooperative enzyme kinetics'),
    T('Explain the biochemical mechanism of zymogen activation in the digestive enzyme cascade'),
    T('Identify the role of the SNARE complex in vesicular trafficking and neurotransmitter release'),
    T('Describe the mechanism of receptor-mediated endocytosis using the LDL receptor pathway'),
    T('Explain the biochemical significance of protein glycosylation as a post-translational modification'),
    T('Identify the biochemical basis of I-cell disease from a defect in mannose-6-phosphate tagging'),
    T('Describe the biochemical mechanism of ubiquitination as a signal for protein degradation'),
    T('Explain the biochemical role of chaperonins (GroEL/GroES) in protein folding'),
    T('Identify the biochemical basis of amyloidosis from misfolded protein aggregation'),
    T('Describe the biochemical mechanism of the unfolded protein response to endoplasmic reticulum stress'),
    T('Explain the biochemical mechanism of desmosome and hemidesmosome adhesion in epithelial integrity'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Identify the concept of face validity in evaluating a research instrument'),
    T('Describe the Hawthorne effect and its influence on study outcomes'),
    T('Explain the concept of volunteer bias in observational research'),
    T('Identify the concept of social desirability bias in survey-based research'),
    T('Describe the influence of interviewer bias on data collection quality'),
    T('Explain the design and use of a regression discontinuity study'),
    T('Identify the use of a difference-in-differences design in policy evaluation research'),
    T('Describe the use of an instrumental variable to address unmeasured confounding'),
    T('Explain the difference between a fixed-effects and a random-effects model in meta-analysis', true),
    T('Identify the purpose of a sensitivity analysis in a systematic review'),
    T('Describe the design and interpretation of a network meta-analysis'),
    T('Explain the concept of clinical equipoise as distinct from statistical equipoise'),
    T('Identify the use of a run-in period in clinical trial design', true),
    T('Describe the purpose of a washout period in a crossover trial'),
    T('Explain the concept of a composite endpoint in clinical trial design'),
    T('Identify the limitations of using a surrogate marker as a trial endpoint'),
    T('Describe the use of the McNemar test for paired categorical data', true),
    T('Explain the use of the Wilcoxon signed-rank test for non-normally distributed paired data'),
  ],
  Embryology: [
    T('Explain the embryological development of the salivary glands from oral ectoderm'),
    T('Describe the embryological origin of the liver bud from the foregut endoderm'),
    T('Identify the embryological differentiation of pancreatic endocrine cell types'),
    T('Explain the process of physiological midgut herniation and its normal 270-degree rotation'),
    T('Describe the embryological basis of intestinal malrotation and the risk of midgut volvulus'),
    T('Identify the embryological formation of the mesentery and its attachment to the posterior body wall'),
    T('Describe the embryological origin of the greater omentum from the dorsal mesogastrium'),
    T('Explain the embryological origin of the lesser omentum from the ventral mesogastrium'),
    T('Identify the embryological basis of the foregut, midgut, and hindgut blood supply divisions', true),
    T('Describe the embryological development of the tongue papillae and taste bud innervation'),
    T('Explain the embryological basis of a Meckel scan in detecting ectopic gastric mucosa'),
    T('Identify the embryological timeline of primary versus secondary ossification centers', true),
    T('Describe the embryological basis of achondroplasia at the level of growth plate cartilage'),
    T('Explain the embryological development of the cranial base and the anterior and posterior fontanelles'),
    T('Identify the embryological basis of craniosynostosis from premature suture fusion'),
  ],
  Genetics: [
    T('Identify the genetic basis of achondroplasia at the level of the FGFR3 gene'),
    T('Describe the genetic basis of pyruvate kinase deficiency and its hemolytic anemia'),
    T('Explain the genetic distinction between hemophilia A and hemophilia B by clotting factor deficiency', true),
    T('Identify the inheritance pattern and clinical features of von Willebrand disease'),
    T('Describe the genetic basis of Waardenburg syndrome and its associated hearing loss'),
    T('Explain the genetic basis of Usher syndrome and its combined hearing and vision loss', true),
    T('Identify the genetic basis and inheritance pattern of retinitis pigmentosa'),
    T('Describe the genetic basis of achromatopsia and its effect on color vision'),
    T('Explain the genetic basis of Leigh syndrome as a mitochondrial disorder'),
    T('Identify the clinical features and genetics of triple X syndrome'),
    T('Describe the clinical features and genetics of XYY syndrome', true),
    T('Explain the genetic basis of Stickler syndrome and its collagen gene mutations'),
    T('Identify the genetic basis of osteopetrosis and the defect in osteoclast function'),
    T('Describe the genetic basis of triple A syndrome and its features of achalasia and adrenal insufficiency'),
    T('Explain the genetic basis of Alagille syndrome and its JAG1 gene mutation'),
    T('Identify the genetic basis of Noonan syndrome through RAS-MAPK pathway mutations'),
    T('Describe the genetic basis of CHARGE syndrome'),
    T('Explain the genetic basis of VACTERL association and its pattern of co-occurring anomalies'),
  ],
  Histology: [
    T('Identify the histological distribution and staining characteristics of pancreatic islet alpha, beta, and delta cells', true),
    T('Describe the histological features and function of parafollicular (C) cells in the thyroid'),
    T('Explain the histological organization of major hypothalamic nuclei'),
    T('Identify the histological features of basal ganglia nuclei'),
    T('Describe the histological structure of the macula lutea and its role in central vision'),
    T('Explain the histological features of photoreceptor rods versus cones in the retina', true),
    T('Identify the histological structure and myelination pattern of the optic nerve'),
    T('Describe the histological structure of the vocal cords and the layers of the lamina propria'),
    T('Explain the histological structure of the epiglottis'),
    T('Identify the histological differences between terminal and respiratory bronchioles'),
    T('Describe the histological features and function of type I versus type II pneumocytes', true),
    T('Explain the histological structure of Clara (club) cells in the bronchiolar epithelium'),
    T('Identify the histological structure of the alveolar-capillary membrane'),
    T('Describe the histological features of the carotid body and its chemoreceptor function'),
    T('Explain the histological structure of the aortic body and its role in chemoreception'),
  ],
  Immunology: [
    T('Explain the clinical consequences of early complement component (C1-C4) deficiency and lupus-like disease', true),
    T('Identify the clinical consequences of terminal complement component (C5-C9) deficiency and Neisseria susceptibility'),
    T('Describe the increased risk of encapsulated organism infection after splenectomy and the vaccines recommended'),
    T('Explain the role of secretory IgA in mucosal immune defense'),
    T('Identify the structure and function of gut-associated lymphoid tissue (GALT)'),
    T('Describe the role of M cells in antigen sampling within Peyer patches'),
    T('Explain the concept of the graft-versus-leukemia effect in allogeneic stem cell transplantation'),
    T('Identify the mechanism of NK cell missing-self recognition of virally infected or tumor cells'),
    T('Describe the function of natural killer T cells in bridging innate and adaptive immunity'),
    T('Explain the role of gamma-delta T cells in mucosal and epithelial immune surveillance'),
    T('Identify the function of innate lymphoid cells in mucosal immunity'),
    T('Describe the mechanism of antibody-mediated rejection in solid organ transplantation'),
    T('Identify the histological findings of acute cellular rejection on a transplant biopsy'),
    T('Explain the mechanism of chronic allograft rejection and vasculopathy', true),
    T('Describe the immunological basis of ABO blood group incompatibility in transfusion reactions'),
  ],
  Microbiology: [
    T('Identify the use and limitations of Gram stain in diagnosing atypical bacterial infections'),
    T('Describe the use of acid-fast staining in diagnosing Mycobacterium infections', true),
    T('Explain the use of India ink staining in diagnosing Cryptococcus neoformans'),
    T('Identify the use of KOH preparation in diagnosing fungal skin infections'),
    T('Describe the use of Giemsa staining in diagnosing malaria and other blood parasites'),
    T('Explain the clinical significance of bacterial spore formation in Bacillus and Clostridium species'),
    T('Identify the role of bacterial capsules in evading phagocytosis and virulence'),
    T('Describe the role of bacterial pili and fimbriae in adhesion and pathogenesis'),
    T('Explain the classification of bacterial exotoxins into AB toxins, superantigens, and pore-forming toxins', true),
    T('Identify the mechanism of bacterial efflux pumps in antibiotic resistance'),
    T('Describe the mechanism of porin loss as a resistance mechanism in Gram-negative bacteria'),
    T('Explain the clinical significance of enveloped versus non-enveloped virus structure for disinfection'),
    T('Identify the use of the Ziehl-Neelsen stain in diagnosing Nocardia versus Mycobacterium'),
    T('Describe the use of blood agar hemolysis patterns in identifying streptococcal species', true),
    T('Explain the use of the coagulase test in differentiating Staphylococcus species'),
  ],
  Pathology: [
    T('Identify the histopathological features of multiple sclerosis plaques on brain biopsy'),
    T('Describe the pathological features of motor neuron degeneration in amyotrophic lateral sclerosis'),
    T('Explain the pathological significance of Lewy bodies in Parkinson disease'),
    T('Identify the gross pathological finding of caudate nucleus atrophy in Huntington disease'),
    T('Describe the pathological classification of hydrocephalus into communicating and noncommunicating types'),
    T('Explain the pathophysiology and typical location of a subdural hematoma', true),
    T('Identify the pathophysiology and typical location of an epidural hematoma'),
    T('Describe the pathophysiology of a subarachnoid hemorrhage and its common causes'),
    T('Explain the pathogenesis of berry aneurysm formation and rupture at the circle of Willis'),
    T('Identify the typical anatomical locations of hypertensive intracerebral hemorrhage'),
    T('Describe the histopathological features of segmental demyelination on a peripheral nerve biopsy'),
    T('Explain the pathological features of Wallerian degeneration after axonal injury'),
    T('Identify the pathological features of a watershed (border zone) cerebral infarct'),
    T('Describe the pathophysiology of transient ischemic attack versus completed stroke'),
    T('Explain the pathological classification of brain tumors by cell of origin (glioma, meningioma, schwannoma)', true),
  ],
  Pharmacology: [
    T('Identify common drugs metabolized via CYP3A4 and the effect of grapefruit juice on their levels'),
    T('Describe the drug classes most commonly associated with QT interval prolongation', true),
    T('Explain the mechanism and management of local anesthetic systemic toxicity (LAST)'),
    T('Identify the drugs most commonly associated with drug-induced lupus erythematosus'),
    T('Describe the mechanism of drug-induced hepatotoxicity from acetaminophen versus idiosyncratic reactions'),
    T('Explain the drugs most commonly associated with Stevens-Johnson syndrome and toxic epidermal necrolysis'),
    T('Identify the clinical features and causative drugs of DRESS syndrome'),
    T('Describe the drug classes most commonly associated with anaphylactic reactions'),
    T('Explain the mechanism of pseudoallergic (anaphylactoid) reactions to radiocontrast media'),
    T('Identify the mechanism and management of heparin-induced thrombocytopenia', true),
    T('Describe the mechanism of drug-induced agranulocytosis and the drugs most commonly implicated'),
    T('Explain the mechanism of drug-induced pulmonary fibrosis from agents such as bleomycin and amiodarone'),
    T('Identify the mechanism and monitoring of amiodarone-induced thyroid dysfunction'),
    T('Describe the mechanism of tardive dyskinesia from chronic antipsychotic use'),
    T('Explain the mechanism of serotonin syndrome versus malignant hyperthermia by triggering drug class', true),
  ],
  Physiology: [
    T('Explain the physiological regulation of thirst via hypothalamic osmoreceptors'),
    T('Identify the osmotic versus non-osmotic stimuli for antidiuretic hormone release', true),
    T('Describe the physiological roles of the hypothalamic hunger and satiety centers'),
    T('Explain the physiological role of the suprachiasmatic nucleus in circadian rhythm regulation'),
    T('Identify the physiological basis of the diurnal variation in cortisol secretion'),
    T('Describe the physiological pattern of pulsatile growth hormone secretion'),
    T('Explain the physiological regulation of prolactin secretion by dopamine inhibition'),
    T('Identify the physiological basis of the Ferguson reflex in initiating and sustaining labor'),
    T('Describe the physiological cardiovascular adaptations to chronic aerobic exercise training'),
    T('Explain the physiological mechanisms triggering the first breath at birth'),
    T('Identify the physiological changes in pulmonary vascular resistance during the fetal-to-neonatal transition', true),
    T('Describe the physiological basis of resting bradycardia in trained athletes'),
    T('Explain the physiological regulation of body temperature set point during fever'),
    T('Identify the physiological mechanisms of shivering and non-shivering thermogenesis'),
    T('Describe the physiological basis of the countercurrent multiplier system in urine concentration'),
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
