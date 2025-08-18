import PrivateInfoStep from "../estimate/SkinSurveyFlow/questionnaire/PrivateInfoStep";
import BudgetPreferencesStep from "../estimate/SkinSurveyFlow/questionnaire/BudgetPreferencesStep";
import TreatmentGoalsStep from "../estimate/SkinSurveyFlow/questionnaire/TreatmentGoalsStep";
import VisitPathStep from "../estimate/SkinSurveyFlow/questionnaire/VisitPathStep";
import SkinConcernsStep from "../estimate/SkinSurveyFlow/questionnaire/SkinConcernsStep";
import HealthConditionStep from "../estimate/SkinSurveyFlow/questionnaire/HealthConditionStep";
import {
  FaInstagram,
  FaReddit,
  FaTiktok,
  FaYoutube,
  FaGoogle,
  FaComments
} from 'react-icons/fa';
// import { SiLemon8 } from 'react-icons/si';
import { BASIC_INFO, BUDGET_PREFERENCES, HEALTH_CONDITIONS, SKIN_CONCERNS, SKIN_TYPE, TREATMENT_GOALS, UPLOAD_PHOTO, VISIT_PATHS } from '@/constants/steps';
import UploadImageStep from "../estimate/SkinSurveyFlow/questionnaire/UploadImageStep";
import SkinTypeStep from "../estimate/SkinSurveyFlow/questionnaire/SkinTypeStep";

export const steps = [
    {
    id: SKIN_TYPE,
    title: "What's your skin type?",
    subtitle: "Help us understand your unique skin concerns and goals",
    component: SkinTypeStep,
  },
  {
    id: SKIN_CONCERNS,
    title: "Your Skin Story",
    subtitle: "Help us understand your unique skin concerns and goals",
    component: SkinConcernsStep,
  },
  {
    id: BUDGET_PREFERENCES,
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
    id: HEALTH_CONDITIONS,
    title: "Your Health Contition",
    subtitle: "Please indicate any relevant health conditions",
    component: HealthConditionStep,
  },
  {
    id: VISIT_PATHS,
    title: "How did you hear about us?",
    subtitle: "How did you hear about us?",
    component: VisitPathStep,
  },
  {
    id: BASIC_INFO,
    title: "Tell Us About You",
    subtitle: "Let's start with the basics to personalize your beauty journey",
    component: PrivateInfoStep,
  },
  {
    id: UPLOAD_PHOTO,
    title: "Please post a picure to diagnose your skin",
    subtitle: "Only png and jpg, jpeg files can be uploaded.",
    component: UploadImageStep,
  }
];


