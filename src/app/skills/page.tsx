import Navbar from "@/components/Navbar";
import { SkillsPage } from "./SkillsPage";
import Footer from "@/components/Footer";

export default function Resume() {
  return  (
    <div>
        <Navbar currentPage="Skills"/>
        <SkillsPage />
        <Footer />
    </div>
  );
}
