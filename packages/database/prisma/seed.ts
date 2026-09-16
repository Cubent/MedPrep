/**
 * SAMPLE / DEVELOPMENT DATA ONLY.
 *
 * Seeds the 12 real USMLE Step 1 discipline categories (Anatomy, Behavioral
 * Science, Biochemistry, ... Physiology) as `System` records, each with one
 * learning objective and one illustrative question, so /dashboard/topics has
 * a real, complete topic list to select from. Deliberately thin for now —
 * one question per topic just to make each topic exist and be selectable;
 * content gets expanded topic by topic from here.
 *
 * NOT reviewed clinical content. Must be replaced with physician-reviewed
 * questions before any real user studies from it.
 */
import { database } from '../index';
import { ExamType } from '../generated/client';

type SeedChoice = { text: string; isCorrect: boolean; explanation?: string };

type SeedQuestion = {
  stem: string;
  explanation: string;
  difficulty: number;
  choices: SeedChoice[];
};

type SeedObjective = {
  title: string;
  summary: string;
  discipline: string;
  yieldWeight: number;
  variations: SeedQuestion[];
};

type SeedSystem = {
  name: string;
  objectives: SeedObjective[];
};

const EXAM = ExamType.STEP_1;

const SYSTEMS: SeedSystem[] = [
  {
    name: 'Anatomy',
    objectives: [
      {
        title: 'Localize an upper trunk brachial plexus injury (Erb palsy)',
        summary:
          'Traction injury to the C5-C6 roots (upper trunk) of the brachial plexus paralyzes the muscles they supply — deltoid, biceps, and supinator — producing the classic "waiter’s tip" posture: the arm hangs adducted and internally rotated with the forearm pronated and wrist flexed.',
        discipline: 'Musculoskeletal',
        yieldWeight: 60,
        variations: [
          {
            stem: 'A newborn delivered after a difficult vaginal delivery complicated by shoulder dystocia has an arm that hangs limply at his side, adducted and internally rotated, with the elbow extended, forearm pronated, and wrist flexed ("waiter’s tip" posture). Which structure was most likely injured?',
            explanation:
              'This "waiter’s tip" presentation is the hallmark of Erb (Duchenne-Erb) palsy, caused by traction injury to the upper trunk of the brachial plexus (C5-C6 roots) during a difficult delivery. Loss of C5-C6 function paralyzes the deltoid (abduction), biceps and brachialis (flexion/supination), and infraspinatus (external rotation), producing the described posture.',
            difficulty: 2,
            choices: [
              { text: 'Upper trunk of the brachial plexus (C5-C6)', isCorrect: true },
              {
                text: 'Lower trunk of the brachial plexus (C8-T1)',
                isCorrect: false,
                explanation: 'Lower trunk (Klumpke) injury causes a claw hand from intrinsic hand muscle paralysis, not this proximal posture.',
              },
              {
                text: 'Radial nerve at the spiral groove',
                isCorrect: false,
                explanation: 'Isolated radial nerve injury causes wrist drop, not the full "waiter’s tip" posture.',
              },
              {
                text: 'Axillary nerve',
                isCorrect: false,
                explanation: 'Axillary nerve injury causes deltoid weakness alone (impaired abduction), not the combined pattern seen here.',
              },
              {
                text: 'Long thoracic nerve',
                isCorrect: false,
                explanation: 'Long thoracic nerve injury causes winging of the scapula, not this limb posture.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Behavioral Science',
    objectives: [
      {
        title: 'Distinguish positive reinforcement from other operant conditioning principles',
        summary:
          'In operant conditioning, positive reinforcement adds a desirable stimulus after a behavior to increase the frequency of that behavior — distinct from negative reinforcement (removing an aversive stimulus) and punishment (decreasing behavior).',
        discipline: 'Psychiatry & behavioral health',
        yieldWeight: 55,
        variations: [
          {
            stem: 'A hospital implements a program in which nurses receive a small bonus each time they complete hand-hygiene checklists correctly. Over several months, correct checklist completion increases. Which behavioral principle best explains this change?',
            explanation:
              'Positive reinforcement occurs when a desirable stimulus (the bonus) is added following a behavior, increasing the likelihood that the behavior will recur. Here, checklist completion increases because it is being rewarded.',
            difficulty: 1,
            choices: [
              { text: 'Positive reinforcement', isCorrect: true },
              {
                text: 'Negative reinforcement',
                isCorrect: false,
                explanation: 'Negative reinforcement increases a behavior by removing an aversive stimulus, not by adding a reward.',
              },
              {
                text: 'Positive punishment',
                isCorrect: false,
                explanation: 'Punishment is meant to decrease a behavior, not increase it.',
              },
              {
                text: 'Extinction',
                isCorrect: false,
                explanation: 'Extinction is the gradual disappearance of a behavior when reinforcement is withheld — the opposite of what is happening here.',
              },
              {
                text: 'Classical conditioning',
                isCorrect: false,
                explanation: 'Classical conditioning pairs a neutral stimulus with an unconditioned stimulus to produce a reflexive response; this scenario involves a voluntary behavior being reinforced, which is operant, not classical, conditioning.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Biochemistry',
    objectives: [
      {
        title: 'Recognize phenylketonuria as a defect in phenylalanine hydroxylase',
        summary:
          'Phenylketonuria (PKU) results from a deficiency of phenylalanine hydroxylase (or its cofactor, tetrahydrobiopterin), which normally converts phenylalanine to tyrosine. The resulting phenylalanine buildup causes intellectual disability, a musty odor, and hypopigmentation if untreated, and is managed with dietary phenylalanine restriction.',
        discipline: 'Metabolism',
        yieldWeight: 65,
        variations: [
          {
            stem: 'A newborn has a normal-appearing physical exam, but a routine heel-stick screening reveals markedly elevated blood phenylalanine. Without treatment, this infant is at risk for intellectual disability, a musty body odor, and fair skin/hair due to hypopigmentation. Deficiency of which enzyme is the most likely cause?',
            explanation:
              'Phenylketonuria is caused by deficient phenylalanine hydroxylase activity, which blocks the conversion of phenylalanine to tyrosine. Phenylalanine and its metabolites accumulate, and reduced tyrosine (a melanin precursor) causes the hypopigmentation. Early detection via newborn screening and dietary phenylalanine restriction prevents the intellectual disability.',
            difficulty: 2,
            choices: [
              { text: 'Phenylalanine hydroxylase', isCorrect: true },
              {
                text: 'Homogentisate oxidase',
                isCorrect: false,
                explanation: 'Deficiency of this enzyme causes alkaptonuria (dark urine, ochronosis), not PKU.',
              },
              {
                text: 'Tyrosinase',
                isCorrect: false,
                explanation: 'Tyrosinase deficiency causes albinism directly, without the elevated phenylalanine or intellectual disability seen in PKU.',
              },
              {
                text: 'Branched-chain α-ketoacid dehydrogenase',
                isCorrect: false,
                explanation: 'This enzyme defect causes maple syrup urine disease, marked by sweet-smelling urine, not a musty odor.',
              },
              {
                text: 'Galactose-1-phosphate uridyltransferase',
                isCorrect: false,
                explanation: 'Deficiency of this enzyme causes classic galactosemia, presenting with jaundice and hepatomegaly after milk ingestion, not elevated phenylalanine.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Biostatistics, epidemiology & evidence-based medicine',
    objectives: [
      {
        title: 'Calculate positive predictive value from a 2x2 diagnostic table',
        summary:
          'Positive predictive value (PPV) is the proportion of patients with a positive test who actually have the disease: true positives / (true positives + false positives). Unlike sensitivity and specificity, PPV depends on disease prevalence in the population tested.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 70,
        variations: [
          {
            stem: `A new screening test is evaluated in 1,000 patients, with the following results:

| | Disease present | Disease absent |
| --- | --- | --- |
| Test positive | 180 | 20 |
| Test negative | 20 | 780 |

What is the positive predictive value of this test?`,
            explanation:
              'Positive predictive value = true positives / (true positives + false positives) = 180 / (180 + 20) = 180/200 = 90%. This tells us that among patients who test positive, 90% actually have the disease — a value that would change if the test were applied to a population with a different disease prevalence.',
            difficulty: 3,
            choices: [
              { text: '90%', isCorrect: true },
              {
                text: '97.5%',
                isCorrect: false,
                explanation: 'This is the negative predictive value (780 / (780+20)), not the positive predictive value.',
              },
              {
                text: '90.7%',
                isCorrect: false,
                explanation: 'This is close to sensitivity (180/200 patients with disease correctly identified) but is not the PPV calculation, which uses the test-positive row.',
              },
              {
                text: '39%',
                isCorrect: false,
                explanation: 'This does not correspond to any standard measure from this table.',
              },
              {
                text: '20%',
                isCorrect: false,
                explanation: 'This is the false positive rate among test-positive results (20/200), not the PPV.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Embryology',
    objectives: [
      {
        title: 'Link maternal folate deficiency to neural tube defects',
        summary:
          'The neural tube forms by folding and fusion of the neural plate during the third and fourth weeks of gestation, a process highly dependent on adequate folate. Folate deficiency impairs neural tube closure, causing defects such as spina bifida (caudal) or anencephaly (cranial); periconceptional folate supplementation reduces this risk.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 55,
        variations: [
          {
            stem: 'A woman who did not take prenatal vitamins delivers an infant with a visible defect in the lower spine, with meninges and neural tissue protruding through the vertebral arch. Deficiency of which maternal nutrient is most strongly associated with this defect?',
            explanation:
              'This presentation describes a neural tube defect (myelomeningocele/spina bifida), which results from failure of the caudal neuropore to close during the third to fourth week of embryogenesis. Maternal folate deficiency is the best-established modifiable risk factor, and periconceptional folic acid supplementation substantially reduces the incidence of neural tube defects.',
            difficulty: 2,
            choices: [
              { text: 'Folate (vitamin B9)', isCorrect: true },
              {
                text: 'Vitamin A',
                isCorrect: false,
                explanation: 'Excess (not deficiency) of vitamin A is teratogenic, associated with craniofacial and cardiac defects, not neural tube defects.',
              },
              {
                text: 'Vitamin D',
                isCorrect: false,
                explanation: 'Vitamin D deficiency is associated with rickets and hypocalcemia, not neural tube defects.',
              },
              {
                text: 'Iron',
                isCorrect: false,
                explanation: 'Iron deficiency causes maternal anemia but is not linked to neural tube defects.',
              },
              {
                text: 'Vitamin B12',
                isCorrect: false,
                explanation: 'B12 deficiency causes megaloblastic anemia and neuropathy; folate is the nutrient specifically linked to neural tube closure.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Genetics',
    objectives: [
      {
        title: 'Calculate carrier and affected-child probabilities for autosomal recessive inheritance',
        summary:
          'In autosomal recessive inheritance, two unaffected carrier parents (Aa x Aa) have, per pregnancy, a 25% chance of an affected child (aa), 50% chance of a carrier child (Aa), and 25% chance of a completely unaffected, non-carrier child (AA) — the classic 1:2:1 ratio.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 60,
        variations: [
          {
            stem: 'Two unaffected parents, both known carriers of the cystic fibrosis allele (autosomal recessive), are planning another pregnancy. What is the probability that their next child will be affected with cystic fibrosis?',
            explanation:
              'Cystic fibrosis is autosomal recessive. When both parents are heterozygous carriers (Aa x Aa), a Punnett square gives offspring genotypes in a 1 AA : 2 Aa : 1 aa ratio. Only the aa genotype is affected, giving a 25% (1 in 4) probability per pregnancy, independent of the outcome of any previous pregnancy.',
            difficulty: 2,
            choices: [
              { text: '25%', isCorrect: true },
              {
                text: '50%',
                isCorrect: false,
                explanation: 'This is the probability of the child being an unaffected carrier (Aa), not affected (aa).',
              },
              {
                text: '75%',
                isCorrect: false,
                explanation: 'This is the probability the child is unaffected (either AA or Aa), not the probability of being affected.',
              },
              {
                text: '100%',
                isCorrect: false,
                explanation: 'Both parents are carriers, not affected, so not every child will be affected.',
              },
              {
                text: '0%',
                isCorrect: false,
                explanation: 'Since both parents carry the recessive allele, there is a real, non-zero chance of an affected child.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Histology',
    objectives: [
      {
        title: 'Identify pseudostratified ciliated columnar epithelium as respiratory tract lining',
        summary:
          'Pseudostratified ciliated columnar epithelium, often with interspersed mucus-secreting goblet cells, lines most of the respiratory tract (trachea and bronchi). Cilia beat mucus and trapped particles upward toward the pharynx (the "mucociliary escalator"), a defense mechanism impaired in conditions like smoking-induced squamous metaplasia.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 45,
        variations: [
          {
            stem: 'A biopsy of the trachea shows a single layer of cells of varying heights, all resting on the basement membrane, with nuclei at different levels giving a falsely stratified appearance. Motile cilia and scattered mucus-secreting goblet cells are visible along the luminal surface. What type of epithelium is this?',
            explanation:
              'This describes pseudostratified ciliated columnar epithelium: although it appears multilayered due to nuclei at different heights, every cell actually touches the basement membrane (hence "pseudo"-stratified). This epithelium, with its cilia and goblet cells, characteristically lines the trachea and bronchi, forming the mucociliary escalator that clears inhaled particles.',
            difficulty: 2,
            choices: [
              { text: 'Pseudostratified ciliated columnar epithelium', isCorrect: true },
              {
                text: 'Simple columnar epithelium',
                isCorrect: false,
                explanation: 'Simple columnar epithelium is a single true layer without the varying nuclear heights described, and is typical of the GI tract, not the trachea.',
              },
              {
                text: 'Stratified squamous epithelium',
                isCorrect: false,
                explanation: 'Stratified squamous epithelium has multiple true layers of flattened surface cells and lines structures like the esophagus and skin, not the trachea.',
              },
              {
                text: 'Transitional epithelium',
                isCorrect: false,
                explanation: 'Transitional epithelium lines the urinary tract and stretches to accommodate volume changes; it lacks cilia and is not found in the trachea.',
              },
              {
                text: 'Simple squamous epithelium',
                isCorrect: false,
                explanation: 'Simple squamous epithelium is a single layer of flat cells, as seen in alveoli or blood vessel linings, not the ciliated trachea.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Immunology',
    objectives: [
      {
        title: 'Recognize IgE-mediated (type I) hypersensitivity as the mechanism of anaphylaxis',
        summary:
          'Type I hypersensitivity reactions are mediated by antigen cross-linking IgE bound to mast cells and basophils, triggering degranulation and release of histamine and other mediators within minutes. This mechanism underlies immediate reactions such as anaphylaxis, allergic rhinitis, and hives.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 60,
        variations: [
          {
            stem: 'Minutes after eating shrimp, a patient develops diffuse hives, lip swelling, wheezing, and hypotension. Which immunologic mechanism is responsible for this reaction?',
            explanation:
              'This is anaphylaxis, the prototypical type I hypersensitivity reaction. On prior exposure, shrimp allergens induced IgE production, which bound to Fc receptors on mast cells and basophils. Re-exposure cross-links this cell-bound IgE, triggering rapid degranulation and release of histamine and other mediators, producing the hives, angioedema, bronchospasm, and hypotension seen within minutes.',
            difficulty: 2,
            choices: [
              { text: 'IgE-mediated mast cell degranulation (type I hypersensitivity)', isCorrect: true },
              {
                text: 'IgG/IgM-mediated complement activation against cell-surface antigens (type II)',
                isCorrect: false,
                explanation: 'Type II hypersensitivity targets specific cells (e.g., in hemolytic anemia) and does not produce this rapid, systemic allergic picture.',
              },
              {
                text: 'Immune complex deposition (type III)',
                isCorrect: false,
                explanation: 'Type III reactions (e.g., serum sickness) develop over days as immune complexes deposit in tissues, not within minutes of exposure.',
              },
              {
                text: 'T cell–mediated delayed hypersensitivity (type IV)',
                isCorrect: false,
                explanation: 'Type IV reactions (e.g., contact dermatitis, TB skin test) take 48–72 hours to develop, far too slow to explain a reaction within minutes.',
              },
              {
                text: 'Direct histamine release without antibody involvement',
                isCorrect: false,
                explanation: 'While some reactions are non-immune ("anaphylactoid"), a reaction following true prior sensitization to a specific food allergen is classically IgE-mediated.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Microbiology',
    objectives: [
      {
        title: 'Recognize Klebsiella pneumoniae from currant jelly sputum in an at-risk host',
        summary:
          'Klebsiella pneumoniae classically causes lobar pneumonia in alcoholics, diabetics, and other debilitated hosts, producing thick, blood-tinged "currant jelly" sputum due to the organism’s extensive polysaccharide capsule and tissue necrosis. It is a gram-negative, lactose-fermenting rod.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 55,
        variations: [
          {
            stem: 'A 58-year-old man with a long history of alcohol use disorder presents with fever, cough, and thick, blood-tinged sputum described as resembling "currant jelly." Chest X-ray shows a dense consolidation in the right upper lobe with a bulging fissure. Which organism is the most likely cause?',
            explanation:
              'Currant jelly sputum in an alcoholic patient is a classic association with Klebsiella pneumoniae, which causes necrotizing lobar pneumonia, often with a bulging fissure sign on imaging due to the volume of inflammatory exudate produced by its thick antiphagocytic capsule.',
            difficulty: 2,
            choices: [
              { text: 'Klebsiella pneumoniae', isCorrect: true },
              {
                text: 'Streptococcus pneumoniae',
                isCorrect: false,
                explanation: 'S. pneumoniae is the most common cause of community-acquired pneumonia overall but is not classically associated with currant jelly sputum or the bulging fissure sign.',
              },
              {
                text: 'Mycoplasma pneumoniae',
                isCorrect: false,
                explanation: 'Mycoplasma causes atypical "walking" pneumonia with a dry cough and diffuse interstitial infiltrates, not thick bloody sputum.',
              },
              {
                text: 'Pneumocystis jirovecii',
                isCorrect: false,
                explanation: 'Pneumocystis pneumonia occurs in immunocompromised (especially HIV/AIDS) patients with diffuse ground-glass opacities and a typically dry cough, not currant jelly sputum.',
              },
              {
                text: 'Legionella pneumophila',
                isCorrect: false,
                explanation: 'Legionella is associated with water sources/air conditioning exposure and GI symptoms/hyponatremia, not currant jelly sputum.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Pathology',
    objectives: [
      {
        title: 'Recognize Barrett esophagus as intestinal metaplasia from chronic acid reflux',
        summary:
          'Barrett esophagus is the replacement of the normal stratified squamous epithelium of the distal esophagus with metaplastic columnar epithelium containing goblet cells (intestinal metaplasia), occurring in response to chronic GERD. It is a premalignant lesion that increases the risk of esophageal adenocarcinoma.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 65,
        variations: [
          {
            stem: 'A 55-year-old man with a 15-year history of chronic heartburn undergoes endoscopy, which shows salmon-colored mucosa extending upward from the gastroesophageal junction. Biopsy reveals columnar epithelium with goblet cells replacing the normal esophageal lining. What is this histologic change called, and what is its clinical significance?',
            explanation:
              'This is Barrett esophagus: metaplasia of the normal stratified squamous epithelium of the esophagus into columnar epithelium with goblet cells (intestinal-type metaplasia), triggered by chronic acid exposure from GERD. Metaplasia is a reversible adaptive change, but Barrett esophagus specifically carries an increased risk of progression to dysplasia and esophageal adenocarcinoma, warranting surveillance endoscopy.',
            difficulty: 2,
            choices: [
              { text: 'Barrett esophagus (intestinal metaplasia); increases risk of esophageal adenocarcinoma', isCorrect: true },
              {
                text: 'Squamous cell carcinoma; a primary malignant change, not metaplasia',
                isCorrect: false,
                explanation: 'This describes a benign metaplastic change on biopsy, not an invasive carcinoma.',
              },
              {
                text: 'Dysplasia; an irreversible precancerous change with no further malignant potential',
                isCorrect: false,
                explanation: 'The biopsy describes a metaplastic tissue type change (columnar with goblet cells), not dysplastic (disordered, atypical) cells, and metaplasia itself does still carry further malignant potential.',
              },
              {
                text: 'Hyperplasia; an increase in the number of normal squamous cells',
                isCorrect: false,
                explanation: 'Hyperplasia is an increase in cell number of the same cell type, not a change to a different (columnar) cell type as seen here.',
              },
              {
                text: 'Atrophy; a decrease in cell size and organ mass',
                isCorrect: false,
                explanation: 'Atrophy describes shrinkage of tissue, not replacement of one epithelial type by another.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Pharmacology',
    objectives: [
      {
        title: 'Explain ACE inhibitor–induced cough via bradykinin accumulation',
        summary:
          'ACE inhibitors block angiotensin-converting enzyme, which normally degrades bradykinin in addition to converting angiotensin I to angiotensin II. The resulting accumulation of bradykinin in the lungs is thought to cause the dry, persistent cough that is a common side effect, distinct from their intended blood-pressure-lowering mechanism.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 70,
        variations: [
          {
            stem: 'A patient started on lisinopril for hypertension returns 3 weeks later with a persistent dry cough and no other new symptoms. Which mechanism best explains this adverse effect?',
            explanation:
              'ACE inhibitors like lisinopril block angiotensin-converting enzyme, which has a second, less well-known job: degrading bradykinin. When ACE is inhibited, bradykinin accumulates, particularly in the lungs, and this accumulation is believed to trigger the characteristic dry cough seen in up to 10-20% of patients on ACE inhibitors — a class effect not seen with angiotensin receptor blockers (ARBs), which do not affect bradykinin metabolism.',
            difficulty: 2,
            choices: [
              { text: 'Accumulation of bradykinin due to inhibited degradation', isCorrect: true },
              {
                text: 'Direct bronchospasm from beta-2 receptor blockade',
                isCorrect: false,
                explanation: 'ACE inhibitors do not act on beta-adrenergic receptors; this mechanism describes nonselective beta-blockers, not ACE inhibitors.',
              },
              {
                text: 'Hypersensitivity pneumonitis from an IgE-mediated reaction',
                isCorrect: false,
                explanation: 'ACE inhibitor cough is a predictable, dose-independent class effect related to bradykinin, not an IgE-mediated allergic reaction.',
              },
              {
                text: 'Excess angiotensin II causing airway inflammation',
                isCorrect: false,
                explanation: 'ACE inhibitors decrease, not increase, angiotensin II production — this is the opposite of the actual mechanism.',
              },
              {
                text: 'Direct irritation of the pharynx from the medication itself',
                isCorrect: false,
                explanation: 'The cough is a systemic pharmacologic effect from bradykinin accumulation in lung tissue, not local irritation from swallowing the pill.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Physiology',
    objectives: [
      {
        title: 'Apply the Frank-Starling mechanism to explain stroke volume changes with venous return',
        summary:
          'The Frank-Starling mechanism states that increased venous return stretches cardiac myocytes, increasing preload (end-diastolic volume) and, within physiologic limits, increasing the force of contraction and stroke volume — the heart pumps out what it receives, matching output to venous return.',
        discipline: 'Applying Foundational Concepts',
        yieldWeight: 65,
        variations: [
          {
            stem: 'A healthy volunteer receives a rapid infusion of intravenous fluid, increasing venous return to the heart. Assuming no change in heart rate, contractility, or afterload, what is the expected effect on stroke volume, and by what mechanism?',
            explanation:
              'By the Frank-Starling mechanism, increased venous return increases ventricular end-diastolic volume (preload), stretching cardiac sarcomeres closer to their optimal length for cross-bridge formation. This increases the force of the subsequent contraction, so stroke volume increases to match the increased venous return — the intrinsic mechanism by which the heart auto-regulates output without needing changes in heart rate or contractility.',
            difficulty: 2,
            choices: [
              { text: 'Stroke volume increases, via increased preload stretching myocardial fibers (Frank-Starling mechanism)', isCorrect: true },
              {
                text: 'Stroke volume decreases, via reflex bradycardia',
                isCorrect: false,
                explanation: 'The question specifies no change in heart rate, and increased preload increases (not decreases) stroke volume via Frank-Starling.',
              },
              {
                text: 'Stroke volume is unchanged, since only contractility affects stroke volume',
                isCorrect: false,
                explanation: 'Preload is an independent determinant of stroke volume via the Frank-Starling mechanism, separate from contractility.',
              },
              {
                text: 'Stroke volume increases, due to increased afterload',
                isCorrect: false,
                explanation: 'The question specifies afterload is unchanged; the correct mechanism here is increased preload, not afterload.',
              },
              {
                text: 'Stroke volume decreases, because increased venous return raises afterload',
                isCorrect: false,
                explanation: 'Venous return affects preload (filling), not afterload (resistance the heart pumps against) — these are distinct physiologic concepts.',
              },
            ],
          },
        ],
      },
    ],
  },
];

async function main() {
  // Idempotent: clear previously-seeded content for this exam (but never
  // touches user progress/attempts/sessions, which reference questions by
  // id and cascade-delete along with them intentionally on reseed).
  await database.system.deleteMany({ where: { examType: EXAM } });

  for (const [systemIndex, systemData] of SYSTEMS.entries()) {
    const system = await database.system.create({
      data: { examType: EXAM, name: systemData.name, sortOrder: systemIndex },
    });

    for (const objectiveData of systemData.objectives) {
      const objective = await database.learningObjective.create({
        data: {
          systemId: system.id,
          examType: EXAM,
          discipline: objectiveData.discipline,
          title: objectiveData.title,
          summary: objectiveData.summary,
          yieldWeight: objectiveData.yieldWeight,
        },
      });

      const variationGroupId = objective.id;

      for (const q of objectiveData.variations) {
        await database.question.create({
          data: {
            learningObjectiveId: objective.id,
            variationGroupId,
            stem: q.stem,
            explanation: q.explanation,
            difficulty: q.difficulty,
            choices: {
              create: q.choices.map((c, i) => ({
                text: c.text,
                isCorrect: c.isCorrect,
                explanation: c.explanation,
                sortOrder: i,
              })),
            },
          },
        });
      }
    }
  }

  console.log('Seeded sample qbank content for', EXAM);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
