// One-off script: nineteenth batch of hand-authored (not model-generated)
// topic titles, continuing the large multi-round push toward 1000 new
// titles. This round covered spinal-cord/skull-base/joint anatomy, renal
// tubular and vasculitis pathology, a huge wave of specific drug names
// (antihypertensives, insulins, oncology, antifungals, antiparasitics,
// DMARDs), nitrogen/lipid biochemistry, membrane potential and cardiac
// electrophysiology physiology, staphylococcal/streptococcal species and
// syphilis-stage microbiology, hypersensitivity-mechanism and T-cell marker
// immunology, renal tubulopathy and hemoglobinopathy genetics, placode and
// genital-descent embryology, gonadal two-cell-theory and gland histology,
// consent-standard behavioral science, and cost-effectiveness biostatistics.
// Written directly, not produced by calling an LLM API — only the FULL
// QUESTION content is ever generated lazily by AI later, on first use.
// Every title was checked against the existing ~4572-title pool before
// inclusion; the script's own case-insensitive dedup is a final safety net.
import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();
const EXAM_TYPE = 'STEP_1';
const AI_SYSTEM_NAME = 'AI Generated';

const T = (title, requiresTable = false) => ({ title, requiresTable });

const TITLES_BY_DISCIPLINE = {
  Anatomy: [
    T('Recognize the denticulate ligament as anchoring the spinal cord laterally within the dural sac'),
    T('Identify the filum terminale as the fibrous extension of the pia mater anchoring the spinal cord to the coccyx'),
    T('Diagnose the dural sac as extending to approximately the S2 vertebral level, below the termination of the spinal cord'),
    T('Recognize a lumbar puncture as performed between L3-L4 or L4-L5 to avoid the conus medullaris, which typically ends at L1-L2'),
    T('Identify the epidural space as containing fat and a venous plexus, the target for epidural anesthesia'),
    T('Diagnose spondylolysis as a stress fracture of the pars interarticularis, common in athletes performing repetitive hyperextension'),
    T('Recognize the intervertebral disc as composed of an outer annulus fibrosus and an inner nucleus pulposus'),
    T('Identify a herniated disc as most commonly occurring posterolaterally, compressing the traversing nerve root'),
    T('Diagnose the pterygomandibular raphe as a landmark used during inferior alveolar nerve block administration'),
    T('Recognize the lateral pterygoid as the primary muscle responsible for opening (depressing) the mandible and protruding the jaw'),
    T('Identify the internal carotid artery as having no branches in the neck, distinguishing it from the external carotid'),
    T('Diagnose the vertebral arteries as arising from the subclavian arteries and joining to form the basilar artery'),
    T('Recognize the anterior cerebral artery as supplying the medial surface of the frontal and parietal lobes'),
    T('Identify the middle cerebral artery as supplying the lateral surface of the frontal, parietal, and temporal lobes, the most common site of ischemic stroke'),
    T('Diagnose the posterior cerebral artery as supplying the occipital lobe and part of the temporal lobe'),
    T('Recognize the external oblique muscle as the most superficial of the anterolateral abdominal wall muscles, with fibers running inferomedially'),
    T('Identify the internal oblique muscle as having fibers running perpendicular to the external oblique'),
    T('Diagnose the transversus abdominis as the deepest anterolateral abdominal wall muscle, with horizontally oriented fibers'),
    T('Recognize sentinel lymph node biopsy as identifying the first lymph node(s) draining a tumor site to assess for metastatic spread'),
    T('Identify a ball-and-socket joint (such as the hip or shoulder) as permitting movement in multiple planes'),
    T('Diagnose a hinge joint (such as the elbow or knee) as permitting movement primarily in one plane'),
    T('Recognize a pivot joint (such as the atlantoaxial joint) as permitting rotational movement around a single axis'),
    T('Identify a herniated disc as most commonly occurring posterolaterally, compressing the exiting nerve root at the level below'),
  ],
  Pathology: [
    T('Recognize Ranson criteria as used to assess the severity and prognosis of acute pancreatitis'),
    T('Identify pancreatic calcifications on imaging as a hallmark of chronic pancreatitis'),
    T('Diagnose a pancreatic pseudocyst as a fluid collection lacking an epithelial lining, a complication of pancreatitis'),
    T('Recognize a VIPoma as causing watery diarrhea, hypokalemia, and achlorhydria (WDHA syndrome)'),
    T('Identify a glucagonoma as presenting with necrolytic migratory erythema, diabetes, and weight loss'),
    T('Diagnose a somatostatinoma as presenting with diabetes, gallstones, and steatorrhea'),
    T('Recognize superior vena cava syndrome as commonly caused by a mediastinal mass, presenting with facial swelling and distended neck veins'),
    T('Identify bronchiectasis as permanent dilation of the airways from recurrent infection and inflammation, presenting with copious purulent sputum'),
    T('Diagnose cystic fibrosis as the most common genetic cause of bronchiectasis in developed countries'),
    T('Recognize farmer\'s lung as a classic example of hypersensitivity pneumonitis from exposure to moldy hay'),
    T('Identify pulmonary alveolar proteinosis as an accumulation of surfactant-like material in the alveoli, presenting with a "crazy paving" pattern on CT'),
    T('Diagnose a bladder diverticulum as an outpouching of the bladder wall, often from chronic outlet obstruction, at risk for stasis and malignancy'),
    T('Recognize urothelial (transitional cell) carcinoma as the most common bladder cancer type in industrialized countries'),
    T('Identify aniline dye and cigarette smoke exposure as risk factors for urothelial carcinoma'),
    T('Diagnose osteoid osteoma as a benign bone tumor causing pain relieved by NSAIDs, with a small radiolucent nidus on imaging'),
    T('Recognize osteochondroma as the most common benign bone tumor, arising from the metaphysis near the growth plate'),
    T('Identify enchondroma as a benign cartilaginous tumor typically found within the medullary cavity of small bones of the hand'),
    T('Diagnose neurofibrillary tangles as composed of hyperphosphorylated tau protein, seen in Alzheimer disease'),
    T('Recognize amyloid plaques as composed of beta-amyloid protein, another hallmark finding of Alzheimer disease'),
    T('Identify frontotemporal dementia (Pick disease) as presenting with early personality and behavioral changes, associated with Pick bodies containing tau protein'),
    T('Diagnose diffuse axonal injury as a consequence of severe rotational acceleration-deceleration forces to the brain, often seen in high-speed trauma'),
    T('Recognize acute lymphoblastic leukemia as the most common malignancy in children, with TdT-positive lymphoblasts'),
    T('Identify chronic myeloid leukemia as presenting with marked leukocytosis and a left-shifted myeloid series including basophilia'),
    T('Diagnose Waldenstrom macroglobulinemia as a lymphoplasmacytic lymphoma producing monoclonal IgM, causing hyperviscosity syndrome'),
    T('Recognize a Curling ulcer as a stress ulcer associated with severe burns'),
    T('Identify a Cushing ulcer as a stress ulcer associated with elevated intracranial pressure'),
  ],
  Pharmacology: [
    T('Recognize doxazosin, terazosin, and prazosin as alpha-1 blockers used for hypertension and benign prostatic hyperplasia'),
    T('Identify first-dose orthostatic hypotension as a known risk when initiating alpha-1 blocker therapy'),
    T('Diagnose methyldopa as a centrally-acting antihypertensive considered safe in pregnancy'),
    T('Recognize labetalol as a combined alpha-1 and beta blocker used in hypertensive emergencies and pregnancy-related hypertension'),
    T('Identify carvedilol as a combined alpha and beta blocker used in heart failure with reduced ejection fraction'),
    T('Diagnose nebivolol as a beta-1 selective blocker with additional nitric oxide-mediated vasodilating properties'),
    T('Recognize esmolol as an ultra-short-acting beta blocker useful for rapid rate control in acute settings'),
    T('Identify canagliflozin as an SGLT2 inhibitor with an additional labeled risk of lower limb amputation'),
    T('Diagnose glucagon as used to treat severe hypoglycemia when IV access is unavailable'),
    T('Recognize insulin glargine and insulin detemir as long-acting basal insulin analogs with relatively flat absorption profiles'),
    T('Identify insulin lispro, aspart, and glulisine as rapid-acting insulin analogs used for mealtime glucose control'),
    T('Diagnose NPH insulin as an intermediate-acting insulin with a more variable absorption profile than newer basal analogs'),
    T('Recognize vincristine and vinblastine as vinca alkaloids that inhibit microtubule polymerization'),
    T('Identify etoposide as a topoisomerase II inhibitor used in various cancers'),
    T('Diagnose irinotecan and topotecan as topoisomerase I inhibitors'),
    T('Recognize cyclophosphamide\'s mechanism as DNA alkylation and cross-linking, requiring hepatic activation'),
    T('Identify busulfan as an alkylating agent classically associated with pulmonary fibrosis'),
    T('Diagnose carboplatin as having a more favorable renal and neurotoxicity profile than cisplatin, but with more myelosuppression'),
    T('Recognize trastuzumab\'s cardiotoxicity risk as generally reversible, unlike the dose-dependent cardiotoxicity of anthracyclines'),
    T('Identify rituximab as increasing the risk of hepatitis B reactivation, requiring screening before initiation'),
    T('Diagnose rasburicase as used to prevent or treat tumor lysis syndrome by degrading uric acid'),
    T('Recognize fluconazole as having good CNS penetration, useful for cryptococcal meningitis maintenance therapy'),
    T('Identify itraconazole as having poor CNS penetration compared to fluconazole'),
    T('Diagnose voriconazole as the first-line treatment for invasive aspergillosis'),
    T('Recognize visual disturbances as a characteristic adverse effect of voriconazole'),
    T('Identify terbinafine as an oral antifungal used for dermatophyte nail infections, inhibiting squalene epoxidase'),
    T('Diagnose nystatin as a topical/oral (non-absorbed) antifungal used for oral or esophageal candidiasis'),
    T('Recognize ivermectin as the treatment of choice for strongyloidiasis and onchocerciasis'),
    T('Identify albendazole and mebendazole as broad-spectrum antihelminthics that inhibit microtubule formation in parasites'),
    T('Diagnose praziquantel as the treatment of choice for schistosomiasis and most tapeworm infections'),
    T('Recognize metronidazole as effective against Giardia, Entamoeba, and Trichomonas in addition to anaerobic bacteria'),
    T('Identify chloroquine as effective for chloroquine-sensitive malaria, working by inhibiting heme polymerization in the parasite'),
    T('Diagnose artemisinin-based combination therapy as the first-line treatment for chloroquine-resistant Plasmodium falciparum malaria'),
    T('Recognize mefloquine as an alternative antimalarial with a risk of neuropsychiatric adverse effects'),
    T('Identify allopurinol as requiring dose reduction when co-administered with azathioprine or 6-mercaptopurine due to shared metabolic pathway inhibition'),
    T('Diagnose tofacitinib as a JAK inhibitor used in rheumatoid arthritis'),
    T('Recognize apremilast as a phosphodiesterase-4 inhibitor used in psoriatic arthritis and psoriasis'),
    T('Identify colchicine as also used for prophylaxis against gout flares during initiation of urate-lowering therapy'),
    T('Diagnose pegloticase as a recombinant uricase used for refractory chronic gout'),
    T('Recognize methotrexate as requiring folic acid supplementation to reduce adverse effects when used for rheumatoid arthritis'),
  ],
  Biochemistry: [
    T('Recognize oxidative deamination as releasing free ammonia from an amino acid, requiring subsequent urea cycle processing'),
    T('Identify glutamate dehydrogenase as a key enzyme in oxidative deamination, linking amino acid and carbohydrate metabolism'),
    T('Diagnose branched-chain amino acids (leucine, isoleucine, valine) as metabolized primarily in muscle rather than the liver'),
    T('Recognize branched-chain ketoacid dehydrogenase as the enzyme deficient in maple syrup urine disease'),
    T('Identify isoniazid as inhibiting pyridoxal phosphate (active vitamin B6), explaining its associated peripheral neuropathy risk'),
    T('Diagnose methotrexate as inhibiting dihydrofolate reductase, blocking the regeneration of tetrahydrofolate needed for nucleotide synthesis'),
    T('Recognize trimethoprim as inhibiting bacterial dihydrofolate reductase with much greater selectivity than for the human enzyme'),
    T('Identify HDL as responsible for reverse cholesterol transport, returning excess cholesterol from peripheral tissues to the liver'),
  ],
  Physiology: [
    T('Recognize the resting membrane potential of a typical neuron as approximately -70mV, primarily determined by potassium\'s high permeability'),
    T('Identify the Nernst equation as calculating the equilibrium potential for a single ion based on its concentration gradient'),
    T('Diagnose the Goldman equation as calculating the resting membrane potential by accounting for the relative permeability of multiple ions'),
    T('Recognize depolarization of the neuronal membrane as resulting from rapid sodium influx through voltage-gated sodium channels'),
    T('Identify repolarization as resulting from potassium efflux through voltage-gated potassium channels'),
    T('Diagnose the absolute refractory period as the time during which a neuron cannot fire another action potential regardless of stimulus strength, due to sodium channel inactivation'),
    T('Recognize phase 4 of the cardiac action potential as the resting phase, with pacemaker cells showing spontaneous depolarization'),
    T('Identify phase 0 of the cardiac action potential as rapid depolarization from sodium influx in non-pacemaker cells'),
    T('Diagnose phase 0 of the pacemaker action potential as resulting from calcium influx, distinct from sodium-driven phase 0 in myocardial cells'),
    T('Recognize the PR interval on an ECG as representing conduction time through the AV node'),
    T('Identify the QRS complex as representing ventricular depolarization'),
    T('Diagnose the QT interval as representing the total duration of ventricular depolarization and repolarization'),
    T('Recognize the T wave as representing ventricular repolarization'),
    T('Identify excitation-contraction coupling in skeletal muscle as involving direct mechanical coupling between the dihydropyridine and ryanodine receptors'),
    T('Diagnose excitation-contraction coupling in cardiac muscle as relying on calcium-induced calcium release rather than direct mechanical coupling'),
    T('Recognize smooth muscle excitation-contraction coupling as relying on calcium binding to calmodulin rather than troponin'),
    T('Identify basal body temperature as rising slightly after ovulation due to the thermogenic effect of progesterone'),
    T('Diagnose spermatogenesis as taking approximately 64-72 days from spermatogonium to mature spermatozoon'),
    T('Recognize testosterone\'s role in spermatogenesis as acting locally within the seminiferous tubules via Sertoli cells'),
    T('Identify the anion gap as calculated by subtracting the sum of chloride and bicarbonate from sodium'),
    T('Diagnose a delta-delta gap calculation as used to detect a mixed acid-base disorder in the setting of a high anion gap metabolic acidosis'),
    T('Recognize urine anion gap as helpful in distinguishing gastrointestinal from renal causes of a normal anion gap metabolic acidosis'),
    T('Identify the tonotopic organization of the cochlea as having high-frequency sounds detected near the base and low-frequency sounds near the apex'),
    T('Diagnose dark adaptation as the gradual increase in retinal sensitivity to light in low-light conditions, mediated by rhodopsin regeneration'),
    T('Recognize presbyopia as age-related loss of lens elasticity, reducing the eye\'s ability to accommodate for near vision'),
    T('Identify myopia as light focusing in front of the retina, corrected with a diverging (concave) lens'),
    T('Diagnose the difference in electromyography findings between myasthenia gravis (decremental response) and Lambert-Eaton syndrome (incremental response) with repetitive stimulation'),
    T('Recognize the neuromuscular junction as using acetylcholine as its neurotransmitter, binding nicotinic receptors on the motor end plate'),
  ],
  Microbiology: [
    T('Recognize Staphylococcus saprophyticus as a coagulase-negative cause of UTIs in young sexually active women'),
    T('Identify Staphylococcus lugdunensis as a coagulase-negative species with virulence more similar to S. aureus, capable of causing aggressive endocarditis'),
    T('Diagnose Streptococcus mutans as the primary organism responsible for dental caries'),
    T('Recognize Streptococcus sanguinis (viridans group) as part of normal oral flora, associated with subacute bacterial endocarditis after dental procedures'),
    T('Identify Streptococcus gallolyticus (bovis) bacteremia or endocarditis as associated with underlying colorectal cancer'),
    T('Diagnose viridans group streptococci as alpha-hemolytic and optochin-resistant, distinguishing them from Streptococcus pneumoniae'),
    T('Recognize subacute bacterial endocarditis as typically caused by lower-virulence organisms such as viridans streptococci on previously damaged valves'),
    T('Identify prosthetic valve endocarditis occurring within 60 days of surgery as most commonly caused by coagulase-negative staphylococci'),
    T('Diagnose culture-negative endocarditis as classically associated with the HACEK organisms or fastidious organisms such as Coxiella and Bartonella'),
    T('Recognize pharyngitis caused by group A strep as requiring antibiotic treatment primarily to prevent rheumatic fever, not to shorten symptom duration'),
    T('Identify necrotizing fasciitis type II as caused by Streptococcus pyogenes alone, distinct from the polymicrobial type I'),
    T('Diagnose Candida albicans as forming true hyphae and germ tubes, distinguishing it from most other Candida species'),
    T('Recognize Candida glabrata and Candida krusei as having intrinsically reduced susceptibility to fluconazole'),
    T('Identify disseminated candidiasis in a neutropenic patient as a serious, potentially fatal complication requiring prompt antifungal therapy'),
    T('Diagnose secondary syphilis as presenting weeks after the primary chancre with a diffuse rash including the palms and soles, along with condylomata lata'),
    T('Recognize tertiary syphilis as occurring years after untreated infection, presenting with gummas, cardiovascular disease, or neurosyphilis'),
    T('Identify the Jarisch-Herxheimer reaction as an acute febrile response to antibiotic treatment of syphilis from rapid spirochete killing'),
    T('Diagnose adenovirus type 40/41 as a common cause of viral gastroenteritis in children, distinct from the respiratory adenovirus serotypes'),
    T('Recognize coxsackievirus B as a cause of viral (aseptic) meningitis and myocarditis'),
    T('Identify coxsackievirus B as associated with pleurodynia (Bornholm disease), presenting with severe chest wall pain'),
    T('Diagnose parvovirus B19\'s binding to the P antigen on red blood cell precursors as explaining its tropism for erythroid cells'),
    T('Recognize Acanthamoeba as causing granulomatous amebic encephalitis in immunocompromised patients and keratitis in contact lens wearers'),
    T('Identify free-living amoebae infections as often associated with poor contact lens hygiene or exposure to warm freshwater'),
    T('Diagnose Sarcoptes scabiei as the mite causing scabies, presenting with intensely pruritic burrows, especially in web spaces'),
    T('Recognize Pediculus humanus as the louse causing pediculosis, distinguished into head and body louse subtypes'),
    T('Identify Phthirus pubis as the pubic louse, typically sexually transmitted'),
    T('Diagnose a positive latex agglutination test as a rapid method for detecting specific bacterial or fungal antigens'),
    T('Recognize a positive Weil-Felix test as historically used to diagnose certain rickettsial infections via cross-reacting Proteus antibodies'),
    T('Identify serologic testing for Lyme disease as using a two-tiered approach with an ELISA screen followed by Western blot confirmation'),
    T('Diagnose obligate anaerobes as lacking catalase and superoxide dismutase, making them susceptible to oxygen toxicity'),
    T('Recognize Clostridium species as spore-forming, obligate anaerobic gram-positive rods'),
    T('Identify Fusobacterium as an anaerobic organism associated with Lemierre syndrome (septic thrombophlebitis of the internal jugular vein)'),
    T('Diagnose Prevotella as an anaerobic organism associated with aspiration pneumonia and oral infections'),
    T('Recognize Stenotrophomonas maltophilia\'s intrinsic resistance pattern as requiring trimethoprim-sulfamethoxazole as a preferred treatment'),
    T('Identify central line-associated bloodstream infections as commonly caused by coagulase-negative staphylococci and Candida species'),
    T('Diagnose ventilator-associated pneumonia occurring after 5 days of intubation as more likely caused by multidrug-resistant organisms such as Pseudomonas or Acinetobacter'),
  ],
  Immunology: [
    T('Recognize Type I hypersensitivity as IgE-mediated mast cell and basophil degranulation occurring within minutes of antigen exposure'),
    T('Identify Type II hypersensitivity as antibody-mediated cytotoxicity against cell surface or matrix antigens'),
    T('Diagnose Type III hypersensitivity as immune complex deposition activating complement and recruiting neutrophils'),
    T('Recognize Type IV hypersensitivity as T cell-mediated, occurring 48-72 hours after antigen exposure without antibody involvement'),
    T('Identify an Arthus reaction as a localized Type III hypersensitivity reaction from repeated local antigen exposure'),
    T('Diagnose a tuberculin skin test (PPD) reaction as a classic example of delayed-type (Type IV) hypersensitivity'),
    T('Recognize granulomatous hypersensitivity as a variant of Type IV hypersensitivity involving activated macrophages forming granulomas'),
    T('Identify CD4 T helper cells as recognizing antigen presented on MHC class II by antigen-presenting cells'),
    T('Diagnose CD8 cytotoxic T cells as recognizing antigen presented on MHC class I by nucleated cells'),
    T('Recognize MHC class I molecules as present on all nucleated cells, presenting endogenous (intracellular) antigens'),
    T('Identify MHC class II molecules as restricted to professional antigen-presenting cells, presenting exogenous (extracellular) antigens'),
    T('Diagnose the TAP transporter as loading peptides onto MHC class I molecules within the endoplasmic reticulum'),
    T('Recognize the invariant chain as blocking premature peptide loading onto MHC class II molecules until they reach the endosome'),
    T('Identify macrophage activation syndrome (secondary hemophagocytic lymphohistiocytosis) as a life-threatening hyperinflammatory state'),
    T('Diagnose hemophagocytosis on bone marrow biopsy as a diagnostic feature of hemophagocytic lymphohistiocytosis'),
    T('Recognize TLR4 as the receptor recognizing bacterial lipopolysaccharide (endotoxin)'),
    T('Identify NOD-like receptors as intracellular pattern recognition receptors that can form inflammasomes'),
    T('Diagnose the NLRP3 inflammasome as activating caspase-1 to process pro-IL-1beta into its active form'),
    T('Recognize CD14 as a co-receptor for TLR4 in the recognition of lipopolysaccharide'),
    T('Identify PD-L1 expression on tumor cells as a mechanism of immune evasion targeted by checkpoint inhibitor therapy'),
  ],
  Genetics: [
    T('Recognize Fanconi syndrome (renal) as a generalized proximal tubular dysfunction causing glucosuria, aminoaciduria, and phosphaturia'),
    T('Identify pseudohypoaldosteronism as end-organ resistance to aldosterone, presenting with hyperkalemia despite normal or elevated aldosterone levels'),
    T('Diagnose apparent mineralocorticoid excess as caused by 11-beta-hydroxysteroid dehydrogenase deficiency, allowing cortisol to inappropriately activate mineralocorticoid receptors'),
    T('Recognize glucocorticoid-remediable aldosteronism as a rare genetic cause of hypertension responsive to glucocorticoid administration'),
    T('Identify Denys-Drash syndrome as a WT1 gene disorder presenting with early-onset nephropathy, gonadal dysgenesis, and Wilms tumor'),
    T('Diagnose Beckwith-Wiedemann syndrome as increasing the risk of Wilms tumor and hepatoblastoma, requiring tumor surveillance'),
    T('Recognize neurofibromatosis type 1\'s Lisch nodules as pigmented iris hamartomas, distinct from café-au-lait spots'),
    T('Identify optic glioma as a characteristic CNS tumor associated with neurofibromatosis type 1'),
    T('Diagnose spinobulbar muscular atrophy (Kennedy disease) as an X-linked CAG repeat disorder affecting the androgen receptor gene'),
    T('Recognize gynecomastia and reduced fertility as features of Kennedy disease from androgen receptor dysfunction'),
    T('Identify beta-thalassemia major as resulting from absent or severely reduced beta-globin chain production, requiring chronic transfusion'),
    T('Diagnose beta-thalassemia minor as a mild, often asymptomatic microcytic anemia from heterozygous beta-globin gene mutation'),
    T('Recognize alpha-thalassemia as resulting from deletion of one or more of the four alpha-globin gene copies'),
    T('Identify hydrops fetalis as the lethal consequence of deletion of all four alpha-globin gene copies'),
    T('Diagnose HbH disease as resulting from deletion of three alpha-globin gene copies, causing a moderate hemolytic anemia'),
    T('Recognize hemoglobin Barts as the tetramer of gamma-globin chains formed in alpha-thalassemia when alpha chains are severely deficient'),
    T('Identify a balanced reciprocal translocation carrier as typically phenotypically normal but at risk for unbalanced gametes and recurrent miscarriage'),
    T('Diagnose chromosomal breakage syndromes (such as Fanconi anemia, ataxia-telangiectasia, and Bloom syndrome) as sharing an increased risk of malignancy'),
    T('Recognize APOE4 as a genetic risk factor increasing susceptibility to late-onset Alzheimer disease'),
    T('Identify APOE2 as associated with a reduced risk of Alzheimer disease compared to APOE3 and APOE4'),
    T('Diagnose the prothrombin G20210A mutation as increasing thrombosis risk through elevated prothrombin levels'),
  ],
  Embryology: [
    T('Recognize ovarian descent as occurring to a much lesser degree than testicular descent, with the ovaries remaining within the pelvis'),
    T('Identify the round ligament of the uterus as the embryological homolog of the gubernaculum in females'),
    T('Diagnose a septate uterus as the most common Müllerian duct anomaly, resulting from failure of resorption of the uterine septum after duct fusion'),
    T('Recognize the lens placode as an ectodermal thickening induced by the optic vesicle that invaginates to form the lens vesicle'),
    T('Identify the otic placode as an ectodermal thickening that invaginates to form the otic vesicle, the precursor of the inner ear'),
    T('Diagnose the nasal placodes as ectodermal thickenings that give rise to the olfactory epithelium'),
  ],
  Histology: [
    T('Recognize the two-cell, two-gonadotropin theory as explaining ovarian estrogen synthesis: LH stimulates theca cells to produce androgens, which granulosa cells aromatize to estrogen under FSH stimulation'),
    T('Identify theca cells as expressing LH receptors and producing androgens in response to LH stimulation'),
    T('Diagnose granulosa cells as expressing FSH receptors and converting theca-derived androgens to estrogen via aromatase'),
    T('Recognize Sertoli cells as expressing FSH receptors and supporting spermatogenesis'),
    T('Identify Leydig cells as expressing LH receptors and producing testosterone'),
    T('Diagnose the exocrine pancreas as composed of acinar cells arranged around a central lumen, secreting digestive enzymes into a duct system'),
    T('Recognize zymogen granules within pancreatic acinar cells as containing inactive digestive enzyme precursors'),
    T('Identify the parotid gland as a purely serous salivary gland'),
    T('Diagnose the submandibular gland as a mixed seromucous salivary gland with a predominantly serous component'),
    T('Recognize the sublingual gland as a mixed seromucous salivary gland with a predominantly mucous component'),
    T('Identify mast cells as containing basophilic granules with histamine and heparin, distinct from circulating basophils by tissue residence'),
    T('Diagnose adipocytes as specialized cells for lipid storage, with white adipocytes containing a single large lipid droplet'),
    T('Recognize plasma cells as having an eccentric nucleus with a "clock-face" chromatin pattern and abundant rough endoplasmic reticulum'),
    T('Identify skeletal muscle as multinucleated with peripherally located nuclei, distinct from the single central nucleus of cardiac muscle'),
    T('Diagnose smooth muscle as having a single central nucleus and lacking visible striations due to the irregular arrangement of actin and myosin'),
  ],
  'Behavioral Science': [
    T('Recognize informed refusal as requiring the same disclosure elements as informed consent when a patient declines a recommended treatment'),
    T('Identify the best interest standard as used for surrogate decision-making when a patient\'s own wishes are unknown'),
    T('Diagnose the substituted judgment standard as used for surrogate decision-making when a patient\'s prior wishes can be reasonably inferred'),
    T('Recognize a healthcare proxy as a person legally designated to make medical decisions on behalf of an incapacitated patient'),
  ],
  'Biostatistics, epidemiology & evidence-based medicine': [
    T('Recognize cost-benefit analysis as expressing both costs and outcomes in monetary terms, distinct from cost-effectiveness analysis'),
    T('Identify an incremental cost-effectiveness ratio as comparing the additional cost of an intervention to its additional health benefit'),
    T('Diagnose willingness-to-pay as a method used in cost-benefit analysis to assign a monetary value to a health outcome'),
    T('Recognize a decision analysis tree as a tool for comparing expected outcomes of different clinical strategies under uncertainty'),
    T('Identify a Markov model as used in cost-effectiveness analysis to model disease progression through defined health states over time'),
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
