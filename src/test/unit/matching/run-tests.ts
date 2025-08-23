/**
 * Standalone Test Runner for Matching Algorithm
 * 
 * This file runs the matching algorithm tests without requiring Jest or other test frameworks.
 * It executes various test scenarios and outputs detailed results to console.
 */

import { log } from '@/utils/logger.js';
import { recommendTreatments, RecommendInputs, RecommendationOutput } from '../../../app/estimate/SkinSurveyFlow/questionnaire/questionScript/matchingDiagnosis.js';
import { questionsData } from './test-data.js';

// Simple test framework replacement
class TestRunner {
  private testCount = 0;
  private passedTests = 0;
  private failedTests = 0;

  test(name: string, testFn: () => void) {
    this.testCount++;
    log.debug(`\n🧪 Running: ${name}`);
    try {
      testFn();
      this.passedTests++;
      log.debug('✅ PASSED');
    } catch (error) {
      this.failedTests++;
      log.debug('❌ FAILED:', error);
    }
  }

  describe(name: string, describeFn: () => void) {
    log.debug(`\n📁 Test Suite: ${name}`);
    log.debug('='.repeat(50));
    describeFn();
  }

  expect(actual: any) {
    return {
      toBe: (expected: any) => {
        if (actual !== expected) {
          throw new Error(`Expected ${expected}, but got ${actual}`);
        }
      },
      toBeGreaterThan: (expected: number) => {
        if (actual <= expected) {
          throw new Error(`Expected ${actual} to be greater than ${expected}`);
        }
      },
      toBeLessThan: (expected: number) => {
        if (actual >= expected) {
          throw new Error(`Expected ${actual} to be less than ${expected}`);
        }
      },
      toBeDefined: () => {
        if (actual === undefined || actual === null) {
          throw new Error(`Expected value to be defined, but got ${actual}`);
        }
      }
    };
  }

  summary() {
    log.debug('\n' + '='.repeat(60));
    log.debug('🏁 TEST SUMMARY');
    log.debug('='.repeat(60));
    log.debug(`Total Tests: ${this.testCount}`);
    log.debug(`✅ Passed: ${this.passedTests}`);
    log.debug(`❌ Failed: ${this.failedTests}`);
    log.debug(`Success Rate: ${((this.passedTests / this.testCount) * 100).toFixed(1)}%`);
  }
}

const runner = new TestRunner();

// Test helper functions
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

function validateOutput(output: RecommendationOutput) {
  runner.expect(output).toBeDefined();
  runner.expect(output.recommendations).toBeDefined();
  runner.expect(Array.isArray(output.recommendations)).toBe(true);
  runner.expect(typeof output.totalPriceKRW).toBe('number');
  runner.expect(typeof output.totalPriceUSD).toBe('number');
  runner.expect(Array.isArray(output.excluded)).toBe(true);
  runner.expect(Array.isArray(output.substitutions)).toBe(true);
  runner.expect(Array.isArray(output.upgradeSuggestions)).toBe(true);
  runner.expect(Array.isArray(output.notes)).toBe(true);
}

function printTestResult(testName: string, input: RecommendInputs, output: RecommendationOutput) {
  log.debug(`\n📋 ${testName}`);
  log.debug('📥 INPUT:');
  log.debug('  - Skin Type:', input.skinTypeId);
  log.debug('  - Concerns:', input.skinConcerns.map(c => c.id).join(', '));
  log.debug('  - Goals:', input.treatmentGoals.join(', '));
  log.debug('  - Areas:', input.treatmentAreas.join(', '));
  log.debug('  - Budget:', input.budgetRangeId);
  log.debug('  - Priority:', input.priorityId);
  
  log.debug('📤 OUTPUT:');
  if (output.recommendations.length > 0) {
    log.debug('  💊 Recommendations:');
    output.recommendations.forEach((r, i) => {
      log.debug(`    ${i + 1}. ${r.label} - $${r.priceUSD} (${r.rationale.join(', ')})`);
    });
    log.debug(`  💰 Total Cost: $${output.totalPriceUSD} (₩${output.totalPriceKRW.toLocaleString()})`);
  } else {
    log.debug('  💊 No recommendations found');
  }
  
  if (output.excluded.length > 0) {
    log.debug('  ❌ Excluded:');
    output.excluded.forEach(e => log.debug(`    - ${e.label}: ${e.reason}`));
  }
  
  if (output.substitutions.length > 0) {
    log.debug('  🔄 Substitutions:');
    output.substitutions.forEach(s => log.debug(`    - ${s.from} → ${s.to} (${s.reason})`));
  }
  
  if (output.notes.length > 0) {
    log.debug('  📝 Notes:');
    output.notes.forEach(note => log.debug(`    - ${note}`));
  }
  
  if (output.upgradeSuggestions.length > 0) {
    log.debug('  💡 Upgrade Suggestions:');
    output.upgradeSuggestions.forEach(suggestion => log.debug(`    - ${suggestion}`));
  }
}

