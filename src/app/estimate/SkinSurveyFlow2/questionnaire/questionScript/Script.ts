import PrivateInfoStep from "../PrivateInfoStep";
import BudgetPreferencesStep from "../BudgetPreferencesStep";
import TreatmentGoalsStep from "../TreatmentGoalsStep";
import VisitPathStep from "../VisitPathStep";
import SkinConcernsStep from "../SkinConcernsStep";
import HealthConditionStep from "../HealthConditionStep";
import {
  FaInstagram,
  FaReddit,
  FaTiktok,
  FaYoutube,
  FaGoogle,
  FaComments
} from 'react-icons/fa';
// import { SiLemon8 } from 'react-icons/si';

export const steps = [
  {
    id: "skin-concerns",
    title: "Your Skin Story",
    subtitle: "Help us understand your unique skin concerns and goals",
    component: SkinConcernsStep,
  },
  {
    id: "budget-preferences",
    title: "Investment & Preferences",
    subtitle: "Let's find treatments that fit your lifestyle and budget",
    component: BudgetPreferencesStep,
  },
  {
    id: "treatment-goals",
    title: "Your Beauty Vision",
    subtitle: "What transformation are you hoping to achieve?",
    component: TreatmentGoalsStep,
  },
  {
    id: "health-condition",
    title: "Your Health Contition",
    subtitle: "Please indicate any relevant health conditions",
    component: HealthConditionStep,
  },
  {
    id: "visitPaths",
    title: "How did you hear about us?",
    subtitle: "How did you hear about us?",
    component: VisitPathStep,
  },
  {
    id: "basic-info",
    title: "Tell Us About You",
    subtitle: "Let's start with the basics to personalize your beauty journey",
    component: PrivateInfoStep,
  },
];

export const questions = {
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
    { id: "10000-plus", label: "$10,000+", description: "Luxury treatments" },
    {
      id: "no_limit",
      label: "No budget limit",
      description: "Luxury treatments",
    },
    { id: "unsure", label: "Not sure yet", description: "Show me all options" },
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
      id: "downtime",
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

  timeframes: [
    {
      id: "asap",
      label: "As soon as possible",
      description: "Ready to start immediately",
    },
    { id: "1-week", label: "Within 1 week", description: "Planning ahead" },
    { id: "2-week", label: "Within 2 week", description: "Planning ahead" },
    { id: "1-month", label: "Within 1 month", description: "Planning ahead" },
    { id: "2-months", label: "Within 2 months", description: "Planning ahead" },
    {
      id: "3-months",
      label: "Within 3 months",
      description: "Preparing for an event",
    },
    { id: "not_sure_yet", label: "Not Sure Yet", description: "Not Sure Yet" },
  ],

  pastTreatments: [
    { id: "botox", label: "Botox/Dysport" },
    { id: "fillers", label: "Dermal Fillers" },
    { id: "laser", label: "Laser Treatments(IPL, Fraxel etc" },
    { id: "skin_booster", label: "Skin Booster" },
    { id: "lifting", label: "Lifting (Ultherapy, Shrinking etc)" },
    { id: "chemical-peel", label: "Chemical Peels" },
    { id: "microneedling", label: "Microneedling" },
    { id: "facials", label: "Professional Facials" },
    { id: "other", label: "Ohter" },
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
    }
  ],
  skinConcerns: [
    { id: "acne", label: "Acne & Breakouts" },
    { id: "pores", label: "Enlarged Pores" },
    { id: "uneven_tone", label: "Uneven Skin Tone" },
    { id: "fine_wrinkles", label: "Fine Wrinkles" },
    { id: "sagging", label: "Sagging Skin" },
    { id: "redness", label: "Redness & Sensitive Skin" },
    { id: "dryness", label: "Dryness" },
    { id: "pigmentation", label: "Pigmentation & Dark Spots" },
    { id: "scars", label: "Scars" },
    { id: "other", label: "Other (Free Input)" },
  ],
  

  skinConcernSubOptions: {
    acne: [
      "Inflammatory Acne",
      "Whiteheads / Small Bumps",
      "Acne Scars / Pigmentation",
    ],
    pores: ["Around Nose", "Cheeks / Jawline"],
    redness: ["Sensitive Skin", "Visible Blood Vessels"],
    pigmentation: ["Melasma", "Freckles", "Sun Spots"],
  } as Record<string, string[]>,



  visitPaths: [
    { id: 'instagram', label: 'Instagram', description: 'Instagram', icon: FaInstagram },
    { id: 'lemon8', label: 'Lemon8', description: 'Lemon8', icon: FaComments },
    { id: 'reddit', label: 'Reddit', description: 'Reddit', icon: FaReddit },
    { id: 'tiktok', label: 'TikTok', description: 'TikTok', icon: FaTiktok },
    { id: 'youtube', label: 'YouTube', description: 'YouTube', icon: FaYoutube },
    { id: 'google_search', label: 'Google Search', description: 'Google_search', icon: FaGoogle },
    { id: 'Chat_Ai', label: 'Chat AI', description: 'ChatGpt, Claude, Gemini, Perplexity, etc', icon: FaComments },
    { id: 'other', label: 'Other', description: 'Other', icon: FaComments },
  
  ],
};

