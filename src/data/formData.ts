export interface BodyPartOption {
  id: string;
  label: string;
  icon: string;
}

export interface ConditionOption {
  id: string;
  label: string;
  relatedBodyParts: string[];
}

export interface BudgetOption {
  id: string;
  label: string;
  value: number;
}

export interface FrequencyOption {
  id: string;
  label: string;
  value: string;
}

export const bodyPartOptions: BodyPartOption[] = [
  {
    id: 'wrinkle',
    label: 'Wrinkles/Fine Lines',
    icon: '/estimate/wrinkle.svg'
  },
  {
    id: 'hair',
    label: 'Scalp/Hair Loss',
    icon: '/estimate/hair.svg'
  },
  {
    id: 'skin',
    label: 'Skin',
    icon: '/estimate/skin.svg'
  },
  {
    id: 'stem',
    label: 'Stem Cell/IV Therapy',
    icon: '/estimate/stemcell.svg'
  },
  {
    id: 'eye',
    label: 'Eyes',
    icon: '/estimate/eye.svg'
  },
  {
    id: 'nose',
    label: 'Nose',
    icon: '/estimate/nose.svg'
  },
  {
    id: 'mouth',
    label: 'Mouth',
    icon: '/estimate/mouth.svg'
  },
  {
    id: 'face',
    label: 'Face Shape',
    icon: '/estimate/face.svg'
  },
  {
    id: 'gynecology',
    label: 'Gynecology/Urology',
    icon: '/estimate/gynecology.svg'
  },
  {
    id: 'joint',
    label: 'Joints',
    icon: '/estimate/joint.svg'
  },
  {
    id: 'body',
    label: 'Body/Contour',
    icon: '/estimate/body.svg'
  }
];

