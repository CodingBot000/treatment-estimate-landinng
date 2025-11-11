/**
 * Matching Algorithm Test Suite
 * 
 * Tests for the treatment recommendation algorithm using real form-definition data
 * Each test case represents different user scenarios and validates the algorithm output
 */

import { recommendTreatments, RecommendInputs, RecommendationOutput } from '../../../app/recommend_estimate/SkinSurveyFlow/questionnaire/questionScript/matchingDiagnosis';
import { questions } from '../../../app/content/form-definition';
import { log } from '@/utils/logger';

// Test helper to create structured test inputs
function createTestInput(overrides: Partial<RecommendInputs> = {}): RecommendInputs {
  const defaults: RecommendInputs = {
    skinTypeId: "combination",
    skinConcerns: [{ id: "pores" }],
    treatmentGoals: ["overall_refresh"],
    treatmentAreas: ["full-face"],
    budgetRangeId: "1000-5000",
    priorityId: "effectiveness",
    pastTreatments: ["none"],
    medicalConditions: ["none"]
  };
  
  return { ...defaults, ...overrides };
}

// Test helper to validate output structure
function validateOutput(output: RecommendationOutput) {
  expect(output).toBeDefined();
  expect(output.recommendations).toBeDefined();
  expect(Array.isArray(output.recommendations)).toBe(true);
  expect(typeof output.totalPriceKRW).toBe('number');
  expect(typeof output.totalPriceUSD).toBe('number');
  expect(Array.isArray(output.excluded)).toBe(true);
  expect(Array.isArray(output.substitutions)).toBe(true);
  expect(Array.isArray(output.upgradeSuggestions)).toBe(true);
  expect(Array.isArray(output.notes)).toBe(true);
}

// Test helper to print detailed output
function printTestResult(testName: string, input: RecommendInputs, output: RecommendationOutput) {
  log.debug(`\n🧪 TEST: ${testName}`);
  log.debug('📥 INPUT:', JSON.stringify(input, null, 2));
  log.debug('📤 OUTPUT:');
  log.debug('  💊 Recommendations:', output.recommendations.map(r => ({
    treatment: r.label,
    priceUSD: r.priceUSD,
    rationale: r.rationale
  })));
  log.debug('  💰 Total Cost: $' + output.totalPriceUSD);
  log.debug('  ❌ Excluded:', output.excluded.map(e => `${e.label} (${e.reason})`));
  log.debug('  🔄 Substitutions:', output.substitutions.map(s => `${s.from} → ${s.to} (${s.reason})`));
  log.debug('  📝 Notes:', output.notes);
  log.debug('  💡 Upgrade Suggestions:', output.upgradeSuggestions);
}