export const questions = {

  skinTypes: [
    {
      id: "dry",
      label: "Dry", // 건성
      description: "Often feels tight, may have flaky patches", // 당김이 있고 각질이 있을 수 있음
    },
    {
      id: "oily",
      label: "Oily", // 지성
      description: "Shiny appearance, enlarged pores", // 번들거림, 넓은 모공
    },
    {
      id: "combination",
      label: "Combination", // 복합성
      description: "Oily T-zone, dry cheeks", // T존은 지성, 볼은 건성
    },
    {
      id: "sensitive",
      label: "Sensitive", // 민감성
      description: "Easily irritated, reactive to products", // 쉽게 자극받고 제품에 민감함
    },
    {
      id: "normal",
      label: "Normal", // 정상
      description: "Well-balanced, rarely problematic", // 균형 잡힌 피부, 문제 적음
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
      label: "Under $1,000", // 1000달러 이하
      description: "Budget-friendly options", // 예산 친화적인 옵션
    },
    {
      id: "1000-5000",
      label: "$1,000 - $5,000", // 1,000 ~ 5,000달러
      description: "Mid-range treatments", // 중간 가격대 시술
    },
    {
      id: "5000-10000",
      label: "$5,000 - $10,000", // 5,000 ~ 10,000달러
      description: "Premium treatments", // 프리미엄 시술
    },
    {
      id: "10000-plus",
      label: "$10,000+", // 1만 달러 이상
      description: "Luxury treatments", // 고급 시술
    },
    {
      id: "no_limit",
      label: "No budget limit", // 예산 제한 없음
      description: "Luxury treatments", // 고급 시술
    },
    {
      id: "unsure",
      label: "Not sure yet", // 아직 모르겠음
      description: "Show me all options", // 모든 옵션 보기
    },
  ],

  treatmentAreas: [
    { id: "full-face", label: "Full Face", emoji: "👤" }, // 얼굴 전체
    { id: "forehead", label: "Forehead", emoji: "🧠" }, // 이마
    { id: "eye-area", label: "Eye Area", emoji: "👁️" }, // 눈가
    { id: "cheeks", label: "Cheeks", emoji: "😊" }, // 볼
    { id: "jawline", label: "Jawline & Chin", emoji: "🦷" }, // 턱선 & 턱
    { id: "neck", label: "Neck", emoji: "🦢" }, // 목
    { id: "body", label: "Body", emoji: "🦢" }, // 몸
    { id: "other", label: "Other", emoji: "🦢" }, // 기타
  ],

  priorities: [
    {
      id: "price",
      label: "Price", // 가격
      description: "Affordable cost is the top priority", // 합리적인 비용이 가장 중요함
    },
    {
      id: "effectiveness",
      label: "Effectiveness", // 효과
      description: "Visible and lasting results are most important", // 눈에 띄고 오래가는 결과가 가장 중요함
    },
    {
      id: "pain",
      label: "Pain Level", // 통증 수준
      description: "Minimizing discomfort during the procedure matters most", // 시술 중 불편함 최소화가 중요함
    },
    {
      id: "recoveryTime",
      label: "Recovery Time", // 회복 시간
      description: "Short or no downtime is preferred", // 짧은 또는 무회복 기간 선호
    },
    {
      id: "reviews",
      label: "Patient Reviews", // 환자 리뷰
      description: "Highly rated by other patients", // 다른 환자들로부터 높은 평가
    },
    {
      id: "location",
      label: "Clinic Location", // 병원 위치
      description: "Convenient access and proximity are key", // 접근성과 가까운 위치가 중요
    },
  ],

  treatmentGoals: [
    {
      id: "overall_refresh",
      label: "Overall Facial Refresh", // 얼굴 전체 리프레시
      description: "Restore a healthier, more vibrant look", // 건강하고 생기 있는 얼굴로 개선
      emoji: "💆‍♀️",
    },
    {
      id: "lifting_firmness",
      label: "Lifting & Firmness", // 탄력 & 리프팅
      description: "Improve elasticity and contour", // 탄력과 윤곽 개선
      emoji: "📈",
    },
    {
      id: "texture_tone",
      label: "Texture & Tone Improvement", // 피부결 & 톤 개선
      description: "Refine skin surface and balance tone", // 피부결 정돈, 톤 균형
      emoji: "🎨",
    },
    {
      id: "anti_aging",
      label: "Anti-Aging", // 안티에이징
      description: "Reduce wrinkles and achieve a youthful appearance", // 주름 개선 및 젊은 인상
      emoji: "⏳",
    },
    {
      id: "acne_pore",
      label: "Acne / Pore Control", // 여드름 / 모공관리
      description: "Treat breakouts and minimize pores", // 여드름 완화, 모공 축소
      emoji: "🧼",
    },
    {
      id: "recommendation",
      label: "I Want Recommendations", // 추천받고 싶어요
      description: "Help me find what suits me best", // 내게 맞는 시술 추천 요청
      emoji: "🤖",
    },
  ],

  // timeframes: [
  //   {
  //     id: "asap",
  //     label: "As soon as possible", // 가능한 빨리
  //     description: "Ready to start immediately", // 즉시 시작 가능
  //   },
  //   {
  //     id: "1-week",
  //     label: "Within 1 week", // 1주 이내
  //     description: "Planning ahead", // 미리 계획 중
  //   },
  //   {
  //     id: "2-week",
  //     label: "Within 2 week", // 2주 이내
  //     description: "Planning ahead", // 미리 계획 중
  //   },
  //   {
  //     id: "1-month",
  //     label: "Within 1 month", // 1개월 이내
  //     description: "Planning ahead", // 미리 계획 중
  //   },
  //   {
  //     id: "2-months",
  //     label: "Within 2 months", // 2개월 이내
  //     description: "Planning ahead", // 미리 계획 중
  //   },
  //   {
  //     id: "3-months",
  //     label: "Within 3 months", // 3개월 이내
  //     description: "Preparing for an event", // 이벤트를 위한 준비
  //   },
  //   {
  //     id: "not_sure_yet",
  //     label: "Not Sure Yet", // 아직 확실치 않음
  //     description: "Not Sure Yet", // 아직 확실치 않음
  //   },
  // ],


// botox within 4 months  4달이내에 받은적이 있는가 
// filler within 2 weeks 2이내에 받은적이 있는가 
// laser within 2 weeks 2이내에 받은적이 있는가 
// skin booster within 2이내에 받은적이 있는가 
// steam cell  선택지 3개   1달미만, 1-6개월  ,  6개월이상 
// lifting    선택지 3개   1달미만, 1-6개월  ,  6개월이상 
// chemical peel 1달이내에 받은적이 있는가 
// microneedling 2이내에 받은적이 있는가 
// professional facials 

// 요거 아래에  선택받았던 시술들에 대해서 부작용을 겪은적이 있는지 직접 기술 하도록 함  input박스 추가 
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
        label: "Stem Cell (1–6 months)",
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
      label: 'Blood Clotting Disorder', // 혈액 응고 장애
      description: 'Conditions affecting normal blood clotting', // 정상적인 혈액응고에 영향을 미치는 질환
      emoji: '🩸'
    },
    {
      id: 'pregnant',
      label: 'Pregnant', // 임신 중
      description: 'Currently pregnant or planning pregnancy', // 현재 또는 계획 중인 임신
      emoji: '🤰'
    },
    {
      id: 'skin_allergy',
      label: 'Skin Allergy History', // 피부 알레르기 병력
      description: 'History of allergic skin reactions', // 알레르기 피부 반응 병력
      emoji: '🌿'
    },
    {
      id: 'immunosuppressants',
      label: 'On Immunosuppressants', // 면역억제 치료 중
      description: 'Taking immune system suppressant medications', // 면역억제 약 복용 중
      emoji: '💊'
    },
    {
      id: 'skin_condition',
      label: 'Chronic Skin Condition', // 피부 질환
      description: 'Existing dermatologic conditions (e.g. eczema, psoriasis)', // 피부 질환 (예: 아토피, 건선)
      emoji: '🧴'
    },
    {
      id: 'antibiotics_or_steroids',
      label: 'Taking Antibiotics or Steroids', // 항생제/스테로이드 복용 중
      description: 'Currently on antibiotics or steroid medications', // 현재 복용 중인 항생제 또는 스테로이드
      emoji: '💉'
    },
    {
      id: 'none',
      label: 'None', // 없음
      description: 'None of the above apply', // 해당 없음
      emoji: '✅'
    },
    {
      id: 'other',
      label: 'Other', // 기타
      description: 'Other (Free Input)', // 기타
      emoji: '🤖'
    }
  ],

  skinConcerns: [
    { id: "acne", label: "Acne & Breakouts", 
      subOptions: [
        { id: "inflammatory-acne", label: "Inflammatory Acne" }, // 염증성 여드름
        { id: "whiteheads-small-bumps", label: "Whiteheads / Small Bumps" }, // 화이트헤드 / 좁쌀여드름
      ] 
    },  // 여드름
    { id: "pores", label: "Enlarged Pores or Texture", 
      subOptions: []}, // 모공
    { id: "redness", label: "Redness & Sensitive Skin", subOptions: []}, //  홍조 및 민감성 피부
    { id: "uneven_tone", label: "Uneven Skin Tone", subOptions: [] }, // 피부 톤 불균형
    { id: "sagging", label: "Sagging", subOptions: [] }, // 피부 처짐 = 탄력고민
    { id: "elasticity", label: "Elasticity", subOptions: [] },
    { id: "doublie_chin", label: "Double Chin", subOptions: [] },
    { id: "volumizing", label: "Volumizing", subOptions: [] },
    { id: "wrinkles", label: "Wrinkles", subOptions: [] }, // 잔주름
    { id: "dryness_glow", label: "Dryness & Glow", subOptions: [] }, // 건조함
    { id: "pigmentation", label: "Pigmentation" ,
      subOptions: [
        { id: "freckles", label: "Freckles" }, // 주근깨
        { id: "sun-damage", label: "Sun Damage" }, // 햇빛 반점
        { id: "moles", label: "Moles" }, // 점
        { id: "melasma", label: "Melasma" }, // 기미
        { id: "lentigo", label: "Lentigo" }, 
        { id: "not_sure", label: "Not Sure" }, 
      ]
    }, // 색소침착 및 기미
    { id: "scars", label: "Scars", 
      subOptions: [
        { id: "red", label: "Red" }, 
        { id: "brown", label: "Brown" }, 
        { id: "rough", label: "Rough" }, 
      ] 
    }, // 흉터
    { id: "filler", label: "Filler", 
      subOptions: [
        { id: "forehead", label: "Forehead" },
        { id: "jawline", label: "Jawline" },
        { id: "cheeks", label: "Cheeks" },
        { id: "under_eyes", label: "Under eyes" },
        { id: "body", label: "Body" }, 
      ] 
    }, 
    { id: "other", label: "Other (Free Input)", subOptions: [] }, // 기타 (자유입력)
  ],

  // skinConcernSubOptions: {
  //   acne: [
  //     "Inflammatory Acne", // 염증성 여드름
  //     "Whiteheads / Small Bumps", // 화이트헤드 / 좁쌀여드름
  //     "Acne Scars / Pigmentation", // 여드름 흉터 / 색소침착
  //   ],
  //   pores: ["Around Nose", "Cheeks / Jawline"], // 코 주변 / 볼, 턱선
  //   redness: ["Sensitive Skin", "Visible Blood Vessels"], // 민감성 피부 / 실핏줄
  //   pigmentation: ["Melasma", "Freckles", "Sun Spots"], // 기미 / 주근깨 / 햇빛 반점
  // },

  visitPaths: [
    { id: 'instagram', label: 'Instagram', description: 'Instagram', icon: FaInstagram }, // 인스타그램
    { id: 'lemon8', label: 'Lemon8', description: 'Lemon8', icon: FaComments }, // 레몬8
    { id: 'reddit', label: 'Reddit', description: 'Reddit', icon: FaReddit }, // 레딧
    { id: 'tiktok', label: 'TikTok', description: 'TikTok', icon: FaTiktok }, // 틱톡
    { id: 'youtube', label: 'YouTube', description: 'YouTube', icon: FaYoutube }, // 유튜브
    { id: 'google_search', label: 'Google Search', description: 'Google_search', icon: FaGoogle }, // 구글 검색
    { id: 'Chat_Ai', label: 'Chat AI', description: 'ChatGpt, Claude, Gemini, Perplexity, etc', icon: FaComments }, // 챗봇 AI (ChatGPT 등)
    { id: 'other', label: 'Other', description: 'Other', icon: FaComments }, // 기타
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