export const conditionOptions: { [key: string]: ConditionOption[] } = {
  'wrinkle': [
    { id: 'fine-lines', label: 'Fine Lines', relatedBodyParts: ['wrinkle'] },
    { id: 'nasolabial-folds', label: 'Nasolabial Folds (Smile Lines)', relatedBodyParts: ['wrinkle'] },
    { id: 'forehead-frown-lines', label: 'Forehead / Glabellar Lines', relatedBodyParts: ['wrinkle'] },
    { id: 'crow-s-feet', label: 'Crow’s Feet (Eye Wrinkles)', relatedBodyParts: ['wrinkle'] },
    { id: 'lip-lines', label: 'Lip Lines', relatedBodyParts: ['wrinkle'] },
    { id: 'bunny-lines', label: 'Bunny Lines (Nasal Wrinkles)', relatedBodyParts: ['wrinkle'] },
    { id: 'neck-lines', label: 'Neck Wrinkles', relatedBodyParts: ['wrinkle'] },
    { id: 'chin-wrinkles', label: 'Chin Wrinkles', relatedBodyParts: ['wrinkle'] }
  ],

  'skin': [
    { id: 'skin-elasticity', label: 'Skin Elasticity', relatedBodyParts: ['skin'] },
    { id: 'pigmentation-redness', label: 'Pigmentation / Redness', relatedBodyParts: ['skin'] },
    { id: 'acne-inflammation', label: 'Acne / Inflammation', relatedBodyParts: ['skin'] },
    { id: 'moles-warts', label: 'Moles / Age Spots / Warts', relatedBodyParts: ['skin'] },
    { id: 'inner-dryness', label: 'Inner Dryness', relatedBodyParts: ['skin'] },
    { id: 'skin-texture', label: 'Rough Skin Texture', relatedBodyParts: ['skin'] },
    { id: 'large-pores', label: 'Large Pores', relatedBodyParts: ['skin'] },
    { id: 'beard-hair-removal', label: 'Beard / Hair Removal', relatedBodyParts: ['skin'] }
  ],

  'stem': [
    { id: 'fatigue-recovery', label: 'Fatigue Recovery', relatedBodyParts: ['stem'] },
    { id: 'immune-boost', label: 'Immune Boost', relatedBodyParts: ['stem'] },
    { id: 'anti-aging', label: 'Anti-Aging/Antioxidant', relatedBodyParts: ['stem'] },
    { id: 'skin-improvement', label: 'Skin Improvement', relatedBodyParts: ['stem'] }
  ],
  'eye': [
    { id: 'eye-wrinkles', label: 'Eye Wrinkles', relatedBodyParts: ['eye'] },
    { id: 'sunken-under-eyes', label: 'Sunken Under Eyes', relatedBodyParts: ['eye'] },
    { id: 'sagging-eye-area', label: 'Sagging Eye Area', relatedBodyParts: ['eye'] },
    { id: 'small-eyes', label: 'Small Eyes', relatedBodyParts: ['eye'] },
    { id: 'puffy-eyelids', label: 'Puffy Upper Eyelids', relatedBodyParts: ['eye'] },
    { id: 'sleepy-eyes', label: 'Sleepy-looking Eyes', relatedBodyParts: ['eye'] },
    { id: 'droopy-eyelids', label: 'Droopy Eyelids', relatedBodyParts: ['eye'] },
    { id: 'eye-revision', label: 'Eye Revision Surgery', relatedBodyParts: ['eye'] },
    { id: 'under-eye-fat', label: 'Under-eye Fat', relatedBodyParts: ['eye'] }
  ],
'nose': [
  { id: 'bunny-lines', label: 'Bunny Lines (Nasal Wrinkles)', relatedBodyParts: ['nose'] },
  { id: 'low-nose-bridge', label: 'Low Nose Bridge', relatedBodyParts: ['nose'] },
  { id: 'droopy-nose-tip', label: 'Droopy Nose Tip', relatedBodyParts: ['nose'] },
  { id: 'wide-nose', label: 'Wide Nose', relatedBodyParts: ['nose'] }
],
'mouth': [
  { id: 'lip-wrinkles', label: 'Lip Wrinkles', relatedBodyParts: ['mouth'] },
  { id: 'thin-lips', label: 'Thin Lips', relatedBodyParts: ['mouth'] },
  { id: 'drooping-mouth-corners', label: 'Drooping Mouth Corners', relatedBodyParts: ['mouth'] }
],

  'face': [
    { id: 'sagging', label: 'Skin Sagging', relatedBodyParts: ['face'] },
    { id: 'square-jaw', label: 'Square Jaw', relatedBodyParts: ['face'] },
    { id: 'facial-contour-refinement', label: 'Facial Contour Refinement', relatedBodyParts: ['face'] },
    { id: 'chin-fat-double-chin', label: 'Chin Fat / Double Chin', relatedBodyParts: ['face'] },
    { id: 'cheek-fat', label: 'Cheek Fat', relatedBodyParts: ['face'] },
    { id: 'sunken-upper-cheekbones', label: 'Sunken Upper Cheekbones', relatedBodyParts: ['face'] },
    { id: 'hollow-cheeks', label: 'Hollow Cheeks', relatedBodyParts: ['face'] },
    { id: 'sagging-jawline', label: 'Sagging Jawline', relatedBodyParts: ['face'] },
    { id: 'forehead-volume-flat-forehead', label: ' Forehead Volume / Flat Forehead', relatedBodyParts: ['face'] },
  ],
  'body': [
    { id: 'body-contour-refinement', label: 'Body Contour Refinement', relatedBodyParts: ['body'] },
    { id: 'body-firmness', label: 'Body Firmness / Skin Elasticity', relatedBodyParts: ['body'] },
    { id: 'leg-shape-refinement', label: 'Leg Shape Refinement', relatedBodyParts: ['body'] },
    { id: 'body-muscle-toning', label: 'Body Muscle Toning', relatedBodyParts: ['body'] },
    { id: 'sagging-buttocks', label: 'Sagging / Sunken Buttocks', relatedBodyParts: ['body'] },
    { id: 'hair-removal', label: 'Hair Removal', relatedBodyParts: ['body'] },
    { id: 'belly-arm-fat', label: 'Belly Fat / Arm Fat', relatedBodyParts: ['body'] }
  ],
  'hair': [
    { id: 'hair-loss', label: 'Hair Loss', relatedBodyParts: ['hair'] },
    { id: 'hairline-wide-forehead', label: 'Receding Hairline / Wide Forehead', relatedBodyParts: ['hair'] },
    { id: 'faint-eyebrows', label: 'Faint Eyebrows', relatedBodyParts: ['hair'] },
    { id: 'thin-hair-strands', label: 'Thin Hair Strands', relatedBodyParts: ['hair'] }
  ],

};

export const budgetOptions: BudgetOption[] = [
  { id: 'budget-50', label: '₩500,000', value: 50 },
  { id: 'budget-100', label: '₩1,000,000', value: 100 },
  { id: 'budget-300', label: '₩3,000,000', value: 300 },
  { id: 'budget-custom', label: 'Custom Input', value: 0 }
];

export const frequencyOptions: FrequencyOption[] = [
  { id: 'freq-1', label: 'Once', value: 'Once' },
  { id: 'freq-3', label: '3 Times', value: '3 Times' },
  { id: 'freq-5', label: '5 Times', value: '5 Times' },
  { id: 'freq-undecided', label: 'Undecided', value: 'Undecided' }
];