// Run all tests
log.debug('🚀 Starting Matching Algorithm Tests');
log.debug('Using data from form-definition.ts');

// Test 1: Basic functionality
runner.describe('Basic Tests', () => {
  runner.test('Basic Case - Default Parameters', () => {
    const input = createTestInput();
    const output = recommendTreatments(input);
    
    validateOutput(output);
    printTestResult('Basic Case', input, output);
    
    runner.expect(output.recommendations.length).toBeGreaterThan(0);
  });
});

// Test 2: Skin Types
runner.describe('Skin Type Tests', () => {
  questionsData.skinTypes.forEach(skinType => {
    runner.test(`Skin Type: ${skinType.label}`, () => {
      const input = createTestInput({ skinTypeId: skinType.id as any });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult(`Skin Type: ${skinType.label}`, input, output);
    });
  });
});

// Test 3: Budget Ranges
runner.describe('Budget Range Tests', () => {
  questionsData.budgetRanges.slice(0, 3).forEach(budget => { // Test first 3 for brevity
    runner.test(`Budget: ${budget.label}`, () => {
      const input = createTestInput({ 
        budgetRangeId: budget.id as any,
        skinConcerns: [{ id: "sagging" }, { id: "wrinkles" }],
        treatmentGoals: ["lifting_firmness", "anti_aging"]
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult(`Budget: ${budget.label}`, input, output);
    });
  });
});

// Test 4: Treatment Goals
runner.describe('Treatment Goals Tests', () => {
  questionsData.treatmentGoals.forEach(goal => {
    runner.test(`Goal: ${goal.label}`, () => {
      const input = createTestInput({ 
        treatmentGoals: [goal.id as any],
        skinConcerns: [{ id: "pores" }, { id: "wrinkles" }]
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult(`Goal: ${goal.label}`, input, output);
    });
  });
});

// Test 5: Priorities
runner.describe('Priority Tests', () => {
  questionsData.priorities.forEach(priority => {
    runner.test(`Priority: ${priority.label}`, () => {
      const input = createTestInput({ 
        priorityId: priority.id as any,
        skinConcerns: [{ id: "sagging" }, { id: "wrinkles" }],
        treatmentGoals: ["lifting_firmness", "anti_aging"]
      });
      const output = recommendTreatments(input);
      
      validateOutput(output);
      printTestResult(`Priority: ${priority.label}`, input, output);
    });
  });
});

// Test 6: Complex Scenarios
runner.describe('Complex Scenarios', () => {
  
  runner.test('Young Adult with Acne and Budget Constraints', () => {
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
    printTestResult('Young Adult - Acne + Budget Constraints', input, output);
    
    runner.expect(output.totalPriceUSD).toBeLessThan(1000);
  });

  runner.test('Middle-aged with Anti-aging Goals', () => {
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
    printTestResult('Middle-aged - Anti-aging Goals', input, output);
    
    runner.expect(output.recommendations.length).toBeGreaterThan(0);
  });

  runner.test('Sensitive Skin with Pain Concerns', () => {
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
    printTestResult('Sensitive Skin - Pain Concerns', input, output);
  });

  runner.test('Past Treatments Exclusions', () => {
    const input = createTestInput({
      skinConcerns: [{ id: "wrinkles" }, { id: "sagging" }],
      treatmentGoals: ["anti_aging"],
      pastTreatments: ["botox_4m", "laser_2w"],
      medicalConditions: ["none"]
    });
    const output = recommendTreatments(input);
    
    validateOutput(output);
    printTestResult('Past Treatments - Exclusions', input, output);
    
    runner.expect(output.excluded.length).toBeGreaterThan(0);
  });

  runner.test('Medical Conditions - Pregnancy', () => {
    const input = createTestInput({
      skinConcerns: [{ id: "pigmentation-melasma" }, { id: "dryness_glow" }],
      treatmentGoals: ["texture_tone"],
      medicalConditions: ["pregnant"]
    });
    const output = recommendTreatments(input);
    
    validateOutput(output);
    printTestResult('Medical Conditions - Pregnancy', input, output);
  });
});

// Run summary
runner.summary();

export {}; // Make this a module