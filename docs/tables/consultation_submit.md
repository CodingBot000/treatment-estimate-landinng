
# 목적

PreviewModal에서 Submit을 누를 때, 최종 formData를 아래 DB 컬럼 매핑에 맞춰 값 자체(텍스트)로 저장한다.

이미지 파일은 클라이언트 컴포넌트에서 Supabase Storage(버킷: consultation_photos)에 업로드하고, 서버 API에는 image_paths(경로 배열)만 전달한다.


아래 모두 인덱스로 저장하지말고 value자체(텍스트)를 저장해줘

아래처럼 기존 database 컬럼명에 해당하는 데이터를 넣을거야

왼쪽은 테이블 컬럼 이름이고 오른쪽은 해당 컬럼에 넣을 데이터들이야 

private_first_name text,    -> interface UserInfo 의 firstName 
  private_last_name  text,  -> interface UserInfo 의 lastName 
  private_email      text,  -> interface UserInfo 의 email  
  private_age_range  text,   -> interface UserInfo 의 ageRange 
  private_gender     text,   -> interface UserInfo 의 gender  

  -- type1: 단일 선택
  skin_types       text,     -> interface StepData 의 skinType
  budget_ranges    text,     -> interface StepData 의 budget

  -- type3: 다중선택 + other 텍스트 추가 가능
  skin_concerns           text[],  -> interface StepData 의 skinConcerns
  skin_concerns_other     text,    -> interface StepData 의 skinConcerns?.moreConcerns
  treatment_areas         text[],  -> interface StepData의 treatmentAreas
  treatment_areas_other   text,   -> interface StepData 의 treatmentAreas.otherAreas
  medical_conditions      text[],  -- 예: ['eczema','rosacea']
  medical_conditions_other text,

  -- type6: 우선순위 드래그&드랍 (순서 보존용 배열)
  priorities        text[],  -> interface StepData 의 priorityOrder

  -- type2: 다중 선택
  treatment_goals   text[],  -> interface StepData 의 goals
  past_treatments   text[],  -> interface StepData 의 pastTreatments.pastTreatments

  -- type4: 텍스트 에어리어
  past_treatments_side_effect_desc text, -> interface StepData 의 pastTreatments.sideEffects
  anything_else                   text, -> interface StepData 의 pastTreatments.additionalNotes

  -- type5: 단일 선택 + other (둘 중 하나만 선택)
  visit_path           text,  -- interface StepData의 visitPath.visitPath
  visit_path_other     text,  -- interface StepData의 visitPath.otherPath

  -- 이미지: 다건 업로드 → 경로 배열
  image_paths          text[]  -- >interface StepData의  uploadImage.imageFileName 이 있는데 이걸 'consultation_photos/{id_uuid}/raw/{uploadImage.imageFileName}' 이렇게 전체 패스로 만들어서 넣어줘



# 매핑 주의(명칭 불일치 보정)

skin_concerns_other ← skinConcerns?.moreConcerns
treatment_areas_other ← treatmentAreas.otherAreas (프로젝트 내부에선 treatmentAreasOther로 들고 있어도, submit 시 매핑에서 보정)

#업로드/저장 흐름

클라이언트 컴포넌트 (PreviewModal → Submit 클릭)
Supabase Storage(버킷 consultation_photos)로 이미지 업로드

업로드 경로: consultation_photos/{id_uuid}/raw/{fileName}

업로드 완료 후, 생성된 경로 배열(image_paths) 을 API payload에 포함

#API 라우트 (App Router – /api/consultation/submit)

요청 본문(JSON) 수신 → DB Insert

모든 선택값은 텍스트 값 자체(배열은 text[])로 저장 (인덱스 저장 금지)


# 스토리지 규칙
uploadImage에는 
  uploadedImage?: string; // base64 이미지 데이터
  imageFile?: File; // 실제 파일 객체
가 있어

이걸 image_paths 에 해당하는 패스를 만들어서 넣어줘 
Supabase Storage는 폴더 개념이 경로 문자열로만 존재. 사전 폴더 생성 단계 불필요.

from(bucket).upload('user-uuid/raw/file.png', fileBlob) 호출 시 경로가 자동 생성됨.

버킷: consultation_photos (private 권장. 외부 접근 시 signed URL 사용)

이미지파일은 서버컴포넌트에서 전달하면 용량 제한 걸리지?
맞다면 클라이언트컴포넌트에서 넣도록해줘# 