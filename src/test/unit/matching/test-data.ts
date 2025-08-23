/**
 * Test Data for Matching Algorithm
 * 
 * Extracted questions data from form-definition.ts to avoid React component imports
 */

// Extracted from src/app/data/form-definition.ts
export const questionsData = {
  skinTypes: [
    {
      id: "dry",
      label: "Dry",
      description: "Often feels tight, may have flaky patches",
    },
    {
      id: "oily",
      label: "Oily",
      description: "Shiny appearance, enlarged pores",
    },
    {
      id: "combination",
      label: "Combination",
      description: "Oily T-zone, dry cheeks",
    },
    {
      id: "sensitive",
      label: "Sensitive",
      description: "Easily irritated, reactive to products",
    },
    {
      id: "normal",
      label: "Normal",
      description: "Well-balanced, rarely problematic",
    },
    {
      id: "not_sure",
      label: "Not Sure",
      description: "Not Sure",
    },
  ],

  budgetRanges: [
    {
      id: "under-1000",
      label: "Under $1,000",
      description: "Budget-friendly options",
    },
    {
      id: "1000-5000",
      label: "$1,000 - $5,000",
      description: "Mid-range treatments",
    },
    {
      id: "5000-10000",
      label: "$5,000 - $10,000",
      description: "Premium treatments",
    },
    {
      id: "10000-plus",
      label: "$10,000+",
      description: "Luxury treatments",
    },
    {
      id: "no_limit",
      label: "No budget limit",
      description: "Luxury treatments",
    },
    {
      id: "unsure",
      label: "Not sure yet",
      description: "Show me all options",
    },
  ],

  treatmentAreas: [
    { id: "full-face", label: "Full Face", emoji: "👤" },
    { id: "forehead", label: "Forehead", emoji: "🧠" },
    { id: "eye-area", label: "Eye Area", emoji: "👁️" },
    { id: "cheeks", label: "Cheeks", emoji: "😊" },
    { id: "jawline", label: "Jawline & Chin", emoji: "🦷" },
    { id: "neck", label: "Neck", emoji: "🦢" },
    { id: "body", label: "Body", emoji: "🦢" },
    { id: "other", label: "Other", emoji: "🦢" },
  ],

  priorities: [
    {
      id: "price",
      label: "Price",
      description: "Affordable cost is the top priority",
    },
    {
      id: "effectiveness",
      label: "Effectiveness",
      description: "Visible and lasting results are most important",
    },
    {
      id: "pain",
      label: "Pain Level",
      description: "Minimizing discomfort during the procedure matters most",
    },
    {
      id: "recoveryTime",
      label: "Recovery Time",
      description: "Short or no downtime is preferred",
    },
    {
      id: "reviews",
      label: "Patient Reviews",
      description: "Highly rated by other patients",
    },
    {
      id: "location",
      label: "Clinic Location",
      description: "Convenient access and proximity are key",
    },
  ],

  treatmentGoals: [
    {
      id: "overall_refresh",
      label: "Overall Facial Refresh",
      description: "Restore a healthier, more vibrant look",
      emoji: "💆‍♀️",
    },
    {
      id: "lifting_firmness",
      label: "Lifting & Firmness",
      description: "Improve elasticity and contour",
      emoji: "📈",
    },
    {
      id: "texture_tone",
      label: "Texture & Tone Improvement",
      description: "Refine skin surface and balance tone",
      emoji: "🎨",
    },
    {
      id: "anti_aging",
      label: "Anti-Aging",
      description: "Reduce wrinkles and achieve a youthful appearance",
      emoji: "⏳",
    },
    {
      id: "acne_pore",
      label: "Acne / Pore Control",
      description: "Treat breakouts and minimize pores",
      emoji: "🧼",
    },
    {
      id: "recommendation",
      label: "I Want Recommendations",
      description: "Help me find what suits me best",
      emoji: "🤖",
    },
  ],

  pastTreatments: [
    {
      id: "botox_4m",
      label: "Botox",
      description: "Select if you have had a treatment within the past 4 months",
    },
    {
      id: "filler_2w",
      label: "Filler",
      description: "Select if you have had a treatment within the past 2 weeks",
    },
    {
      id: "laser_2w",
      label: "Laser",
      description: "Select if you have had a treatment within the past 2 weeks",
    },
    {
      id: "skinbooster_2w",
      label: "Skin Booster",
      description: "Select if you have had a treatment within the past 2 weeks",
    },
    {
      id: "stemcell_1m",
      label: "Stem Cell (1 month)",
      description: "Select if you have had a treatment within the past 1 month",
    },
    {
      id: "stemcell_1_6m",
      label: "Stem Cell (1-6 months)",
      description: "Select if you have had a treatment within the past 1–6 months",
    },
    {
      id: "stemcell_6m_plus",
      label: "Stem Cell (6+ months)",
      description: "Select if you have had a treatment more than 6 months ago",
    },
    {
      id: "none",
      label: "No Previous Treatments",
      description: "Select if you have not had any previous treatments",
    },
  ],

  medicalConditions: [
    {
      id: 'blood_clotting',
      label: 'Blood Clotting Disorder',
      description: 'Conditions affecting normal blood clotting',
      emoji: '🩸'
    },
    {
      id: 'pregnant',
      label: 'Pregnant',
      description: 'Currently pregnant or planning pregnancy',
      emoji: '🤰'
    },
    {
      id: 'skin_allergy',
      label: 'Skin Allergy History',
      description: 'History of allergic skin reactions',
      emoji: '🌿'
    },
    {
      id: 'immunosuppressants',
      label: 'On Immunosuppressants',
      description: 'Taking immune system suppressant medications',
      emoji: '💊'
    },
    {
      id: 'skin_condition',
      label: 'Chronic Skin Condition',
      description: 'Existing dermatologic conditions (e.g. eczema, psoriasis)',
      emoji: '🧴'
    },
    {
      id: 'antibiotics_or_steroids',
      label: 'Taking Antibiotics or Steroids',
      description: 'Currently on antibiotics or steroid medications',
      emoji: '💉'
    },
    {
      id: 'none',
      label: 'None',
      description: 'None of the above apply',
      emoji: '✅'
    },
    {
      id: 'other',
      label: 'Other',
      description: 'Other (Free Input)',
      emoji: '🤖'
    }
  ],

  skinConcerns: [
    // Acne
    {
      id: "acne-inflammatory",
      label: "Acne & Breakouts - Inflammatory Acne",
      description: "Red, swollen, painful pimples with inflammation.",
    },
    {
      id: "acne-whiteheads",
      label: "Acne & Breakouts - Whiteheads / Small Bumps",
      description: "Clogged pores that appear as white or flesh-colored bumps.",
    },

    // Pores
    {
      id: "pores",
      label: "Enlarged Pores or Rough Texture",
    },

    // Redness
    {
      id: "redness",
      label: "Redness & Sensitive Skin",
    },

    // Uneven Tone
    {
      id: "uneven_tone",
      label: "Uneven Skin Tone",
    },

    // Sagging
    {
      id: "sagging",
      label: "Sagging (Loss of Firmness)",
    },

    // Elasticity
    {
      id: "elasticity",
      label: "Reduced Elasticity",
    },

    // Double Chin
    {
      id: "double_chin",
      label: "Double Chin",
    },

    // Volumizing
    {
      id: "volumizing",
      label: "Volume Loss",
    },

    // Wrinkles
    {
      id: "wrinkles",
      label: "Wrinkles / Fine Lines",
    },

    // Dryness
    {
      id: "dryness_glow",
      label: "Dryness & Lack of Glow",
    },

    // Pigmentation
    {
      id: "pigmentation-freckles",
      label: "Pigmentation - Freckles",
    },
    {
      id: "pigmentation-sun-damage",
      label: "Pigmentation - Sun Damage",
      description: "Dark spots caused by UV exposure.",
    },
    {
      id: "pigmentation-moles",
      label: "Pigmentation - Moles",
    },
    {
      id: "pigmentation-melasma",
      label: "Pigmentation - Melasma",
      description: "Brown or gray patches often seen on cheeks and forehead.",
    },
    {
      id: "pigmentation-lentigo",
      label: "Pigmentation - Lentigo",
    },
    {
      id: "pigmentation-not-sure",
      label: "Pigmentation - Not Sure",
    },

    // Scars
    {
      id: "scar-red",
      label: "Scars - Red",
    },
    {
      id: "scar-brown",
      label: "Scars - Brown",
    },
    {
      id: "scar-rough",
      label: "Scars - Rough / Uneven",
    },

    // Filler
    {
      id: "filler-forehead",
      label: "Filler - Forehead",
    },
    {
      id: "filler-jawline",
      label: "Filler - Jawline",
    },
    {
      id: "filler-cheeks",
      label: "Filler - Cheeks",
    },
    {
      id: "filler-under-eyes",
      label: "Filler - Under Eyes",
    },
    {
      id: "filler-body",
      label: "Filler - Body",
    },

    // Other
    {
      id: "other",
      label: "Other (Free Input)",
      description: "Write your own concern if not listed above.",
    },
  ]
};