// import { TreatmentType } from "./treatmentType";

// function recommendTreatments(answers) {
//   const { skinConcerns, treatmentGoals, treatmentAreas, budgetRange, priority, pastTreatments, medicalConditions } = answers;
//   let recs = new Set<TreatmentType>();

//   // 1. Base recommendations by concerns/goals
//   for (let concern of skinConcerns) {
//     for (let treat of baseRecommendationsByConcern[concern] || []) {
//        recs.add(treat);
//     }
//   }
//   for (let goal of treatmentGoals) {
//     for (let treat of baseRecommendationsByGoal[goal] || []) {
//        recs.add(treat);
//     }
//   }
//   // (Areas could further filter these recs here if needed)

//   // 2. Adjust for priority
//   if (priority === "price") {
//     // replace or remove expensive options
//     if (recs.has("ulthera_400") || recs.has("ulthera_600")) {
//       recs.delete("ulthera_400"); recs.delete("ulthera_600");
//       recs.add("liftera_400"); // cheaper alternative
//     }
//     // ... other replacements for cost-saving
//   }
//   if (priority === "effectiveness") {
//     // possibly add top-tier treatments if not already present
//     if (recs.has("liftera_400")) {
//       recs.delete("liftera_400");
//       recs.add("ulthera_400"); // go for more effective option
//     }
//     // ... ensure the best options are chosen
//   }
//   if (priority === "pain") {
//     // remove painful options
//     if (recs.has("ulthera_400")) {
//       recs.delete("ulthera_400");
//       recs.add("thermage_600"); // lower pain alternative for lifting
//     }
//     if (recs.has("co2")) {
//       recs.delete("co2"); // skip CO2 laser due to pain
//     }
//     // ... similar adjustments for other painful treatments
//   }
//   if (priority === "recoveryTime") {
//     if (recs.has("co2")) recs.delete("co2"); // remove long-downtime treatments
//     if (recs.has("praxel")) recs.delete("praxel");
//     // ... etc.
//   }

//   // 3. Budget enforcement
//   let budgetKRW = getBudgetUpperLimitKRW(budgetRange);
//   let totalCost = sum(Array.from(recs).map(t => +TreatmentType[t].price));
//   if (totalCost > budgetKRW) {
//     // try removing optional treatments until within budget
//     let recList = Array.from(recs).sort((a,b) => +TreatmentType[b].price - +TreatmentType[a].price);
//     for (let t of recList) {
//       if (totalCost <= budgetKRW) break;
//       // remove the most expensive or lowest-priority item
//       recs.delete(t);
//       totalCost -= +TreatmentType[t].price;
//     }
//   }

//   // 4. Filter out past treatments conflicts
//   if (pastTreatments.includes("botox_4m")) recs.delete("botox");
//   if (pastTreatments.includes("filler_2w")) recs.delete("filler");
//   if (pastTreatments.includes("laser_2w")) {
//     for (let t of recs) {
//       if (isLaserTreatment(t)) recs.delete(t);
//     }
//   }
//   if (pastTreatments.includes("skinbooster_2w")) {
//     recs.forEach(t => { if(t.startsWith("skinbooster")) recs.delete(t) });
//   }
//   // stem cell recent: similar removal if within 1 month etc.

//   // 5. Filter out medical contraindications
//   if (medicalConditions.includes("pregnant")) {
//     recs.forEach(t => {
//       if (isInjectable(t) || isHighRiskForPregnancy(t)) recs.delete(t);
//     });
//   }
//   if (medicalConditions.includes("blood_clotting")) {
//     recs.forEach(t => { if (isInjectable(t)) recs.delete(t); });
//   }
//   if (medicalConditions.includes("immunosuppressants")) {
//     recs.forEach(t => { if (createsOpenWound(t)) recs.delete(t); });
//   }
//   // ... etc for other conditions

//   return Array.from(recs);
// }