// const skinConcerns = [
//   { id: 'acne', label: 'Acne & Breakouts', emoji: '🔴' },
//   { id: 'aging', label: 'Fine Lines & Wrinkles', emoji: '⏰' },
//   { id: 'pigmentation', label: 'Dark Spots & Pigmentation', emoji: '🟤' },
//   { id: 'redness', label: 'Redness & Rosacea', emoji: '🌹' },
//   { id: 'texture', label: 'Uneven Texture', emoji: '🏔️' },
//   { id: 'pores', label: 'Large Pores', emoji: '🕳️' },
//   { id: 'dullness', label: 'Dullness & Lack of Glow', emoji: '💫' },
//   { id: 'sagging', label: 'Sagging & Loss of Firmness', emoji: '📉' }
// ];

// "id": "skin_concerns",
// "description": "What skin concerns do you currently have? (중복 선택 가능)",
// "multiple": true,
// "options":

// {
//     "sections": [
//       {
//         "id": "basic_info",
//         "title": "기본 정보",
//         "description": "정확한 컨설팅을 위해 필요한 정보에요",
//         "fields": [
//           {
//             "field": "이름 / Name",
//             "type": "text"
//           },
//           {
//             "field": "국적 / Country of Residence",
//             "type": "text"
//           },
//           {
//             "field": "나이 / Age",
//             "type": "number"
//           },
//           {
//             "field": "성별 / Gender",
//             "type": "select"
//           },
//           {
//             "field": "직업 / Occupation (선택, 라이프스타일 파악용)",
//             "type": "text",
//             "optional": true
//           }
//         ]
//       },
//       {
//         "id": "age_group",
//         "title": "나이",
//         "description": "나이대에 따라 맞는 시술이 달라요",
//         "options": [
//           "10대",
//           "20대",
//           "30대",
//           "40대",
//           "50대",
//           "60대이상"
//         ]
//       },
//       {
//         "id": "skin_type",
//         "title": "피부상태",
//         "description": "당신의 피부 타입은 어떤가요? / What is your skin type?",
//         "options": [
//           "지성 / Oily",
//           "건성 / Dry",
//           "복합성 / Combination",
//           "민감성 / Sensitive",
//           "잘 모르겠음 / Not sure"
//         ]
//       },
//       {
//         "id": "skin_concerns",
//         "title": "🧖 피부 상태 및 고민",
//         "description": "가장 걱정되는 피부 문제를 선택해주세요 / What skin concerns do you currently have? (중복 선택 가능)",
//         "multiple": true,
//         "options": [
//           {
//             "option": "여드름 / Acne",
//             "sub_options": [
//               "염증성 여드름",
//               "좁쌀 여드름",
//               "여드름 흉터/착색"
//             ]
//           },
//           {
//             "option": "넓은 모공 / Enlarged Pores",
//             "sub_options": [
//               "콧볼/코 주변",
//               "볼/턱"
//             ]
//           },
//           {
//             "option": "피부톤 불균형 / Uneven skin tone"
//           },
//           {
//             "option": "잔주름 / Fine wrinkles"
//           },
//           {
//             "option": "탄력 저하 / Sagging skin"
//           },
//           {
//             "option": "홍조 / Redness",
//             "sub_options": [
//               "민감성 피부",
//               "혈관 확장"
//             ]
//           },
//           {
//             "option": "건조함 / Dryness"
//           },
//           {
//             "option": "색소침착 / Pigmentation",
//             "sub_options": [
//               "기미",
//               "주근깨",
//               "햇빛 잡티"
//             ]
//           },
//           {
//             "option": "흉터"
//           },
//           {
//             "option": "기타 (자유입력)",
//             "type": "text_input"
//           }
//         ]
//       },
//       {
//         "id": "budget",
//         "title": "💰 예산 관련",
//         "description": "이번 시술에 사용할 수 있는 예산 범위는? / What is your available budget for this treatment?",
//         "options": [
//           "$300 이하 / Under $300",
//           "$300 ~ $800",
//           "$800 ~ $1500",
//           "$1500 이상 / Over $1500"
//         ]
//       },
//       {
//         "id": "recent_treatments",
//         "title": "최근받은 시술",
//         "description": "최근 6개월 내 어떤 시술을 받으셨나요? / Have you received any treatments in the past 6 months? (중복 선택 가능)",
//         "multiple": true,
//         "options": [
//           "보톡스 / Botox",
//           "필러 / Filler",
//           "레이저 (IPL, Fraxel 등)",
//           "스킨부스터 / Skin booster",
//           "리프팅 (울쎄라, 슈링크 등)",
//           "메디컬 스킨케어",
//           "시술 받은 적 없음",
//           "기타"
//         ]
//       },
//       {
//         "id": "treatment_schedule",
//         "title": "⏱️ 시술 희망 일정",
//         "description": "언제쯤 시술을 받고 싶으신가요? / When are you planning to get the treatment?",
//         "options": [
//           "1주 이내 / Within 1 week",
//           "2주 이내 / Within 2 weeks",
//           "1개월 이내 / Within 1 month",
//           "아직 미정 / Not sure yet"
//         ]
//       },
//       {
//         "id": "treatment_goals",
//         "title": "🎯 시술 목표",
//         "description": "가장 원하는 시술 결과는 무엇인가요? / What result are you hoping to achieve?",
//         "options": [
//           "얼굴 전체 리프레시 / Overall facial refresh",
//           "탄력 & 리프팅 / Lifting & firmness",
//           "피부결 & 톤 개선 / Texture & tone improvement",
//           "동안 효과 / Anti-aging",
//           "트러블 개선 / Acne/pore control",
//           "시술 추천받고 싶어요 / I want recommendations"
//         ]
//       },
//       {
//         "id": "health_conditions",
//         "title": "🩺 건강 상태 관련 (의료적 필터링용)",
//         "description": "현재 건강 상태에 대해 알려주세요 / Please indicate any relevant health conditions:",
//         "multiple": true,
//         "options": [
//           "혈액응고 장애 / Blood clotting disorder",
//           "임신 중 / Pregnant",
//           "피부 알레르기 병력 / Skin allergy",
//           "면역억제 치료 중 / On immunosuppressants",
//           "피부 질환",
//           "항상제/ 스테로이드 복용 중",
//           "없음 / None"
//         ]
//       },
//       {
//         "id": "treatment_areas",
//         "title": "🧭 시술 희망 부위",
//         "description": "어떤 부위의 시술을 원하시나요? / Which area would you like to treat? (중복 선택 가능)",
//         "multiple": true,
//         "options": [
//           "얼굴 전체 / Full face",
//           "이마 / Forehead",
//           "눈가 / Around eyes",
//           "볼 / Cheeks",
//           "턱선 / Jawline",
//           "목 / Neck",
//           "바디 / Body",
//           "아직 결정하지 않음 / Not decided yet"
//         ]
//       },
//       {
//         "id": "priority_factors",
//         "title": "피부과 시술을 받을 때 가장 중요한 요소는 무엇인가요?",
//         "description": "중요도에 따라 추천 우선순위가 조정되요",
//         "options": [
//           "가격",
//           "시술 효과",
//           "통증 여부",
//           "회복 기간",
//           "시술 후기",
//           "병원 위치"
//         ]
//       }
//     ]
//   }
