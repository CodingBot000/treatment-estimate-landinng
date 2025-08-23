# Matching Algorithm Test Suite

This directory contains comprehensive tests for the treatment recommendation algorithm.

## Files

- `matching.test.ts` - Jest-based test suite (requires Jest setup)
- `run-tests.ts` - Standalone test runner (no dependencies required)
- `README.md` - This documentation file

## Test Coverage

The test suite covers:

### 1. Basic Functionality Tests
- Default parameter validation
- Output structure validation

### 2. Single Select Parameters
- **Skin Types**: All skin type variations from form-definition.ts
- **Budget Ranges**: All budget range scenarios

### 3. Multi Select Parameters
- **Treatment Areas**: Different area combinations
- **Skin Concerns**: Grouped by concern types (acne, aging, pigmentation, texture)
- **Treatment Goals**: All available treatment goals
- **Past Treatments**: Various past treatment scenarios
- **Medical Conditions**: Different medical constraint scenarios

### 4. Priority Tests
- **Price Priority**: Tests cost-based substitutions
- **Pain Priority**: Tests pain-avoidance logic
- **Recovery Time Priority**: Tests downtime-minimal options
- **Effectiveness Priority**: Tests optimal treatment selection
- **Reviews/Location Priority**: Tests newer priority options

### 5. Complex Scenarios
- Young adult with acne and budget constraints
- Middle-aged with anti-aging goals and high budget
- Sensitive skin with pain concerns
- Multiple past treatments with medical constraints
- No budget limit with comprehensive concerns

### 6. Edge Cases
- Minimal input scenarios
- Maximum input scenarios
- Conflicting constraints

## Running Tests

### Option 1: Standalone Test Runner (Recommended)
```bash
# Navigate to the project root
cd /path/to/treatment-estimate-landing

# Run with ts-node (if available)
npx ts-node src/test/unit/matching/run-tests.ts

# Or compile and run with node
npx tsc src/test/unit/matching/run-tests.ts --outDir dist --moduleResolution node
node dist/test/unit/matching/run-tests.js
```

### Option 2: Jest Test Suite (requires Jest setup)
```bash
# If Jest is configured in the project
npm test -- src/test/unit/matching/matching.test.ts
```

## Test Output

The tests provide detailed output including:
- **Input Parameters**: All algorithm inputs
- **Recommendations**: Treatment suggestions with prices and rationales
- **Exclusions**: Treatments excluded and reasons
- **Substitutions**: Treatment substitutions made
- **Notes**: Important warnings or considerations
- **Upgrade Suggestions**: Alternative options

## Data Source

All test data is derived from `src/app/data/form-definition.ts`, ensuring tests use the same data structure as the actual application:

- `questions.skinTypes`
- `questions.budgetRanges`
- `questions.treatmentAreas`
- `questions.priorities`
- `questions.treatmentGoals`
- `questions.pastTreatments`
- `questions.medicalConditions`
- `questions.skinConcerns`

## Validation

Each test validates:
1. Algorithm doesn't crash with given inputs
2. Output structure is correct
3. Recommendations are provided when expected
4. Budget constraints are respected
5. Medical/safety constraints are applied
6. Priority-based substitutions work correctly

## Example Test Cases

### Budget Constraint Test
```typescript
const input = {
  skinConcerns: [{ id: "sagging" }, { id: "wrinkles" }],
  treatmentGoals: ["lifting_firmness", "anti_aging"],
  budgetRangeId: "under-1000",
  priorityId: "price"
};
```

### Medical Constraint Test
```typescript
const input = {
  skinConcerns: [{ id: "acne-inflammatory" }],
  medicalConditions: ["pregnant"],
  priorityId: "effectiveness"
};
```

### Past Treatment Exclusion Test
```typescript
const input = {
  skinConcerns: [{ id: "wrinkles" }],
  pastTreatments: ["botox_4m", "laser_2w"],
  treatmentGoals: ["anti_aging"]
};
```

## Expected Behaviors

- **Budget constraints** should result in substitutions or exclusions
- **Medical conditions** should trigger appropriate warnings and exclusions
- **Past treatments** should exclude recently performed procedures
- **Priority settings** should influence treatment selection logic
- **Sensitive skin** should receive gentler treatment recommendations
- **Area selections** should filter treatments to applicable areas only