# 문진표 테이블 구성
create table consultation_submissions (
  id_uuid uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form_version int not null default 1,        -- 폼 버전이 바뀔 수 있으니 최소한의 버전 필드

  -- type7: 개인정보 (전부 문자열)
  private_first_name text,
  private_last_name  text,
  private_email      text,
  private_age_range  text,    -- 예: "18-24", "25-34" 등 자유 텍스트로 단순화
  private_gender     text,    -- 예: "female", "male", "nonbinary", "prefer_not_to_say"

  -- type1: 단일 선택
  skin_types       text,      -- 예: "dry" / "oily" / "combination" / "sensitive"
  budget_ranges    text,      -- 예: "$0-100", "$100-300" 등

  -- type3: 다중선택 + other 텍스트 추가 가능
  skin_concerns           text[],  -- 예: ['acne','wrinkles']
  skin_concerns_other     text,    -- 사용자가 직접 입력한 free text
  treatment_areas         text[],  -- 예: ['face','neck']
  treatment_areas_other   text,
  medical_conditions      text[],  -- 예: ['eczema','rosacea']
  medical_conditions_other text,

  -- type6: 우선순위 드래그&드랍 (순서 보존용 배열)
  priorities        text[],  -- 예: ['safety','natural_result','budget'] (배열의 순서 = 우선순위)

  -- type2: 다중 선택
  treatment_goals   text[],  -- 예: ['acne_control','whitening']
  past_treatments   text[],  -- 예: ['botox','laser']

  -- type4: 텍스트 에어리어
  past_treatments_side_effect_desc text,
  anything_else                   text,

  -- type5: 단일 선택 + other (둘 중 하나만 선택)
  visit_path           text,  -- 예: 'instagram', 'friend', 'search' 등
  visit_path_other     text,  -- other 선택 시에만 값 존재

  -- 이미지: 다건 업로드 → 경로 배열
  image_paths          text[]  -- 예: ['consultation_photos/{submission_uuid}/raw/1734384392_front.jpg', ...]
);

-- 가볍게 쓰는 인덱스(조회/통계 편의)
create index on consultation_submissions (created_at desc);
create index on consultation_submissions (private_email);
create index on consultation_submissions using gin (skin_concerns);
create index on consultation_submissions using gin (treatment_areas);
create index on consultation_submissions using gin (medical_conditions);
create index on consultation_submissions using gin (treatment_goals);
create index on consultation_submissions using gin (past_treatments);
create index on consultation_submissions using gin (priorities);