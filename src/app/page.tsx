
// import LeftPanel from "@/components/LeftPanel";
// import Step1 from "@/components/Step1";
// import { FormProvider } from "@/contexts/FormContext";
// import { redirect } from "next/navigation";

import SkinForm from "./estimate/skinForm/skin-form";
import SkinSurveyForm from "./estimate/SkinSurveyForm/SkinSurveyForm";
import HomeQuestionnaireDiagnosis from "./hookingpage/HomeQuestionnaireDiagnosis";

// export default function Home() {
//   redirect("/estimate/step1");
// }


export default function Home() {

  return  (
  <div>
    <HomeQuestionnaireDiagnosis />
  </div>
  );
}