export type LabRow = { test: string; value: string };
export type LabSection = { title: string; rows: LabRow[] };
export type LabCategory = { title: string; sections: LabSection[] };

export const LAB_VALUES: LabCategory[] = [
  {
    title: 'Serum — General Chemistry',
    sections: [
      {
        title: 'Electrolytes',
        rows: [
          { test: 'Sodium (Na+)', value: '136–146 mEq/L' },
          { test: 'Potassium (K+)', value: '3.5–5.0 mEq/L' },
          { test: 'Chloride (Cl−)', value: '95–105 mEq/L' },
          { test: 'Bicarbonate (HCO3−)', value: '22–28 mEq/L' },
          { test: 'Urea nitrogen', value: '7–18 mg/dL' },
          { test: 'Creatinine', value: '0.6–1.2 mg/dL' },
          { test: 'Glucose, fasting', value: '70–100 mg/dL' },
          { test: 'Glucose, random non-fasting', value: '<140 mg/dL' },
          { test: 'Calcium', value: '8.4–10.2 mg/dL' },
          { test: 'Magnesium (Mg2+)', value: '1.5–2.0 mEq/L' },
          { test: 'Phosphorus (inorganic)', value: '3.0–4.5 mg/dL' },
        ],
      },
      {
        title: 'Hepatic',
        rows: [
          { test: 'Alanine aminotransferase (ALT)', value: '10–40 U/L' },
          { test: 'Aspartate aminotransferase (AST)', value: '12–38 U/L' },
          { test: 'Alkaline phosphatase', value: '25–100 U/L' },
          { test: 'Bilirubin, total', value: '0.1–1.0 mg/dL' },
          { test: 'Bilirubin, direct', value: '0.0–0.3 mg/dL' },
          { test: 'Proteins, total', value: '6.0–7.8 g/dL' },
          { test: 'Albumin', value: '3.5–5.5 g/dL' },
          { test: 'Globulin', value: '2.3–3.5 g/dL' },
        ],
      },
      {
        title: 'Other, serum',
        rows: [
          { test: 'Amylase', value: '25–125 U/L' },
          { test: 'Lipase', value: '13–60 U/L' },
          { test: 'Creatinine clearance, male', value: '97–137 mL/min' },
          { test: 'Creatinine clearance, female', value: '88–128 mL/min' },
          { test: 'Creatine kinase, male', value: '25–90 U/L' },
          { test: 'Creatine kinase, female', value: '10–70 U/L' },
          { test: 'Lactate dehydrogenase', value: '45–200 U/L' },
          { test: 'Osmolality', value: '275–295 mOsmol/kg H2O' },
          { test: 'Troponin I', value: '≤0.04 ng/mL' },
          { test: 'Uric acid', value: '3.0–8.2 mg/dL' },
        ],
      },
      {
        title: 'Lipids',
        rows: [
          { test: 'Cholesterol, total (normal)', value: '<200 mg/dL' },
          { test: 'Cholesterol, total (high)', value: '>240 mg/dL' },
          { test: 'HDL', value: '40–60 mg/dL' },
          { test: 'LDL', value: '<160 mg/dL' },
          { test: 'Triglycerides (normal)', value: '<150 mg/dL' },
          { test: 'Triglycerides (borderline)', value: '151–199 mg/dL' },
        ],
      },
      {
        title: 'Iron studies',
        rows: [
          { test: 'Ferritin, male', value: '20–250 ng/mL' },
          { test: 'Ferritin, female', value: '10–120 ng/mL' },
          { test: 'Iron, male', value: '65–175 µg/dL' },
          { test: 'Iron, female', value: '50–170 µg/dL' },
          { test: 'Total iron-binding capacity', value: '250–400 µg/dL' },
          { test: 'Transferrin', value: '200–360 mg/dL' },
        ],
      },
      {
        title: 'Endocrine',
        rows: [
          { test: 'FSH, male', value: '4–25 mIU/mL' },
          { test: 'FSH, female (premenopause)', value: '4–30 mIU/mL' },
          { test: 'FSH, female (midcycle peak)', value: '10–90 mIU/mL' },
          { test: 'FSH, female (postmenopause)', value: '40–250 mIU/mL' },
          { test: 'LH, male', value: '6–23 mIU/mL' },
          { test: 'LH, female (follicular phase)', value: '5–30 mIU/mL' },
          { test: 'LH, female (midcycle)', value: '75–150 mIU/mL' },
          { test: 'LH, female (postmenopause)', value: '30–200 mIU/mL' },
          { test: 'Growth hormone, fasting', value: '<5 ng/mL' },
          { test: 'Growth hormone, provocative stimuli', value: '>7 ng/mL' },
          { test: 'Prolactin (hPRL), male', value: '<17 ng/mL' },
          { test: 'Prolactin (hPRL), female', value: '<25 ng/mL' },
          { test: 'Cortisol, 0800 h', value: '5–23 µg/dL' },
          { test: 'Cortisol, 1600 h', value: '3–15 µg/dL' },
          { test: 'Cortisol, 2000 h', value: '<50% of 0800 h' },
          { test: 'TSH', value: '0.4–4.0 µU/mL' },
          { test: 'Triiodothyronine (T3) (RIA)', value: '100–200 ng/dL' },
          { test: 'Triiodothyronine (T3) resin uptake', value: '25%–35%' },
          { test: 'Thyroxine (T4)', value: '5–12 µg/dL' },
          { test: 'Free T4', value: '0.9–1.7 ng/dL' },
          { test: 'Thyroidal iodine (123I) uptake', value: '8%–30% of administered dose/24 h' },
          { test: 'Intact PTH', value: '10–60 pg/mL' },
          { test: '17-Hydroxycorticosteroids, male', value: '3.0–10.0 mg/24 h' },
          { test: '17-Hydroxycorticosteroids, female', value: '2.0–8.0 mg/24 h' },
          { test: '17-Ketosteroids, male', value: '8–20 mg/24 h' },
          { test: '17-Ketosteroids, female', value: '6–15 mg/24 h' },
        ],
      },
      {
        title: 'Immunoglobulins',
        rows: [
          { test: 'IgA', value: '76–390 mg/dL' },
          { test: 'IgE', value: '0–380 IU/mL' },
          { test: 'IgG', value: '650–1500 mg/dL' },
          { test: 'IgM', value: '50–300 mg/dL' },
        ],
      },
    ],
  },
  {
    title: 'Arterial Blood Gases (room air)',
    sections: [
      {
        title: 'ABG',
        rows: [
          { test: 'Po2', value: '75–105 mm Hg' },
          { test: 'Pco2', value: '33–45 mm Hg' },
          { test: 'pH', value: '7.35–7.45' },
        ],
      },
    ],
  },
  {
    title: 'Cerebrospinal Fluid',
    sections: [
      {
        title: 'CSF',
        rows: [
          { test: 'Cell count', value: '0–5/mm3' },
          { test: 'Chloride', value: '118–132 mEq/L' },
          { test: 'Gamma globulin', value: '3%–12% total proteins' },
          { test: 'Glucose', value: '40–70 mg/dL' },
          { test: 'Pressure', value: '70–180 mm H2O' },
          { test: 'Proteins, total', value: '<40 mg/dL' },
        ],
      },
    ],
  },
  {
    title: 'Hematologic',
    sections: [
      {
        title: 'Complete blood count',
        rows: [
          { test: 'Hematocrit, male', value: '41%–53%' },
          { test: 'Hematocrit, female', value: '36%–46%' },
          { test: 'Hemoglobin, male', value: '13.5–17.5 g/dL' },
          { test: 'Hemoglobin, female', value: '12.0–16.0 g/dL' },
          { test: 'MCH', value: '25–35 pg/cell' },
          { test: 'MCHC', value: '31%–36% Hb/cell' },
          { test: 'MCV', value: '80–100 µm3' },
          { test: 'Plasma volume, male', value: '25–43 mL/kg' },
          { test: 'Plasma volume, female', value: '28–45 mL/kg' },
          { test: 'Red cell volume, male', value: '20–36 mL/kg' },
          { test: 'Red cell volume, female', value: '19–31 mL/kg' },
          { test: 'Leukocyte count (WBC)', value: '4500–11,000/mm3' },
          { test: 'Neutrophils, segmented', value: '54%–62%' },
          { test: 'Neutrophils, bands', value: '3%–5%' },
          { test: 'Lymphocytes', value: '25%–33%' },
          { test: 'Monocytes', value: '3%–7%' },
          { test: 'Eosinophils', value: '1%–3%' },
          { test: 'Basophils', value: '0%–0.75%' },
          { test: 'Platelet count', value: '150,000–400,000/mm3' },
        ],
      },
      {
        title: 'Coagulation',
        rows: [
          { test: 'PTT (activated)', value: '25–40 seconds' },
          { test: 'Prothrombin time (PT)', value: '11–15 seconds' },
          { test: 'D-dimer', value: '≤250 ng/mL' },
        ],
      },
      {
        title: 'Other, hematologic',
        rows: [
          { test: 'Reticulocyte count', value: '0.5%–1.5%' },
          { test: 'Erythrocyte count (RBC), male', value: '4.3–5.9 million/mm3' },
          { test: 'Erythrocyte count (RBC), female', value: '3.5–5.5 million/mm3' },
          { test: 'ESR (Westergren), male', value: '0–15 mm/h' },
          { test: 'ESR (Westergren), female', value: '0–20 mm/h' },
          { test: 'CD4+ T-lymphocyte count', value: '≥500/mm3' },
          { test: 'Hemoglobin A1c', value: '≤6%' },
        ],
      },
    ],
  },
  {
    title: 'Urine',
    sections: [
      {
        title: 'Urine',
        rows: [
          { test: 'Calcium', value: '100–300 mg/24 h' },
          { test: 'Osmolality', value: '50–1200 mOsmol/kg H2O' },
          { test: 'Oxalate', value: '8–40 µg/mL' },
          { test: 'Proteins, total', value: '<150 mg/24 h' },
        ],
      },
    ],
  },
  {
    title: 'Body Mass Index',
    sections: [
      {
        title: 'BMI',
        rows: [{ test: 'BMI, adult', value: '19–25 kg/m2' }],
      },
    ],
  },
];
