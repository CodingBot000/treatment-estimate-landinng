// import LeftPanel from "@/components/LeftPanel";
// import Step1 from "@/components/Step1";
// import { FormProvider } from "@/contexts/FormContext";
// import { redirect } from "next/navigation";
import QuoteExploreSection from "./hookingpage/QuoteExploreSection";

// export default function Home() {
//   redirect("/estimate/step1");
// }
export default function Home() {
  return  (
  <div>

    <QuoteExploreSection />
  </div>
  );
}