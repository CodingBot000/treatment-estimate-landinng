import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 서버에서는 service role key 사용
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 데이터 매핑
    const submissionData = {
      form_version: 1,
      
      // Private Info
      private_first_name: data.privateInfo?.firstName || null,
      private_last_name: data.privateInfo?.lastName || null,
      private_email: data.privateInfo?.email || null,
      private_age_range: data.privateInfo?.ageRange || null,
      private_gender: data.privateInfo?.gender || null,
      
      // Single selections
      skin_types: data.skinType || null,
      budget_ranges: data.budget || null,
      
      // Multi selections with other text
      skin_concerns: data.skinConcerns?.concerns || [],
      skin_concerns_other: data.skinConcerns?.moreConcerns || null,
      treatment_areas: data.treatmentAreas?.treatmentAreas || [],
      treatment_areas_other: data.treatmentAreas?.otherAreas || null,
      medical_conditions: data.healthConditions?.healthConditions || [],
      medical_conditions_other: data.healthConditions?.otherConditions || null,
      
      // Priority order (drag & drop)
      priorities: data.priorityOrder?.priorityOrder || [],
      
      // Multi selections
      treatment_goals: data.goals || [],
      past_treatments: data.pastTreatments?.pastTreatments || [],
      
      // Text areas
      past_treatments_side_effect_desc: data.pastTreatments?.sideEffects || null,
      anything_else: data.pastTreatments?.additionalNotes || null,
      
      // Visit path
      visit_path: data.visitPath?.visitPath || null,
      visit_path_other: data.visitPath?.otherPath || null,
      
      // Image paths (받은 경로 배열을 그대로 저장)
      image_paths: data.imagePaths || []
    };

    // DB에 삽입
    const { data: result, error } = await supabase
      .from('consultation_submissions')
      .insert(submissionData)
      .select('id_uuid')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submissionId: result.id_uuid
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}