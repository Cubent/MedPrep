// Round 27: closing batch to reach 1000 for this push. Same relaxed
// standard — similar-but-not-identical to existing titles is acceptable.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize the vertebral artery as ascending through the transverse foramina of the cervical vertebrae'),
    T('Identify the basilar artery as formed by the union of the two vertebral arteries at the base of the brainstem'),
    T('Diagnose the circle of Willis as an anastomotic ring providing collateral circulation between the anterior and posterior cerebral circulations'),
    T('Recognize the anterior communicating artery as a common site of intracranial berry aneurysm'),
    T('Identify the posterior communicating artery as connecting the internal carotid and posterior cerebral circulations'),
    T('Diagnose the middle meningeal artery as running beneath the pterion, at risk during temporal skull fractures'),
    T('Recognize the diploic veins as located within the layers of the skull, providing a potential route for infection to spread intracranially'),
    T('Identify emissary veins as connecting the extracranial venous system to the intracranial dural venous sinuses'),
    T('Diagnose the confluence of sinuses as the point where the superior sagittal, straight, and occipital sinuses meet'),
    T('Recognize the sigmoid sinus as continuing as the internal jugular vein as it exits the skull'),
  ],
  Pathology: [
    T('Recognize acanthosis nigricans as velvety hyperpigmented skin most often associated with insulin resistance'),
    T('Identify acanthosis nigricans as a possible paraneoplastic marker for gastric adenocarcinoma when it appears suddenly in an older adult'),
    T('Diagnose seborrheic keratosis as a common benign, waxy, "stuck-on" skin lesion in older adults'),
    T('Recognize the sudden appearance of multiple seborrheic keratoses (Leser-Trelat sign) as a possible paraneoplastic marker for GI malignancy'),
    T('Identify xanthelasma as yellowish periorbital plaques associated with hyperlipidemia'),
    T('Diagnose erythema nodosum as tender, red nodules on the shins associated with sarcoidosis, infections, and inflammatory bowel disease'),
    T('Recognize pyoderma gangrenosum as a rapidly progressive ulcerating skin condition associated with inflammatory bowel disease'),
    T('Identify vitiligo as an autoimmune condition causing depigmented patches of skin from melanocyte destruction'),
    T('Diagnose albinism as a genetic condition resulting in a partial or complete absence of melanin production'),
    T('Recognize melasma as hyperpigmented facial patches associated with pregnancy or hormonal contraceptive use'),
  ],
  Pharmacology: [
    T('Recognize insulin as available in rapid-acting, short-acting, intermediate-acting, and long-acting formulations to mimic physiologic patterns'),
    T('Identify a basal-bolus insulin regimen as combining long-acting basal insulin with rapid-acting mealtime insulin'),
    T('Diagnose hypoglycemia as the most common adverse effect of insulin therapy'),
    T('Recognize somogyi phenomenon as morning hyperglycemia resulting from a counter-regulatory response to nocturnal hypoglycemia'),
    T('Identify the dawn phenomenon as morning hyperglycemia resulting from early morning growth hormone and cortisol release'),
    T('Diagnose an insulin pump as an alternative delivery method allowing continuous subcutaneous insulin infusion'),
    T('Recognize continuous glucose monitoring as an increasingly used tool for real-time glycemic tracking'),
    T('Identify pramlintide as an amylin analog used as an adjunct to insulin therapy'),
    T('Diagnose acarbose and miglitol as alpha-glucosidase inhibitors that delay carbohydrate absorption'),
    T('Recognize combination oral diabetes therapy as commonly used when monotherapy fails to achieve glycemic targets'),
  ],
  Biochemistry: [
    T('Recognize the electron transport chain complexes as sequentially transferring electrons to generate a proton gradient'),
    T('Identify complex I (NADH dehydrogenase) as accepting electrons from NADH'),
    T('Diagnose complex II (succinate dehydrogenase) as accepting electrons from FADH2, notably also part of the citric acid cycle'),
    T('Recognize complex III (cytochrome bc1) as transferring electrons via cytochrome c to complex IV'),
    T('Identify complex IV (cytochrome c oxidase) as the final electron acceptor complex, reducing oxygen to water'),
    T('Diagnose ATP synthase (complex V) as using the proton gradient to generate ATP from ADP and inorganic phosphate'),
    T('Recognize rotenone as an inhibitor of complex I'),
    T('Identify antimycin A as an inhibitor of complex III'),
    T('Diagnose carbon monoxide and cyanide as inhibitors of complex IV'),
    T('Recognize oligomycin as inhibiting ATP synthase directly rather than the electron transport chain itself'),
  ],
  Physiology: [
    T('Recognize the vestibulospinal tract as helping to maintain posture and balance'),
    T('Identify the corticospinal tract as the primary pathway for voluntary motor control, decussating at the pyramids'),
    T('Diagnose the rubrospinal tract as contributing to upper limb flexor tone'),
    T('Recognize decorticate posturing (arm flexion) as suggestive of a lesion above the level of the red nucleus'),
    T('Identify decerebrate posturing (arm extension) as suggestive of a lesion at or below the level of the red nucleus, generally indicating a worse prognosis'),
    T('Diagnose the reticulospinal tract as influencing muscle tone and posture, particularly of axial and proximal limb muscles'),
    T('Recognize muscle spindles as sensory receptors that detect changes in muscle length'),
    T('Identify Golgi tendon organs as sensory receptors that detect changes in muscle tension'),
    T('Diagnose alpha motor neurons as directly innervating extrafusal (contractile) skeletal muscle fibers'),
    T('Recognize gamma motor neurons as innervating intrafusal muscle fibers within muscle spindles, adjusting their sensitivity'),
  ],
  Microbiology: [
    T('Recognize Bacteroides fragilis as the most common anaerobic organism isolated from intra-abdominal infections'),
    T('Identify Fusobacterium necrophorum as a cause of Lemierre syndrome, a septic thrombophlebitis of the internal jugular vein'),
    T('Diagnose Prevotella species as anaerobic organisms associated with aspiration pneumonia and oral infections'),
    T('Recognize Peptostreptococcus as an anaerobic gram-positive coccus found in mixed infections'),
    T('Identify Clostridium septicum bacteremia as associated with underlying colorectal malignancy'),
    T('Diagnose metronidazole as generally effective first-line therapy for most anaerobic bacterial infections'),
    T('Recognize a foul odor as a classic clinical clue suggestive of anaerobic infection'),
    T('Identify gas formation in tissue as another classic sign suggestive of certain anaerobic or clostridial infections'),
    T('Diagnose polymicrobial infections as common in intra-abdominal and diabetic foot infections, often involving both aerobes and anaerobes'),
    T('Recognize empiric antibiotic coverage for suspected anaerobic infection as an important consideration in intra-abdominal sepsis'),
  ],
  Immunology: [
    T('Recognize secondary lymphoid organs as including lymph nodes, spleen, and mucosa-associated lymphoid tissue'),
    T('Identify primary lymphoid organs as the bone marrow and thymus, where lymphocytes develop and mature'),
    T('Diagnose mucosa-associated lymphoid tissue (MALT) as immune tissue found within mucosal surfaces such as the gut and respiratory tract'),
    T('Recognize Peyer patches as MALT structures found within the small intestine, particularly the ileum'),
    T('Identify M cells as specialized epithelial cells that sample antigen from the gut lumen and deliver it to underlying immune tissue'),
    T('Diagnose secretory IgA as protected from proteolytic degradation by a secretory component, allowing it to function in mucosal secretions'),
    T('Recognize the tonsils and adenoids (Waldeyer ring) as MALT structures providing immune surveillance of the oropharynx'),
    T('Identify bronchus-associated lymphoid tissue (BALT) as immune tissue found within the respiratory mucosa'),
    T('Diagnose the appendix as containing abundant lymphoid tissue, suggesting an immune function beyond a vestigial role'),
    T('Recognize gut-associated lymphoid tissue as playing a key role in maintaining tolerance to commensal bacteria and dietary antigens'),
  ],
  Genetics: [
    T('Recognize an autosomal dominant condition with 100% penetrance as always producing the phenotype in individuals carrying the mutant allele'),
    T('Identify reduced penetrance as explaining why some individuals with a disease-causing genotype do not develop the associated phenotype'),
    T('Diagnose a proband as the affected individual whose case leads to the identification and study of a family with a genetic condition'),
    T('Recognize skipped generations on a pedigree as inconsistent with typical autosomal dominant inheritance unless reduced penetrance is present'),
    T('Identify male-to-male transmission on a pedigree as excluding X-linked inheritance patterns'),
    T('Diagnose an X-linked recessive condition as never transmitted from an affected father to his sons'),
    T('Recognize an affected father with an X-linked dominant condition as transmitting the condition to all of his daughters but none of his sons'),
    T('Identify a Y-linked (holandric) trait as passed from father to all sons, with no expression in daughters'),
    T('Diagnose an autosomal recessive condition appearing in a child of unaffected, related parents as suggestive of shared carrier status from a common ancestor'),
    T('Recognize an increased rate of certain autosomal recessive conditions in specific populations as often explained by founder effects or genetic drift'),
  ],
  Embryology: [
    T('Recognize the somites as forming in a craniocaudal sequence during the fourth through fifth weeks of development'),
    T('Identify approximately 42-44 pairs of somites as forming during normal human development'),
    T('Diagnose the resegmentation of sclerotomes as explaining how each vertebra ultimately derives from portions of two adjacent somites'),
    T('Recognize the notochord as regressing but persisting as the nucleus pulposus within each intervertebral disc'),
    T('Identify a persistent notochordal remnant as the origin of a rare tumor called a chordoma'),
    T('Diagnose the neural tube as closing first in the cervical region, with closure then proceeding cranially and caudally'),
    T('Recognize the anterior neuropore as normally closing around day 25 of development'),
    T('Identify the posterior neuropore as normally closing around day 28 of development'),
    T('Diagnose maternal serum and amniotic fluid alpha-fetoprotein as elevated in open neural tube defects due to leakage of fetal proteins'),
    T('Recognize acetylcholinesterase in amniotic fluid as another marker used to help confirm an open neural tube defect'),
  ],
  Histology: [
    T('Recognize white blood cells as classified into granulocytes (neutrophils, eosinophils, basophils) and agranulocytes (lymphocytes, monocytes)'),
    T('Identify neutrophils as the most abundant circulating white blood cell, characterized by a multilobed nucleus'),
    T('Diagnose eosinophils as containing large, orange-red granules and a bilobed nucleus, prominent in allergic and parasitic conditions'),
    T('Recognize basophils as the least common circulating granulocyte, containing large basophilic granules'),
    T('Identify lymphocytes as having a large, round nucleus with minimal cytoplasm, appearing as the smallest of the common leukocytes'),
    T('Diagnose monocytes as the largest circulating leukocyte, with a characteristic kidney-shaped nucleus'),
    T('Recognize platelets as small, anucleate cell fragments derived from megakaryocytes, essential for hemostasis'),
    T('Identify reticulocytes as immature red blood cells that still contain residual ribosomal RNA'),
    T('Diagnose a reticulocyte count as used clinically to assess bone marrow erythropoietic activity'),
    T('Recognize mature red blood cells as lacking a nucleus and most organelles, an adaptation that maximizes space for hemoglobin'),
  ],
  'Behavioral Science': [
    T('Recognize an ethics consultation as a resource available to help resolve complex or contested clinical decisions'),
    T('Identify a hospital ethics committee as typically composed of clinicians, ethicists, and community representatives'),
    T('Diagnose futile care disputes as sometimes requiring ethics committee involvement when the patient, family, and care team disagree'),
    T('Recognize dual-loyalty conflicts as arising when a physician\'s obligations to a patient conflict with obligations to a third party, such as an employer or the state'),
    T('Identify occupational medicine evaluations as an example of a context where dual loyalty considerations commonly arise'),
    T('Diagnose research ethics as requiring informed consent, minimization of risk, and independent review distinct from standard clinical care'),
    T('Recognize the Belmont Report principles (respect for persons, beneficence, and justice) as foundational to modern research ethics'),
    T('Identify an institutional review board as responsible for reviewing and approving research involving human subjects'),
    T('Diagnose vulnerable populations (children, prisoners, cognitively impaired individuals) as requiring additional protections in research'),
    T('Recognize the Declaration of Helsinki as an international ethical framework guiding medical research involving human subjects'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize attributable risk as the difference in incidence of an outcome between an exposed and unexposed group'),
    T('Identify population attributable risk as estimating the proportion of disease in a population that could be prevented by eliminating an exposure'),
    T('Diagnose an epidemic curve as a graphical display of case counts over time, useful for identifying an outbreak\'s source and pattern'),
    T('Recognize a point-source outbreak as characterized by a single, sharp peak on an epidemic curve'),
    T('Identify a propagated outbreak as characterized by successive waves on an epidemic curve, consistent with person-to-person transmission'),
    T('Diagnose active surveillance as involving deliberate, ongoing efforts to identify cases of a disease'),
    T('Recognize passive surveillance as relying on routine reporting by healthcare providers without active case-finding efforts'),
    T('Identify sentinel surveillance as monitoring disease trends through a select group of reporting sites rather than the entire population'),
    T('Diagnose a case definition as a standardized set of criteria used to determine whether a person should be classified as having a particular condition during an investigation'),
    T('Recognize outbreak investigation as typically proceeding through steps including confirming the diagnosis, establishing a case definition, and identifying the source'),
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
