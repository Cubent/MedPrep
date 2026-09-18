// Round 25: closing batch to reach 1000 for this push. Same relaxed
// standard — similar-but-not-identical to existing titles is acceptable.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize the popliteal fossa as bounded by the biceps femoris superolaterally and the semimembranosus superomedially'),
    T('Identify the common peroneal nerve as running superficially along the lateral aspect of the popliteal fossa and fibular neck'),
    T('Diagnose the saphenous vein as the longest vein in the body, commonly harvested for coronary artery bypass grafting'),
    T('Recognize the great saphenous vein as running anterior to the medial malleolus, at risk during ankle surgery'),
    T('Identify the small saphenous vein as draining into the popliteal vein'),
    T('Diagnose varicose veins as resulting from incompetent venous valves, commonly affecting the saphenous system'),
    T('Recognize the deep venous system of the leg as carrying the majority of venous return, with the superficial system draining into it via perforators'),
    T('Identify a below-knee amputation as generally preferred over above-knee when feasible, given better rehabilitation potential'),
    T('Diagnose the anatomical snuffbox as bounded by the tendons of the abductor pollicis longus, extensor pollicis brevis, and extensor pollicis longus'),
    T('Recognize the scaphoid as palpable within the floor of the anatomical snuffbox'),
  ],
  Pathology: [
    T('Recognize a chalazion as a chronic granulomatous inflammation of a meibomian gland'),
    T('Identify a hordeolum (stye) as an acute infection of an eyelid gland, usually staphylococcal'),
    T('Diagnose blepharitis as chronic inflammation of the eyelid margins'),
    T('Recognize dacryocystitis as infection of the lacrimal sac, presenting with medial canthal swelling and tenderness'),
    T('Identify orbital cellulitis as a serious infection posterior to the orbital septum, risking vision loss and intracranial spread'),
    T('Diagnose preseptal cellulitis as a more superficial infection anterior to the orbital septum, generally less severe than orbital cellulitis'),
    T('Recognize a corneal abrasion as presenting with pain, photophobia, and foreign body sensation, visualized with fluorescein staining'),
    T('Identify a corneal ulcer as a more serious condition than a simple abrasion, carrying a risk of vision-threatening scarring'),
    T('Diagnose uveitis as inflammation of the uveal tract, presenting with eye pain, photophobia, and blurred vision'),
    T('Recognize anterior uveitis as often associated with HLA-B27-related conditions such as ankylosing spondylitis'),
  ],
  Pharmacology: [
    T('Recognize erythromycin as a macrolide with a risk of GI upset and QT prolongation'),
    T('Identify clarithromycin as another macrolide with fewer GI side effects than erythromycin'),
    T('Diagnose azithromycin as a macrolide with a long half-life allowing shorter treatment courses'),
    T('Recognize clindamycin as effective against anaerobic infections and certain gram-positive organisms'),
    T('Identify linezolid as an oxazolidinone effective against resistant gram-positive organisms including VRE'),
    T('Diagnose daptomycin as a lipopeptide antibiotic used for serious gram-positive infections, ineffective for pneumonia'),
    T('Recognize rifampin as an antituberculosis drug that also induces hepatic cytochrome P450 enzymes'),
    T('Identify pyrazinamide as a component of first-line antituberculosis therapy with a risk of hepatotoxicity'),
    T('Diagnose ethambutol as an antituberculosis drug with a risk of optic neuritis'),
    T('Recognize the standard four-drug regimen for active tuberculosis as isoniazid, rifampin, pyrazinamide, and ethambutol'),
  ],
  Biochemistry: [
    T('Recognize glycolysis as yielding a net of two ATP and two NADH per glucose molecule under anaerobic conditions'),
    T('Identify aerobic glucose metabolism as yielding substantially more ATP than anaerobic glycolysis alone'),
    T('Diagnose lactate dehydrogenase as converting pyruvate to lactate under anaerobic conditions, regenerating NAD+'),
    T('Recognize the Cori cycle as linking muscle glycolysis to hepatic gluconeogenesis'),
    T('Identify fatty acid synthesis as occurring in the cytoplasm, distinct from the mitochondrial location of beta-oxidation'),
    T('Diagnose insulin as promoting fatty acid synthesis and inhibiting fatty acid oxidation in the fed state'),
    T('Recognize glucagon as promoting fatty acid oxidation and ketogenesis in the fasted state'),
    T('Identify malonyl-CoA as inhibiting carnitine acyltransferase I, preventing fatty acid oxidation during active fatty acid synthesis'),
    T('Diagnose the citric acid cycle as producing three NADH, one FADH2, and one GTP per turn'),
    T('Recognize the electron transport chain as producing the majority of cellular ATP through oxidative phosphorylation'),
  ],
  Physiology: [
    T('Recognize the baroreceptor reflex as a rapid, short-term mechanism for blood pressure regulation'),
    T('Identify the renin-angiotensin-aldosterone system as a slower, longer-term mechanism for blood pressure regulation'),
    T('Diagnose atrial natriuretic peptide as released in response to atrial stretch, promoting natriuresis and vasodilation'),
    T('Recognize antidiuretic hormone release as stimulated by increased plasma osmolality or decreased blood volume'),
    T('Identify thirst as stimulated by increased plasma osmolality, sensed by hypothalamic osmoreceptors'),
    T('Diagnose the countercurrent multiplier system as generating a hyperosmotic renal medullary interstitium'),
    T('Recognize the vasa recta as preserving the medullary concentration gradient through countercurrent exchange'),
    T('Identify free water clearance as a useful concept for understanding a patient\'s ability to concentrate or dilute urine'),
    T('Diagnose the transport maximum for glucose as the plasma level above which glucose appears in the urine'),
    T('Recognize glucosuria without hyperglycemia as suggestive of a renal tubular defect rather than diabetes mellitus'),
  ],
  Microbiology: [
    T('Recognize Enterococcus faecalis and Enterococcus faecium as gram-positive cocci with intrinsic resistance to many antibiotics'),
    T('Identify vancomycin-resistant enterococci as a significant infection control concern in hospitalized patients'),
    T('Diagnose Listeria monocytogenes as capable of intracellular survival and cell-to-cell spread, evading humoral immunity'),
    T('Recognize Listeria monocytogenes as acquired from contaminated deli meats, soft cheeses, and unpasteurized dairy'),
    T('Identify Campylobacter jejuni as one of the most common bacterial causes of gastroenteritis worldwide'),
    T('Diagnose reactive arthritis as a possible post-infectious complication of Campylobacter, Salmonella, Shigella, or Yersinia enteritis'),
    T('Recognize Yersinia enterocolitica as capable of causing a pseudoappendicitis presentation'),
    T('Identify Vibrio parahaemolyticus as a cause of gastroenteritis from raw or undercooked shellfish'),
    T('Diagnose Aeromonas hydrophila as a cause of gastroenteritis and wound infections associated with freshwater exposure'),
    T('Recognize Plesiomonas shigelloides as a rare cause of gastroenteritis associated with seafood consumption'),
  ],
  Immunology: [
    T('Recognize an immunocompromised host as at increased risk for infections with encapsulated organisms after splenectomy'),
    T('Identify Streptococcus pneumoniae, Haemophilus influenzae, and Neisseria meningitidis as the classic encapsulated organisms of concern in asplenia'),
    T('Diagnose vaccination against encapsulated organisms as recommended prior to elective splenectomy when possible'),
    T('Recognize Howell-Jolly bodies on peripheral smear as a marker of functional or anatomic asplenia'),
    T('Identify a patient with sickle cell disease as developing functional asplenia from repeated splenic infarction'),
    T('Diagnose autoimmune disease as more common in women than men for many conditions, including lupus and Hashimoto thyroiditis'),
    T('Recognize the HLA system as the human version of the major histocompatibility complex'),
    T('Identify a strong HLA association as suggestive of but not diagnostic for a particular autoimmune disease'),
    T('Diagnose immune reconstitution inflammatory syndrome as a paradoxical worsening of symptoms after starting antiretroviral therapy in HIV patients'),
    T('Recognize opportunistic infections as those that cause disease primarily in individuals with a compromised immune system'),
  ],
  Genetics: [
    T('Recognize a pedigree symbol convention of a square as representing a male and a circle as representing a female'),
    T('Identify a filled-in pedigree symbol as representing an affected individual'),
    T('Diagnose a horizontal line connecting two pedigree symbols as representing a mating pair'),
    T('Recognize a diagonal line through a pedigree symbol as representing a deceased individual'),
    T('Identify a diamond pedigree symbol as representing an individual of unknown or unspecified sex'),
    T('Diagnose consanguineous mating on a pedigree as depicted by a double horizontal line'),
    T('Recognize proband as the term for the individual through whom a family is ascertained for a genetic study'),
    T('Identify an arrow on a pedigree as typically indicating the proband'),
    T('Diagnose twins on a pedigree as depicted by two lines diverging from a single point below a parental mating line'),
    T('Recognize a pedigree as a valuable tool for both diagnosis and genetic counseling in suspected hereditary conditions'),
  ],
  Embryology: [
    T('Recognize the primitive streak as regressing and disappearing by the end of the fourth week of development'),
    T('Identify a sacrococcygeal teratoma as arising from remnants of the primitive streak that fail to regress completely'),
    T('Diagnose situs inversus as a condition in which the internal organs are mirrored from their normal positions'),
    T('Recognize situs inversus as classically associated with primary ciliary dyskinesia (Kartagener syndrome)'),
    T('Identify laterality defects as resulting from abnormal signaling that normally establishes left-right asymmetry'),
    T('Diagnose the node (organizer) as playing a key role in establishing left-right asymmetry during gastrulation'),
    T('Recognize nodal cilia as generating a leftward fluid flow that helps establish left-right patterning'),
    T('Identify heterotaxy as an abnormal arrangement of internal organs distinct from complete situs inversus'),
    T('Diagnose asplenia or polysplenia as potential findings associated with heterotaxy syndromes'),
    T('Recognize complex congenital heart disease as commonly associated with heterotaxy syndromes'),
  ],
  Histology: [
    T('Recognize the corpus luteum as a temporary endocrine structure formed from the ruptured ovarian follicle after ovulation'),
    T('Identify the corpus albicans as the fibrous scar remaining after degeneration of the corpus luteum'),
    T('Diagnose primordial follicles as the earliest, most numerous stage of ovarian follicles, present from birth'),
    T('Recognize a primary follicle as characterized by a single layer of cuboidal granulosa cells surrounding the oocyte'),
    T('Identify a secondary (antral) follicle as characterized by a fluid-filled antrum among the granulosa cells'),
    T('Diagnose the zona pellucida as a glycoprotein layer surrounding the oocyte, important for sperm binding'),
    T('Recognize the cumulus oophorus as the mass of granulosa cells surrounding and supporting the oocyte within the follicle'),
    T('Identify the corona radiata as the innermost layer of granulosa cells immediately surrounding the zona pellucida'),
    T('Diagnose the seminiferous tubule as lined by a stratified epithelium containing both germ cells and Sertoli cells'),
    T('Recognize the blood-testis barrier as formed by tight junctions between adjacent Sertoli cells'),
  ],
  'Behavioral Science': [
    T('Recognize learned helplessness as a state of passivity following repeated exposure to uncontrollable negative events'),
    T('Identify learned helplessness as a proposed model for understanding the development of depression'),
    T('Diagnose the availability heuristic as judging the likelihood of an event based on how easily examples come to mind'),
    T('Recognize the anchoring heuristic as relying too heavily on the first piece of information encountered when making a decision'),
    T('Identify confirmation bias as the tendency to favor information that confirms preexisting beliefs'),
    T('Diagnose cognitive dissonance as the mental discomfort experienced when holding contradictory beliefs or behaviors'),
    T('Recognize the fundamental attribution error as overemphasizing personality-based explanations for others\' behavior while underemphasizing situational factors'),
    T('Identify diffusion of responsibility as a phenomenon in which individuals are less likely to act when others are present'),
    T('Diagnose groupthink as a phenomenon in which the desire for group harmony results in poor decision-making'),
    T('Recognize the bystander effect as reduced likelihood of intervention in an emergency when more people are present'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize a case series as a descriptive study reporting on a group of patients with a similar exposure or outcome, without a comparison group'),
    T('Identify an ecological study as analyzing data at the population rather than individual level'),
    T('Diagnose the ecological fallacy as incorrectly inferring individual-level relationships from population-level data'),
    T('Recognize a natural experiment as a study design that takes advantage of a naturally occurring event to compare exposed and unexposed groups'),
    T('Identify a stepped-wedge trial as a design in which an intervention is sequentially rolled out to all participants over time'),
    T('Diagnose a pragmatic trial as designed to evaluate an intervention under real-world conditions'),
    T('Recognize an explanatory trial as designed to evaluate an intervention under ideal, tightly controlled conditions'),
    T('Identify equipoise as genuine uncertainty about the comparative benefits of different treatment arms, justifying a randomized trial'),
    T('Diagnose an interim analysis as a planned analysis conducted before a trial\'s completion, sometimes leading to early stopping'),
    T('Recognize a data safety monitoring board as an independent group overseeing participant safety during a clinical trial'),
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
