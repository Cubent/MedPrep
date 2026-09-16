/**
 * SAMPLE / DEVELOPMENT DATA ONLY.
 *
 * This seeds a small, illustrative question set (well-established, textbook-
 * level facts) so the practice loop and selection algorithm can be built and
 * tested end to end. It is NOT reviewed clinical content and must be
 * replaced with physician-reviewed questions before any real user studies
 * from it.
 */
import { database } from '../index';
import { ExamType } from '../generated/client';

type SeedQuestion = {
  stem: string;
  explanation: string;
  difficulty: number;
  choices: { text: string; isCorrect: boolean }[];
};

type SeedObjective = {
  title: string;
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
    name: 'Cardiovascular',
    objectives: [
      {
        title: 'Recognize acute STEMI presentation and immediate management',
        discipline: 'Pathology',
        yieldWeight: 90,
        variations: [
          {
            stem: 'A 58-year-old man presents with crushing substernal chest pain radiating to the left arm, diaphoresis, and nausea for the past hour. ECG shows ST-segment elevation in leads II, III, and aVF. What is the most appropriate immediate next step?',
            explanation:
              'ST elevation in the inferior leads (II, III, aVF) indicates an inferior STEMI. The most appropriate immediate step is emergent reperfusion via primary PCI, alongside aspirin, and (unless contraindicated) a P2Y12 inhibitor.',
            difficulty: 2,
            choices: [
              { text: 'Emergent cardiac catheterization for primary PCI', isCorrect: true },
              { text: 'Outpatient stress test in one week', isCorrect: false },
              { text: 'Reassurance and discharge with NSAIDs', isCorrect: false },
              { text: 'CT angiography of the chest', isCorrect: false },
            ],
          },
          {
            stem: 'Which ECG finding is most specific for acute transmural myocardial infarction, as opposed to unstable angina?',
            explanation:
              'ST-segment elevation reflects transmural (full-thickness) myocardial injury and defines STEMI, distinguishing it from unstable angina/NSTEMI, which typically show ST depression or T-wave inversion without ST elevation.',
            difficulty: 2,
            choices: [
              { text: 'ST-segment elevation', isCorrect: true },
              { text: 'T-wave inversion only', isCorrect: false },
              { text: 'Prolonged PR interval', isCorrect: false },
              { text: 'Peaked T waves', isCorrect: false },
            ],
          },
        ],
      },
      {
        title: "Identify Virchow's triad as risk factors for venous thromboembolism",
        discipline: 'Physiology',
        yieldWeight: 75,
        variations: [
          {
            stem: 'A 45-year-old woman who underwent hip replacement surgery 5 days ago develops unilateral leg swelling and calf tenderness. Which of the following best describes the three components of Virchow’s triad predisposing her to this condition?',
            explanation:
              "Virchow's triad describes the three broad categories that predispose to venous thrombosis: venous stasis (immobilization after surgery), endothelial injury (from the surgical procedure itself), and hypercoagulability (postoperative state).",
            difficulty: 2,
            choices: [
              { text: 'Venous stasis, endothelial injury, hypercoagulability', isCorrect: true },
              { text: 'Hypertension, hyperlipidemia, smoking', isCorrect: false },
              { text: 'Arterial spasm, atherosclerosis, embolism', isCorrect: false },
              { text: 'Infection, inflammation, fibrosis', isCorrect: false },
            ],
          },
          {
            stem: 'Long-haul air travel is a risk factor for deep vein thrombosis primarily through which mechanism?',
            explanation:
              'Prolonged immobility during long flights causes venous stasis (blood pooling in the lower extremities), one of the three components of Virchow’s triad, increasing thrombosis risk.',
            difficulty: 1,
            choices: [
              { text: 'Venous stasis from prolonged immobility', isCorrect: true },
              { text: 'Direct endothelial trauma from cabin pressure', isCorrect: false },
              { text: 'Acute hypercoagulability from dehydration alone', isCorrect: false },
              { text: 'Arterial vasospasm', isCorrect: false },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Pulmonary',
    objectives: [
      {
        title: 'Select the appropriate initial imaging for suspected pulmonary embolism',
        discipline: 'Pathology',
        yieldWeight: 80,
        variations: [
          {
            stem: 'A 34-year-old woman on oral contraceptives presents with sudden-onset pleuritic chest pain, dyspnea, and tachycardia. Chest X-ray is normal. What is the most appropriate next diagnostic test?',
            explanation:
              'CT pulmonary angiography (CTPA) is the standard initial imaging test for suspected PE in patients with a normal chest X-ray and adequate renal function, offering high sensitivity and specificity.',
            difficulty: 2,
            choices: [
              { text: 'CT pulmonary angiography', isCorrect: true },
              { text: 'Echocardiography', isCorrect: false },
              { text: 'Pulmonary function tests', isCorrect: false },
              { text: 'D-dimer only, with no further imaging', isCorrect: false },
            ],
          },
          {
            stem: 'In a pregnant patient with suspected pulmonary embolism where CT pulmonary angiography is relatively contraindicated due to contrast/radiation concerns, which alternative imaging study is preferred?',
            explanation:
              'A ventilation-perfusion (V/Q) scan is often preferred in pregnancy because it delivers less radiation to breast tissue than CTPA, while still being diagnostically useful when the chest X-ray is normal.',
            difficulty: 3,
            choices: [
              { text: 'Ventilation-perfusion (V/Q) scan', isCorrect: true },
              { text: 'Plain chest radiograph alone', isCorrect: false },
              { text: 'Cardiac MRI', isCorrect: false },
              { text: 'Pulmonary angiography via right heart catheterization', isCorrect: false },
            ],
          },
        ],
      },
      {
        title: 'Differentiate obstructive (COPD/asthma) from restrictive lung disease on spirometry',
        discipline: 'Physiology',
        yieldWeight: 70,
        variations: [
          {
            stem: 'A patient’s spirometry shows a reduced FEV1/FVC ratio with a normal or increased total lung capacity. This pattern is most consistent with which type of lung disease?',
            explanation:
              'A reduced FEV1/FVC ratio defines an obstructive pattern (e.g., COPD, asthma), where airflow is limited but lung volumes are preserved or increased due to air trapping.',
            difficulty: 2,
            choices: [
              { text: 'Obstructive lung disease', isCorrect: true },
              { text: 'Restrictive lung disease', isCorrect: false },
              { text: 'Normal lung function', isCorrect: false },
              { text: 'Pulmonary vascular disease', isCorrect: false },
            ],
          },
          {
            stem: 'Which spirometry finding would you expect in a patient with idiopathic pulmonary fibrosis, a classic restrictive lung disease?',
            explanation:
              'Restrictive lung disease is characterized by a proportional reduction in both FEV1 and FVC, so the FEV1/FVC ratio remains normal or even increased, with reduced total lung capacity.',
            difficulty: 3,
            choices: [
              { text: 'Normal or increased FEV1/FVC ratio with reduced total lung capacity', isCorrect: true },
              { text: 'Reduced FEV1/FVC ratio with increased total lung capacity', isCorrect: false },
              { text: 'Increased residual volume with normal FVC', isCorrect: false },
              { text: 'Isolated reduction in diffusion capacity with normal volumes', isCorrect: false },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Renal',
    objectives: [
      {
        title: 'Use BUN/creatinine ratio and FENa to classify acute kidney injury',
        discipline: 'Physiology',
        yieldWeight: 85,
        variations: [
          {
            stem: 'A patient with vomiting and poor oral intake has a BUN/creatinine ratio of 25:1 and a fractional excretion of sodium (FENa) of 0.8%. Which category of acute kidney injury does this represent?',
            explanation:
              'A BUN/Cr ratio greater than 20:1 with FENa under 1% suggests prerenal azotemia: the kidneys are appropriately conserving sodium and water in response to decreased renal perfusion.',
            difficulty: 2,
            choices: [
              { text: 'Prerenal azotemia', isCorrect: true },
              { text: 'Intrinsic renal injury (acute tubular necrosis)', isCorrect: false },
              { text: 'Postrenal obstruction', isCorrect: false },
              { text: 'Chronic kidney disease', isCorrect: false },
            ],
          },
          {
            stem: 'A patient recovering from a recent episode of hypotension now has a FENa of 2.5% and muddy brown casts on urinalysis. What is the most likely diagnosis?',
            explanation:
              'FENa greater than 2% with muddy brown granular casts is classic for acute tubular necrosis (intrinsic AKI), often following an ischemic insult such as prolonged hypotension.',
            difficulty: 3,
            choices: [
              { text: 'Acute tubular necrosis', isCorrect: true },
              { text: 'Prerenal azotemia', isCorrect: false },
              { text: 'Postrenal obstruction', isCorrect: false },
              { text: 'Minimal change disease', isCorrect: false },
            ],
          },
        ],
      },
      {
        title: 'Distinguish nephrotic from nephritic syndrome',
        discipline: 'Pathology',
        yieldWeight: 75,
        variations: [
          {
            stem: 'A child presents with periorbital edema, frothy urine, and 4+ proteinuria (>3.5 g/day) without significant hematuria. This presentation is most consistent with which syndrome?',
            explanation:
              'Nephrotic syndrome is defined by heavy proteinuria (>3.5 g/day), hypoalbuminemia, and edema, typically without prominent hematuria, distinguishing it from nephritic syndromes.',
            difficulty: 2,
            choices: [
              { text: 'Nephrotic syndrome', isCorrect: true },
              { text: 'Nephritic syndrome', isCorrect: false },
              { text: 'Acute interstitial nephritis', isCorrect: false },
              { text: 'Renal artery stenosis', isCorrect: false },
            ],
          },
          {
            stem: 'A patient presents with hematuria, red blood cell casts on urinalysis, hypertension, and mild proteinuria following a recent streptococcal throat infection. This is most consistent with which syndrome?',
            explanation:
              'Nephritic syndrome features hematuria with red blood cell casts, hypertension, and mild-to-moderate proteinuria, classically following post-streptococcal glomerulonephritis.',
            difficulty: 2,
            choices: [
              { text: 'Nephritic syndrome', isCorrect: true },
              { text: 'Nephrotic syndrome', isCorrect: false },
              { text: 'Prerenal azotemia', isCorrect: false },
              { text: 'Diabetic nephropathy', isCorrect: false },
            ],
          },
        ],
      },
    ],
  },
];

async function main() {
  for (const [systemIndex, systemData] of SYSTEMS.entries()) {
    const system = await database.system.upsert({
      where: { examType_name: { examType: EXAM, name: systemData.name } },
      create: { examType: EXAM, name: systemData.name, sortOrder: systemIndex },
      update: {},
    });

    for (const objectiveData of systemData.objectives) {
      const objective = await database.learningObjective.create({
        data: {
          systemId: system.id,
          examType: EXAM,
          discipline: objectiveData.discipline,
          title: objectiveData.title,
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
