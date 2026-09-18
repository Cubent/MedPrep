// One-off script: tenth batch of hand-authored (not model-generated) topic
// titles, continuing the "differentiate along a continuum by combining
// multiple features" style across every discipline (not just histology this
// time) — e.g. foregut vs midgut by blood supply, apoptosis vs necrosis by
// cellular/inflammatory features, Type I vs Type II statistical error, etc.
// Written directly, not produced by calling an LLM API — only the FULL
// QUESTION content is ever generated lazily by AI later, on first use.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Histology: [
    T('Differentiate thick skin from thin skin by the presence of a stratum lucidum'),
    T('Distinguish the stratum basale from the stratum spinosum by mitotic activity and desmosome prominence'),
    T('Differentiate the stratum granulosum from the stratum corneum by the presence of keratohyalin granules'),
    T('Distinguish the vermillion border of the lip from adjacent skin by its lack of hair follicles and sweat glands'),
    T('Differentiate the anterior two-thirds of the tongue from the posterior one-third by papillae type and innervation'),
    T('Distinguish the upper third of the esophagus from the lower third by the type of muscle in the muscularis externa'),
    T('Differentiate the gastric cardia from the gastric fundus by the predominant gland and cell type'),
    T('Distinguish gastric chief cells from parietal cells by their secretory products'),
    T('Differentiate gastric parietal cells from mucous neck cells by their location within the gastric gland'),
    T('Distinguish the ileum from the appendix by the density and location of lymphoid follicles'),
    T('Differentiate periportal (zone 1) hepatocytes from centrilobular (zone 3) hepatocytes by oxygen tension and metabolic function'),
    T('Distinguish gallbladder mucosa from bile duct mucosa by the presence of folds and a muscularis layer'),
    T('Differentiate the cortex from the paracortex of a lymph node by the predominant lymphocyte type'),
    T('Distinguish the paracortex from the medulla of a lymph node by cellular composition'),
    T('Differentiate splenic red pulp from white pulp by predominant cell population and function'),
    T('Distinguish the thymic cortex from the thymic medulla by lymphocyte density and the presence of Hassall corpuscles'),
    T('Differentiate the palatine tonsil from the pharyngeal tonsil (adenoid) by epithelial type'),
    T('Distinguish woven bone from lamellar bone by collagen fiber organization'),
    T('Differentiate hyaline cartilage from elastic cartilage by matrix composition and location'),
    T('Distinguish hyaline cartilage from fibrocartilage by the predominant collagen type'),
    T('Differentiate cardiac muscle from skeletal muscle by the presence of intercalated discs'),
    T('Distinguish a unipolar neuron from a bipolar neuron by process number and typical location'),
    T('Differentiate a bipolar neuron from a multipolar neuron by process number and typical function'),
    T('Distinguish astrocytes from oligodendrocytes by their function in the central nervous system'),
    T('Differentiate oligodendrocytes from Schwann cells by the number of axons each myelinates'),
    T('Distinguish microglia from ependymal cells by their embryological origin and function'),
    T('Differentiate the corneal epithelium from the corneal endothelium by regenerative capacity'),
    T('Distinguish the outer nuclear layer from the inner nuclear layer of the retina by the neurons each contains'),
    T('Differentiate the retinal pigment epithelium from the neurosensory retina by their embryological origin'),
    T('Distinguish enamel from dentin by the cell of origin and mineral content'),
  ],
  Anatomy: [
    T('Differentiate the greater curvature from the lesser curvature of the stomach by blood supply'),
    T('Distinguish the ascending colon from the descending colon by their peritoneal relationships'),
    T('Differentiate the foregut from the midgut by their arterial blood supply'),
    T('Distinguish the midgut from the hindgut by their arterial blood supply'),
    T('Differentiate the internal iliac artery branches from the external iliac artery branches by the structures each supplies'),
    T('Distinguish the superficial inguinal lymph nodes from the deep inguinal lymph nodes by the regions they drain'),
    T('Differentiate the greater trochanter from the lesser trochanter by the muscles attaching to each'),
    T('Distinguish the medial malleolus from the lateral malleolus by the bones each belongs to'),
    T('Differentiate the radial styloid process from the ulnar styloid process by their palpable landmarks'),
    T('Distinguish the true vocal cords from the false vocal cords by their histological and functional differences'),
    T('Differentiate the superior mediastinum from the inferior mediastinum by their vertebral boundaries'),
    T('Distinguish the anterior mediastinum from the middle mediastinum by their contents'),
    T('Differentiate the greater sac from the lesser sac of the peritoneal cavity by their communication'),
    T('Distinguish the visceral pleura from the parietal pleura by their innervation and pain sensitivity'),
    T('Differentiate the visceral peritoneum from the parietal peritoneum by their innervation and pain referral'),
    T('Distinguish the falciform ligament from the ligamentum teres of the liver by their embryological derivation'),
    T('Differentiate the coronary ligament of the liver from the triangular ligaments by their location'),
    T('Distinguish the deep perineal pouch from the superficial perineal pouch by their contents'),
    T('Differentiate the greater vestibular glands from the lesser vestibular glands by their location and secretion'),
  ],
  Physiology: [
    T('Differentiate the fed state from the fasting state by predominant hormone activity and fuel source'),
    T('Distinguish early fasting from prolonged starvation by the primary fuel source used by the brain'),
    T('Differentiate slow-wave sleep from REM sleep by EEG pattern and physiological changes'),
    T('Distinguish the follicular phase from the luteal phase of the menstrual cycle by dominant hormone and endometrial changes'),
    T('Differentiate the proliferative phase from the secretory phase of the endometrial cycle by histological appearance'),
    T('Distinguish the systolic phase from the diastolic phase of the cardiac cycle by ventricular pressure and volume changes'),
    T('Differentiate isovolumetric contraction from isovolumetric relaxation by valve status'),
    T('Distinguish inspiration from expiration by diaphragm movement and intrathoracic pressure changes'),
    T('Differentiate quiet expiration from forced expiration by muscle recruitment'),
    T('Distinguish tidal volume from vital capacity by the lung volumes each represents'),
    T('Differentiate functional residual capacity from residual volume by the point at which each is measured'),
    T('Distinguish a compensated from an uncompensated acid-base disturbance by blood pH'),
    T('Differentiate the ascending limb from the descending limb of the oxygen-hemoglobin dissociation curve by oxygen loading versus unloading'),
    T('Distinguish the central chemoreceptor response to CO2 from the peripheral chemoreceptor response to O2'),
    T('Differentiate the baroreceptor reflex response to hypotension from its response to hypertension'),
  ],
  Pathology: [
    T('Differentiate a transudate from an exudate by protein content and cellularity'),
    T('Distinguish a thrombus from an embolus by their formation and movement'),
    T('Differentiate arterial thrombosis from venous thrombosis by predominant composition'),
    T('Distinguish red (hemorrhagic) infarcts from white (anemic) infarcts by the organs typically affected'),
    T('Differentiate reversible cell injury from irreversible cell injury by ultrastructural changes'),
    T('Distinguish apoptosis from necrosis by cellular and inflammatory features'),
    T('Differentiate hypertrophy from hyperplasia by the cellular mechanism of tissue growth'),
    T('Distinguish metaplasia from dysplasia by reversibility and malignant potential'),
    T('Differentiate a hamartoma from a true neoplasm by growth pattern and cellular origin'),
    T('Distinguish a benign tumor from a malignant tumor by capsule, growth rate, and metastatic potential'),
    T('Differentiate local invasion from metastasis as mechanisms of tumor spread'),
    T('Distinguish hematogenous spread from lymphatic spread of malignancy by typical tumor types'),
  ],
  Biochemistry: [
    T('Differentiate the fed state from the fasted state at the level of insulin and glucagon signaling'),
    T('Distinguish glycogenesis from glycogenolysis by the enzymes and hormonal triggers involved'),
    T('Differentiate glycolysis from gluconeogenesis by their key regulatory enzymes'),
    T('Distinguish aerobic glycolysis from anaerobic glycolysis by the fate of pyruvate'),
    T('Differentiate fasting ketogenesis from fed-state lipogenesis by hormonal control'),
    T('Distinguish an exergonic reaction from an endergonic reaction by the change in free energy'),
    T('Differentiate a coupled reaction from an uncoupled reaction in cellular metabolism'),
    T('Distinguish substrate-level phosphorylation from oxidative phosphorylation by the mechanism of ATP generation'),
    T('Differentiate a saturated fatty acid from an unsaturated fatty acid by structure and melting point'),
    T('Distinguish an essential amino acid from a nonessential amino acid by the body’s capacity to synthesize it'),
  ],
  Immunology: [
    T('Differentiate a T-dependent antigen from a T-independent antigen by the immune response each elicits'),
    T('Distinguish IgM from IgG by structure, valency, and timing of production'),
    T('Differentiate a primary immune organ from a secondary immune organ by function'),
    T('Distinguish humoral immunity from cell-mediated immunity by effector mechanism'),
    T('Differentiate an exogenous antigen pathway from an endogenous antigen pathway by MHC class presentation'),
    T('Distinguish MHC class I from MHC class II by the cells expressing each and the T cells they present to'),
    T('Differentiate CD4+ helper T cells from CD8+ cytotoxic T cells by their function and MHC restriction'),
    T('Distinguish naive T cells from memory T cells by surface markers and response kinetics'),
  ],
  Microbiology: [
    T('Differentiate a Gram-positive cell wall from a Gram-negative cell wall by peptidoglycan thickness and outer membrane'),
    T('Distinguish endotoxin from exotoxin by chemical composition and heat stability'),
    T('Differentiate a bacteriostatic antibiotic from a bactericidal antibiotic by mechanism of action'),
    T('Distinguish primary tuberculosis from secondary (reactivation) tuberculosis by location and immune status'),
    T('Differentiate latent tuberculosis infection from active tuberculosis disease by symptoms and contagiousness'),
    T('Distinguish a lytic viral infection cycle from a lysogenic cycle by bacteriophage behavior'),
    T('Differentiate active immunization from passive immunization by mechanism and duration of protection'),
    T('Distinguish a toxoid vaccine from a subunit vaccine by the antigen used'),
  ],
  Genetics: [
    T('Differentiate autosomal dominant inheritance from autosomal recessive inheritance by pedigree pattern'),
    T('Distinguish X-linked dominant inheritance from X-linked recessive inheritance by affected sex ratio'),
    T('Differentiate mitochondrial inheritance from autosomal inheritance by maternal transmission pattern'),
    T('Distinguish a deletion mutation from a duplication mutation by gene dosage effect'),
    T('Differentiate a germline mutation from a somatic mutation by heritability'),
    T('Distinguish a tumor suppressor gene from an oncogene by their normal function and effect when mutated'),
    T('Differentiate the two-hit hypothesis of tumor suppressor inactivation from a dominant oncogene mechanism'),
    T('Distinguish genomic imprinting from X-inactivation by the parent-of-origin effect'),
  ],
  Embryology: [
    T('Differentiate the embryonic period from the fetal period by developmental milestones and vulnerability to teratogens'),
    T('Distinguish the trophoblast from the embryoblast at the blastocyst stage by their developmental fate'),
    T('Differentiate the cytotrophoblast from the syncytiotrophoblast by structure and hormone production'),
    T('Distinguish the amnion from the chorion by their embryological origin'),
    T('Differentiate the umbilical vein from the umbilical arteries by the direction and oxygenation of blood flow'),
    T('Distinguish the ductus venosus from the ductus arteriosus by the vessels each connects'),
  ],
  Pharmacology: [
    T('Differentiate pharmacokinetics from pharmacodynamics by what each describes'),
    T('Distinguish drug absorption from drug distribution by the pharmacokinetic phase each represents'),
    T('Differentiate first-pass metabolism from systemic metabolism by anatomical location'),
    T('Distinguish a loading dose from a maintenance dose by their pharmacokinetic purpose'),
    T('Differentiate a Phase I drug metabolism reaction from a Phase II reaction by chemical modification type'),
    T('Distinguish an enzyme inducer from an enzyme inhibitor by their effect on hepatic drug metabolism'),
    T('Differentiate therapeutic index from potency by what each measures'),
    T('Distinguish efficacy from potency in describing a drug’s dose-response relationship'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Differentiate a null hypothesis from an alternative hypothesis by what each proposes'),
    T('Distinguish alpha from beta in hypothesis testing by the type of error each represents'),
    T('Differentiate a one-sample t-test from a two-sample t-test by the comparison each makes'),
    T('Distinguish parametric from nonparametric statistical tests by their underlying assumptions'),
    T('Differentiate a prospective cohort study from a retrospective cohort study by the direction of data collection'),
    T('Distinguish an incidence-based measure from a prevalence-based measure by what each captures'),
  ],
  'Behavioral Science': [
    T('Differentiate an adjustment disorder from major depressive disorder by symptom severity and trigger'),
    T('Distinguish major depressive disorder from persistent depressive disorder by severity and duration'),
    T('Differentiate generalized anxiety disorder from normal everyday worry by degree and impairment'),
    T('Distinguish substance intoxication from substance withdrawal by the direction of physiological change'),
    T('Differentiate physical dependence from psychological addiction by the presence of withdrawal symptoms'),
    T('Distinguish tolerance from sensitization by the direction of the response to repeated drug exposure'),
    T('Differentiate classical conditioning from operant conditioning by the type of association learned'),
    T('Distinguish positive punishment from negative punishment by the addition or removal of a stimulus'),
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