describe('Matching Algorithm Tests', () => {
  
  // Test Case 1: Basic functionality with default values
  test('Basic Case - Default Parameters', () => {
    const input = createTestInput();
    const output = recommendTreatments(input);
    
    validateOutput(output);
    printTestResult('Basic Case - Default Parameters', input, output);
    
    expect(output.recommendations.length).toBeGreaterThan(0);
  });

  // Test Case 2: Skin Type Variations
  describe('Skin Type Tests', () => {
    questions.skinTypes.forEach(skinType => {
      test(`Skin Type: ${skinType.label}`, () => {
        const input = createTestInput({ skinTypeId: skinType.id as any });
        const output = recommendTreatments(input);
        
        validateOutput(output);
        printTestResult(`Skin Type: ${skinType.label}`, input, output);
        
        // Sensitive skin should have gentler recommendations
        if (skinType.id === 'sensitive') {
          expect(output.notes.some(note => note.includes('민감성'))).toBe(true);
        }
      });
    });
  });

  // Test Case 3: Budget Range Tests
  describe('Budget Range Tests', () => {
    questions.budgetRanges.forEach(budget => {
      test(`Budget: ${budget.label}`, () => {
        const input = createTestInput({ 
          budgetRangeId: budget.id as any,
          skinConcerns: [{ id: "sagging" }, { id: "wrinkles" }],
          treatmentGoals: ["lifting_firmness", "anti_aging"]
        });
        const output = recommendTreatments(input);
        
        validateOutput(output);
        printTestResult(`Budget: ${budget.label}`, input, output);
        
        // For low budget, should have more substitutions or exclusions
        if (budget.id === 'under-1000') {
          expect(output.substitutions.length + output.excluded.length).toBeGreaterThan(0);
        }
      });
    });
  });

  // Test Case 4: Skin Concerns Tests
  describe('Skin Concerns Tests', () => {
    const concernGroups = [
      { name: 'Acne Concerns', concerns: ['acne-inflammatory', 'acne-whiteheads'] },
      { name: 'Aging Concerns', concerns: ['wrinkles', 'sagging', 'elasticity'] },
      { name: 'Pigmentation', concerns: ['pigmentation-freckles', 'pigmentation-melasma'] },
      { name: 'Texture Issues', concerns: ['pores', 'uneven_tone', 'dryness_glow'] }
    ];

    concernGroups.forEach(group => {
      test(`${group.name}`, () => {
        const input = createTestInput({
          skinConcerns: group.concerns.map(id => ({ id: id as any })),
          treatmentGoals: ["texture_tone", "overall_refresh"]
        });
        const output = recommendTreatments(input);
        
        validateOutput(output);
        printTestResult(group.name, input, output);
        
        expect(output.recommendations.length).toBeGreaterThan(0);
      });
    });
  });

  // Test Case 5: Treatment Goals Tests
  describe('Treatment Goals Tests', () => {
    questions.treatmentGoals.forEach(goal => {
      test(`Goal: ${goal.label}`, () => {
        const input = createTestInput({ 
          treatmentGoals: [goal.id as any],
          skinConcerns: [{ id: "pores" }, { id: "wrinkles" }]
        });
        const output = recommendTreatments(input);
        
        validateOutput(output);
        printTestResult(`Goal: ${goal.label}`, input, output);
        
        expect(output.recommendations.length).toBeGreaterThan(0);
      });
    });
  });

  // Test Case 6: Priority Tests
  describe('Priority Tests', () => {
    questions.priorities.forEach(priority => {
      test(`Priority: ${priority.label}`, () => {
        const input = createTestInput({ 
          priorityId: priority.id as any,
          skinConcerns: [{ id: "sagging" }, { id: "wrinkles" }],
          treatmentGoals: ["lifting_firmness", "anti_aging"]
        });
        const output = recommendTreatments(input);
        
        validateOutput(output);
        printTestResult(`Priority: ${priority.label}`, input, output);
        
        // Price priority should have more substitutions
        if (priority.id === 'price') {
          // May have substitutions for cheaper alternatives
        }
        
        // Pain priority should exclude painful treatments
        if (priority.id === 'pain') {
          // Should have substitutions or exclusions for painful treatments
        }
      });
    });
  });

  // Test Case 7: Treatment Areas Tests
  describe('Treatment Areas Tests', () => {
    const areaGroups = [
      { name: 'Full Face', areas: ['full-face'] },
      { name: 'Specific Areas', areas: ['forehead', 'eye-area', 'cheeks'] },
      { name: 'Jawline Focus', areas: ['jawline', 'neck'] },
      { name: 'Multiple Areas', areas: ['full-face', 'neck', 'body'] }
    ];

    areaGroups.forEach(group => {
      test(`Areas: ${group.name}`, () => {
        const input = createTestInput({
          treatmentAreas: group.areas as any[],
          skinConcerns: [{ id: "sagging" }, { id: "volumizing" }]
        });
        const output = recommendTreatments(input);
        
        validateOutput(output);
        printTestResult(`Areas: ${group.name}`, input, output);
        
        expect(output.recommendations.length).toBeGreaterThan(0);
      });
    });
  });

  // Test Case 8: Past Treatments Tests
  describe('Past Treatments Tests', () => {
    const pastTreatmentScenarios = [
      { name: 'Recent Botox', treatments: ['botox_4m'] },
      { name: 'Recent Filler', treatments: ['filler_2w'] },
      { name: 'Recent Laser', treatments: ['laser_2w'] },
      { name: 'Recent Skinbooster', treatments: ['skinbooster_2w'] },
      { name: 'Multiple Recent', treatments: ['botox_4m', 'laser_2w', 'filler_2w'] }
    ];

    pastTreatmentScenarios.forEach(scenario => {
      test(`Past Treatments: ${scenario.name}`, () => {
        const input = createTestInput({
          pastTreatments: scenario.treatments as any[],
          skinConcerns: [{ id: "wrinkles" }, { id: "sagging" }, { id: "dryness_glow" }]
        });
        const output = recommendTreatments(input);
        
        validateOutput(output);
        printTestResult(`Past Treatments: ${scenario.name}`, input, output);
        
        // Should have exclusions based on recent treatments
        expect(output.excluded.length).toBeGreaterThan(0);
      });
    });
  });

  // Test Case 9: Medical Conditions Tests
  describe('Medical Conditions Tests', () => {
    const medicalScenarios = [
      { name: 'Pregnant', conditions: ['pregnant'] },
      { name: 'Blood Clotting', conditions: ['blood_clotting'] },
      { name: 'Skin Allergy', conditions: ['skin_allergy'] },
      { name: 'Immunosuppressants', conditions: ['immunosuppressants'] },
      { name: 'Multiple Conditions', conditions: ['pregnant', 'skin_allergy'] }
    ];

    medicalScenarios.forEach(scenario => {
      test(`Medical: ${scenario.name}`, () => {
        const input = createTestInput({
          medicalConditions: scenario.conditions as any[],
          skinConcerns: [{ id: "acne-inflammatory" }, { id: "pores" }]
        });
        const output = recommendTreatments(input);
        
        validateOutput(output);
        printTestResult(`Medical: ${scenario.name}`, input, output);
        
        // Should have appropriate warnings in notes
        if (scenario.conditions.includes('pregnant')) {
          expect(output.notes.some(note => note.includes('임신'))).toBe(true);
        }
      });
    });
  });

  // Test Case 10: Complex Scenarios
  describe('Complex Scenarios', () => {
    
    test('Young Adult with Acne and Budget Constraints', () => {
      const input = createTestInput({
        skinConcerns: [{ id: "acne-inflammatory" }, { id: "pores" }, { id: "uneven_tone" }],
        treatmentGoals: ["acne_pore", "texture_tone"],
        treatmentAreas: ["full-face"],
        budgetRangeId: "under-1000",
        priorityId: "price",
        pastTreatments: ["none"],
        medicalConditions: ["none"]
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult('Young Adult with Acne and Budget Constraints', input, output);
      
      expect(output.recommendations.length).toBeGreaterThan(0);
      expect(output.totalPriceUSD).toBeLessThan(1000);
    });

    test('Middle-aged with Anti-aging Goals and High Budget', () => {
      const input = createTestInput({
        skinConcerns: [{ id: "sagging" }, { id: "wrinkles" }, { id: "volumizing" }],
        treatmentGoals: ["lifting_firmness", "anti_aging"],
        treatmentAreas: ["full-face", "jawline", "neck"],
        budgetRangeId: "10000-plus",
        priorityId: "effectiveness",
        pastTreatments: ["none"],
        medicalConditions: ["none"]
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult('Middle-aged with Anti-aging Goals and High Budget', input, output);
      
      expect(output.recommendations.length).toBeGreaterThan(0);
    });

    test('Sensitive Skin with Pain Concerns', () => {
      const input = createTestInput({
        skinTypeId: "sensitive",
        skinConcerns: [{ id: "redness" }, { id: "dryness_glow" }],
        treatmentGoals: ["overall_refresh"],
        treatmentAreas: ["full-face"],
        budgetRangeId: "1000-5000",
        priorityId: "pain",
        pastTreatments: ["none"],
        medicalConditions: ["skin_allergy"]
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult('Sensitive Skin with Pain Concerns', input, output);
      
      expect(output.notes.some(note => note.includes('민감성'))).toBe(true);
    });

    test('Multiple Past Treatments with Medical Constraints', () => {
      const input = createTestInput({
        skinConcerns: [{ id: "pigmentation-melasma" }, { id: "wrinkles" }],
        treatmentGoals: ["texture_tone", "anti_aging"],
        treatmentAreas: ["full-face"],
        budgetRangeId: "5000-10000",
        priorityId: "effectiveness",
        pastTreatments: ["botox_4m", "laser_2w"],
        medicalConditions: ["antibiotics_or_steroids"]
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult('Multiple Past Treatments with Medical Constraints', input, output);
      
      expect(output.excluded.length).toBeGreaterThan(0);
      expect(output.notes.length).toBeGreaterThan(0);
    });
  });

  // Test Case 11: Edge Cases
  describe('Edge Cases', () => {
    
    test('No Budget Limit with All Concerns', () => {
      const input = createTestInput({
        skinConcerns: [
          { id: "acne-inflammatory" },
          { id: "sagging" },
          { id: "wrinkles" },
          { id: "pigmentation-melasma" },
          { id: "pores" }
        ],
        treatmentGoals: [
          "overall_refresh",
          "lifting_firmness", 
          "texture_tone",
          "anti_aging",
          "acne_pore"
        ],
        treatmentAreas: ["full-face", "jawline", "neck"],
        budgetRangeId: "no_limit",
        priorityId: "effectiveness",
        pastTreatments: ["none"],
        medicalConditions: ["none"]
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult('No Budget Limit with All Concerns', input, output);
      
      expect(output.recommendations.length).toBeGreaterThan(0);
    });

    test('Minimal Input - Single Concern and Goal', () => {
      const input = createTestInput({
        skinConcerns: [{ id: "pores" }],
        treatmentGoals: ["overall_refresh"],
        treatmentAreas: ["full-face"],
        budgetRangeId: "unsure",
        priorityId: "effectiveness"
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult('Minimal Input - Single Concern and Goal', input, output);
      
      expect(output.recommendations.length).toBeGreaterThan(0);
    });
  });
});