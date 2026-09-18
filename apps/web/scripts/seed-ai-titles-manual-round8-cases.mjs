// One-off script: eighth batch of hand-authored (not model-generated) topic
// titles, continuing the specific clinical case/pattern-recognition
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
    T('Recognize numbness of the little finger with hand weakness after a bicycle ride as Guyon canal syndrome'),
    T('Identify forearm pain without motor weakness as radial tunnel syndrome'),
    T('Diagnose weakness of finger and wrist extension without sensory loss as supinator syndrome from posterior interosseous nerve compression'),
    T('Recognize exercise-induced calf pain and diminished pulses in a young athlete as popliteal artery entrapment syndrome'),
    T('Identify left leg swelling from compression of the iliac vein by the overlying artery as May-Thurner syndrome'),
    T('Diagnose left flank pain and hematuria from compression of the renal vein between two arteries as nutcracker syndrome'),
    T('Recognize postprandial abdominal pain and weight loss from compression of the celiac artery as median arcuate ligament syndrome'),
    T('Identify postprandial vomiting and weight loss from duodenal compression between two arteries as superior mesenteric artery syndrome'),
    T('Diagnose bluish discoloration and swelling of the leg from chronic venous insufficiency as varicose vein disease'),
    T('Recognize a pulsatile abdominal mass in an older smoker as an abdominal aortic aneurysm'),
  ],
  'Behavioral Science': [
    T('Recognize a family communication pattern of conflicting verbal and nonverbal messages as double-bind theory'),
    T('Identify high levels of criticism and hostility in a patient’s family as increasing relapse risk via expressed emotion'),
    T('Diagnose a depressed patient with negative views of self, world, and future as Beck’s cognitive triad'),
    T('Recognize a gambler who keeps playing due to unpredictable reward timing as a variable ratio reinforcement schedule'),
    T('Identify a temporary increase in a behavior immediately after reinforcement is withdrawn as an extinction burst'),
    T('Diagnose a therapy technique involving prolonged exposure to a feared stimulus without gradual buildup as flooding'),
    T('Recognize a gradual, stepwise exposure therapy paired with relaxation as systematic desensitization'),
    T('Identify a behavior modification program using tokens as secondary reinforcers as a token economy'),
    T('Diagnose a patient using real-time physiological monitoring to gain voluntary control over an involuntary function as biofeedback'),
  ],
  Biochemistry: [
    T('Recognize a child with a pellagra-like rash and ataxia from a defect in neutral amino acid transport as Hartnup disease'),
    T('Identify a patient with recurrent kidney stones composed of hexagonal crystals as cystinuria'),
    T('Diagnose a patient with premature atherosclerosis and a broad beta band on lipoprotein electrophoresis as familial dysbetalipoproteinemia'),
    T('Recognize a child with fat malabsorption, ataxia, and acanthocytes on blood smear as abetalipoproteinemia'),
    T('Identify a patient with very low HDL and orange tonsils as Tangier disease'),
    T('Diagnose a newborn with microcephaly, cleft palate, and syndactyly from a cholesterol synthesis defect as Smith-Lemli-Opitz syndrome'),
    T('Recognize a patient with recurrent pancreatitis and markedly elevated triglycerides as a lipoprotein lipase deficiency'),
    T('Identify a patient with tendon xanthomas and cataracts from a defect in bile acid synthesis as cerebrotendinous xanthomatosis'),
    T('Diagnose a newborn with hypoglycemia and hepatomegaly from a defect in glucose-6-phosphatase as von Gierke disease'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize a crossover trial where the effect of the first treatment persists into the second period as a carryover effect'),
    T('Identify a report that emphasizes relative risk reduction over absolute risk reduction as using a framing effect to exaggerate benefit'),
    T('Diagnose a clinician calculating a patient’s post-test probability from the pretest probability and a likelihood ratio using a nomogram'),
    T('Recognize a meta-analysis combining clinically dissimilar studies as inappropriately pooling heterogeneous data'),
    T('Identify a study reporting only relative risk without baseline risk as potentially misleading about true benefit'),
    T('Diagnose a trial with a low pretest probability population as needing a highly specific test to confirm disease'),
  ],
  Embryology: [
    T('Recognize a newborn with two ureters draining one kidney as ureteral duplication'),
    T('Identify a newborn with a ureter draining outside the normal trigone location as an ectopic ureter'),
    T('Diagnose a newborn girl with a single perineal opening for the urinary, genital, and GI tracts as persistent cloaca'),
    T('Recognize a newborn with an unstable hip and a positive Ortolani maneuver as developmental dysplasia of the hip'),
    T('Identify an infant with in-toeing and internal tibial torsion as a common normal variant of lower limb development'),
  ],
  Genetics: [
    T('Recognize an infant with severe growth and developmental delay, thick eyebrows, and limb defects as Cornelia de Lange syndrome'),
    T('Identify a child with excessive growth, a large head, and learning disability as Sotos syndrome'),
    T('Diagnose a small-for-gestational-age infant with a triangular face and limb asymmetry as Russell-Silver syndrome'),
    T('Recognize a newborn with a small jaw, posterior displacement of the tongue, and cleft palate as Pierre Robin sequence'),
    T('Identify a child with underdeveloped facial bones, downslanting eyes, and hearing loss as Treacher Collins syndrome'),
    T('Diagnose an infant with craniosynostosis and fused fingers and toes as Apert syndrome'),
    T('Recognize an infant with craniosynostosis and shallow orbits without limb anomalies as Crouzon syndrome'),
    T('Identify an infant with patchy skin pigmentation, seizures, and mosaic tetrasomy 12p as Pallister-Killian syndrome'),
  ],
  Histology: [
    T('Identify Charcot-Leyden crystals in sputum as derived from eosinophil breakdown products'),
    T('Recognize Gamna-Gandy bodies on splenic histology as evidence of chronic congestion and old hemorrhage'),
    T('Diagnose Cowdry type A intranuclear inclusion bodies as characteristic of herpes simplex virus infection'),
  ],
  Immunology: [
    T('Recognize recurrent oral and genital ulcers with uveitis as Behçet disease'),
    T('Identify a patient with palpable purpura, arthralgia, and abdominal pain following a viral illness as IgA vasculitis (Henoch-Schönlein purpura)'),
    T('Diagnose a patient with fever, rash, and joint pain one to two weeks after receiving antivenom as serum sickness'),
    T('Recognize a patient with recurrent inflammation and collapse of the ear and nasal cartilage as relapsing polychondritis'),
    T('Identify a child with fever for five days, conjunctivitis, rash, and a strawberry tongue as Kawasaki disease'),
  ],
  Microbiology: [
    T('Recognize hyponatremia, GI symptoms, and pneumonia after a hotel or cruise ship stay as Legionella pneumonia'),
    T('Identify a child with acute-onset chest pain and heart failure after a viral prodrome as coxsackievirus myocarditis'),
    T('Diagnose a child with fever, headache, and neck stiffness with a benign viral course as enteroviral aseptic meningitis'),
    T('Recognize rapidly progressive fatal meningoencephalitis after swimming in warm freshwater as Naegleria fowleri infection'),
    T('Identify severe encephalitis following a mosquito bite in a rural area with high mortality as Eastern equine encephalitis'),
    T('Diagnose an elderly man with malabsorption, arthralgias, and PAS-positive macrophages on biopsy as Whipple disease caused by Tropheryma whipplei'),
  ],
  Pathology: [
    T('Recognize a snowstorm pattern on pelvic ultrasound with markedly elevated hCG as a hydatidiform mole'),
    T('Identify vaginal bleeding with a rapidly enlarging uterus and metastatic lung nodules after a molar pregnancy as choriocarcinoma'),
    T('Diagnose sudden severe abdominal pain with vaginal bleeding and a rigid uterus in the third trimester as placental abruption'),
    T('Recognize painless vaginal bleeding in the third trimester with a low-lying placenta as placenta previa'),
    T('Identify fetal heart rate abnormalities with vaginal bleeding after rupture of membranes as vasa previa'),
    T('Diagnose sudden severe abdominal pain and fetal distress during labor in a patient with a prior cesarean section as uterine rupture'),
  ],
  Pharmacology: [
    T('Recognize serotonin syndrome in a patient started on linezolid while taking an SSRI'),
    T('Identify reduced oral contraceptive efficacy in a patient taking St. John’s wort as CYP3A4 induction'),
    T('Diagnose an elevated INR in a patient on warfarin after starting a course of antibiotics'),
    T('Recognize nausea, vomiting, and arrhythmia in a patient on theophylline as theophylline toxicity'),
    T('Identify elevated lithium levels and toxicity symptoms in a patient who started an NSAID as a lithium-NSAID interaction'),
    T('Diagnose rising digoxin levels and toxicity symptoms in a patient who started quinidine as a digoxin-quinidine interaction'),
  ],
  Physiology: [
    T('Recognize severe hyperglycemia and dehydration without significant ketosis as hyperosmolar hyperglycemic state'),
    T('Identify hypophosphatemia and cardiac arrhythmia after reintroducing nutrition to a malnourished patient as refeeding syndrome'),
    T('Diagnose hyperkalemia, hyperphosphatemia, and hyperuricemia after starting chemotherapy for a large tumor burden as tumor lysis syndrome'),
    T('Recognize confusion, hyperthermia, and anhidrosis in a patient after prolonged heat exposure as heat stroke'),
    T('Identify hyponatremia in an endurance athlete after excessive water intake during a race as exercise-associated hyponatremia'),
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
