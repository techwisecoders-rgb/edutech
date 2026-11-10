"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap, Sparkles, Search, X, RotateCw, PlayCircle, Lock, User,
  Phone, BookOpen, ArrowLeft, Baby, Wrench, Medal, Award, School,
  Chrome, Home, CheckCircle2, ChevronRight, BookMarked
} from "lucide-react";

type Page = "courses" | "education" | "sub" | "schools";
type Course = string;

const courses = [
  "DSA", "Data Warehousing and Data Mining", "COMPUTER NETWORKS", "ARTIFICIAL LEARNING",
  "MACHINE LEARNING", "DEEP LEARNING", "Blockchain Technology", "DATA SCIENCE",
  "Computer Graphics", "PRINCIPLES OF Software Engineering", "Human-Computer Interaction",
  "Digital Image Processing", "PYTHON", "JAVA", "C", "APP DEVELOPMENT", "WEB DEVELOPMENT",
  "Computer Organization and Architecture", "Database Management Systems", "Operating Systems",
  "Theory of Computation", "Cyber Security", "Cloud Computing", "Internet of Things",
  "CALCULUS & ORGANIC CHEMISTRY"
];

const educationData: Record<string, string[]> = {
  kindergarten: ["NURSERY", "LKG", "UKG", "RHYMES", "MOTHER LOVE", "FATHER LOVE", "STORIES", "PRE-NURSERY", "BABY CARE", "INFANT CARE", "DAY CARE", "PRE KINDERGARTEN", "PLAY SCHOOL", "PLAY GROUP", "PRE-SCHOOL", "EARLY LEARNING HOME"],
  classes: ["CBSE", "NCERT", "ICSE", "CISCE", "STATE BOARD", "INTERNATIONAL BOARD", "PRIVATE BOARD", "PRIVATE AUTHORS"],
  classLevels: ["CLASS 1", "CLASS 2", "CLASS 3", "CLASS 4", "CLASS 5", "CLASS 6", "CLASS 7", "CLASS 8", "CLASS 9", "CLASS 10"],
  intermediate: ["M.P.C", "Bi.P.C", "M.Bi.P.C", "C.E.C", "H.E.C", "M.E.C", "H.P.C"],
  mpc: ["MATHEMATICS", "PHYSICS", "CHEMISTRY"],
  bipc: ["BOTANY", "ZOOLOGY", "PHYSICS", "CHEMISTRY"],
  mbipc: ["MATHEMATICS", "BOTANY", "ZOOLOGY", "PHYSICS", "CHEMISTRY"],
  cec: ["COMMERCE", "ECONOMICS", "CIVICS"], hec: ["HISTORY", "ECONOMICS", "CIVICS"],
  mec: ["MATHEMATICS", "ECONOMICS", "COMMERCE"], hpc: ["HISTORY", "PSYCHOLOGY", "CIVICS"],
  polytechnic: ["DIPLOMA PROGRAMS"],
  undergraduate: ["B.Tech (BACHELOR OF TECHNOLOGY)", "MBBS (BACHELOR OF MEDICINE, BACHELOR OF SURGERY)", "LLB (BACHELOR OF LEGISLATIVE LAW)", "B.A (BACHELOR OF ARTS)", "B.Sc (BACHELOR OF SCIENCE)", "B.E (BACHELOR OF ENGINEERING)", "B.Arch (BACHELOR OF ARCHITECTURE)", "BBA (BACHELOR OF BUSINESS ADMINISTRATION)", "B.Pharm (BACHELOR OF PHARMACY)", "BCA (BACHELOR OF COMPUTER APPLICATION)", "BFA (BACHELOR OF FINE ARTS)", "B.Ed (BACHELOR OF EDUCATION)"],
  postgraduate: ["M.Tech (MASTER OF TECHNOLOGY)", "M.D (DOCTOR OF MEDICINE)", "MS (MASTER OF SURGERY)", "LLM (MASTER OF LAW)", "M.A (MASTER OF ARTS)", "M.Sc (MASTER OF SCIENCE)", "M.Arch (MASTER OF ARCHITECTURE)", "MBA (MASTER OF BUSINESS ADMINISTRATION)", "M.Pharm (MASTER OF PHARMACY)", "M.Ed (MASTER OF EDUCATION)", "M.P.Ed (MASTER OF PHYSICAL EDUCATION)", "M.H.R.M (MASTER OF HUMAN RESOURCES MANAGEMENT)", "MFA (MASTER OF FINE ARTS)", "MJMC (MASTER OF JOURNALISM AND MASS COMMUNICATION)", "PharmD (DOCTOR OF PHARMACY)", "M.Com (MASTER OF COMMERCE)", "MLIS (MASTER OF LIBRARY & INFORMATION SCIENCE)", "MPT (MASTER OF PHYSIOTHERAPY)", "MDS (MASTER OF DENTAL SURGERY)"],
  dual: ["INTEGRATED M-Tech", "BBA LLB", "BE+ME", "BTech+MBA", "B.Ed+M.Ed"],
  doctorate: ["DOCTOR OF PHILOSOPHY", "DOCTOR OF ARTS", "DOCTOR OF BUSINESS ADMINISTRATION", "DOCTOR OF CANON LAW", "DOCTOR OF PHARMACY", "DOCTOR OF DESIGN", "DOCTOR OF EDUCATION", "DOCTOR OF ENGINEERING", "DOCTOR OF FINE ARTS", "DOCTOR OF HEBREW LETTERS", "DOCTOR OF JURIDICIAL SCIENCE", "DOCTOR OF MUSICAL ARTS", "DOCTOR OF MUSIC EDUCATION", "DOCTOR OF MODERN LANGUAGES", "DOCTOR OF NURSING SCIENCE", "DOCTOR OF SACRED THEOLOGY", "DOCTOR OF SCIENCE", "DOCTOR OF THEOLOGY", "DOCTOR OF PHILOSOPHY IN NURSING", "DOCTOR OF ACUPUNCTURE", "DOCTOR OF ACUPUNCTURE AND ORIENTAL MEDICINE", "DOCTOR OF AUDIOLOGY", "DOCTOR OF CHIROPRACTIC", "DOCTOR OF DENTAL MEDICINE", "DOCTOR OF DENTAL SURGERY", "DOCTOR OF JURISPRUDENCE", "DOCTOR OF MEDICINE", "DOCTOR OF MINISTRY", "DOCTOR OF NURSING PRACTICE", "DOCTOR OF OCCUPATIONAL THERAPY", "DOCTOR OF OPTOMETRY", "DOCTOR OF OSTEOPATHIC MEDICINE", "DOCTOR OF PHYSICAL THERAPY", "DOCTOR OF PODIATRIC MEDICINE", "DOCTOR OF PSYCHOLOGY", "DOCTOR OF SOCIAL WORK", "DOCTOR OF VETERINARY MEDICINE", "DOCTOR OF HEALTH POLICY", "DOCTOR OF PUBLIC HEALTH", "DOCTOR OF ARCHITECTURE", "DOCTOR OF BEHAVIORAL HEALTH", "DOCTOR OF COMPUTER SCIENCE", "DOCTOR OF INFORMATION TECHNOLOGY", "DOCTOR OF PUBLIC ADMINISTRATION", "DOCTOR OF CRIMINAL JUSTICE", "DOCTOR OF HEALTH ADMINISTRATION", "DOCTOR OF HEALTH SCIENCE", "DOCTOR OF MANAGEMENT", "DOCTOR OF NATUROPATHIC MEDICINE", "DOCTOR OF PROFESSIONAL STUDIES"]
};

const categories = [
  { key: "kindergarten", title: "KINDER GARTEN", Icon: Baby },
  { key: "classes", title: "CLASSES 1-10", Icon: BookOpen },
  { key: "intermediate", title: "INTERMEDIATE", Icon: GraduationCap },
  { key: "polytechnic", title: "POLY TECHNIC", Icon: Wrench },
  { key: "undergraduate", title: "UNDER GRADUATE", Icon: GraduationCap },
  { key: "postgraduate", title: "POST GRADUATE", Icon: Medal },
  { key: "dual", title: "DUAL DEGREE", Icon: Award },
  { key: "doctorate", title: "DOCTORATE", Icon: Medal }
];
const categoryTitles: Record<string, string> = {
  kindergarten: "👶 Kindergarten", classes: "📚 Classes 1-10", intermediate: "🎯 Intermediate",
  polytechnic: "⚙️ Polytechnic", undergraduate: "🎓 Undergraduate", postgraduate: "🎖️ Postgraduate",
  dual: "🎓🎓 Dual Degree", doctorate: "🏆 Doctorate"
};
const schools = ["SRI CHAITANYA SCHOOL", "NARAYANA SCHOOL", "BHASYAM SCHOOL", "NAVODAYA SCHOOL", "ADARSHAM VAIVIDYALAYAM"];

export default function HomePage() {
  const [page, setPage] = useState<Page>("courses");
  const [search, setSearch] = useState("");
  const [flipped, setFlipped] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [subKey, setSubKey] = useState("kindergarten");
  const [subTitle, setSubTitle] = useState("");
  const [subBack, setSubBack] = useState("education");
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", study: "" });

  const filteredCourses = useMemo(() => courses.filter((course) => course.toLowerCase().includes(search.trim().toLowerCase())), [search]);
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3500);
  };
  const openRegistration = (course = "") => { setSelectedCourse(course); setModalOpen(true); };
  const showSub = (key: string, title: string, back = "education") => {
    setSubKey(key); setSubTitle(title); setSubBack(back); setPage("sub"); window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => {
    if (subBack === "classes" || subBack === "intermediate") {
      const title = subBack === "classes" ? "Classes 1-10" : "Intermediate";
      showSub(subBack, title, "education");
    } else setPage("education");
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModalOpen(false);
    notify(`Thank you ${form.name}! Payment will redirect once the verification is done from admin side.`);
    setForm({ name: "", phone: "", study: "" });
  };

  return (
    <div className="portal-shell">
      <header className="app-header">
        <div className="header-row-content">
          <button className="header-btn" aria-label="Student registration" title="Student Registration" onClick={() => openRegistration()}><GraduationCap className="matrix-icon" /></button>
          <div className="header-search-container">
            <Search className="search-icon" size={18} />
            <input className="header-search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." aria-label="Search courses" />
            {search && <button className="search-clear-btn" onClick={() => setSearch("")} aria-label="Clear search"><X size={17} /></button>}
          </div>
          <button className="header-btn" aria-label="Featured offer" title="Featured Offer" onClick={() => { window.open("https://www.idealsir.com", "_blank", "noopener,noreferrer"); notify("✨ Opening IDEAL Sir Website..."); }}><Sparkles className="sparkle-icon" /></button>
        </div>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {page === "courses" && <motion.section key="courses" className="grid-container" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {filteredCourses.map((course, index) => (
              <div className="card-perspective" key={course}>
                <motion.div className={`color-box-wrapper ${flipped === course ? "flipped" : ""}`} onClick={() => setFlipped(flipped === course ? null : course)} whileTap={{ scale: .985 }}>
                  <div className="card-face front">
                    <span className="box-badge">CS / IT</span>
                    <div className="lesson-container"><div className="lesson-title">{course}</div><PlayCircle className="title-video-icon" /></div>
                    <div className="card-footer-info"><span className="box-number">BOX {String(index + 1).padStart(2, "0")}</span><span className="click-hint"><RotateCw size={13} /> Tap to Unlock</span></div>
                  </div>
                  <div className="card-face back">
                    <div className="back-title">{course}</div>
                    <div className="price-tag"><span className="price-amount">₹1,999</span><span className="original-price">₹4,999</span></div>
                    <button className="pay-proceed-btn" onClick={(event) => { event.stopPropagation(); openRegistration(course); }}><Lock size={15} /><span>PROCEED TO PAY ₹1999</span></button>
                  </div>
                </motion.div>
              </div>
            ))}
            {filteredCourses.length === 0 && <div className="no-results">No courses found matching your search.</div>}
          </motion.section>}

          {page === "education" && <motion.section key="education" className="grid-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="page-header-title">🎓 Education Portal</h2>
            {categories.map(({ key, title, Icon }) => <button className="education-box" key={key} onClick={() => showSub(key, categoryTitles[key])}><Icon className="education-box-icon" /><span className="education-box-title">{title}</span></button>)}
          </motion.section>}

          {page === "sub" && <motion.section key={`sub-${subKey}-${subTitle}`} className="grid-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="page-header-title">{subTitle}</h2>
            {(educationData[subKey] || []).map((item) => {
              const streamKey = item.toLowerCase().replace(/\./g, "");
              const hasSub = subKey === "classes" || (subKey === "intermediate" && Boolean(educationData[streamKey]));
              return <button className="education-box" key={item} onClick={() => {
                if (subKey === "classes") showSub("classLevels", item, "classes");
                else if (subKey === "intermediate" && educationData[streamKey]) showSub(streamKey, item, "intermediate");
                else notify(`${item} selected!`);
              }}><GraduationCap className="education-box-icon" /><span className="education-box-title">{item}</span>{hasSub && <ChevronRight size={18} />}</button>;
            })}
            <button className="back-btn-education" onClick={goBack}><ArrowLeft size={17} /> BACK</button>
          </motion.section>}

          {page === "schools" && <motion.section key="schools" className="grid-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="page-header-title">🏫 Collaboration Schools</h2>
            {schools.map((school) => <button className="education-box" key={school} onClick={() => notify(`${school.replace(" SCHOOL", "")} selected!`)}><School className="education-box-icon" /><span className="education-box-title">{school}</span></button>)}
            <button className="back-btn-education" onClick={() => setPage("courses")}><ArrowLeft size={17} /> BACK TO HOME</button>
          </motion.section>}
        </AnimatePresence>
      </main>

      <footer className="app-footer"><div className="footer-nav-content">
        <button aria-label="Education portal" title="Education Portal" onClick={() => setPage(page === "education" || page === "sub" ? "courses" : "education")}><Chrome className="matrix-icon" /></button>
        <button aria-label="Home" title="Home" onClick={() => { setPage("courses"); setSearch(""); }}><Home className="matrix-icon" /></button>
        <button aria-label="Collaboration schools" title="Collaboration Schools" onClick={() => setPage("schools")}><BookMarked className="matrix-icon" /></button>
      </div></footer>

      <AnimatePresence>
        {modalOpen && <motion.div className="modal-overlay active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <motion.div className="registration-card" initial={{ y: 20, scale: .95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: .95 }}>
            <button className="modal-close-btn" aria-label="Close modal" onClick={() => setModalOpen(false)}><X size={19} /></button>
            <div className="modal-header"><GraduationCap /><h2>Unlock Access</h2><p>Register details to proceed with course enrolment</p></div>
            {selectedCourse && <div className="selected-course-banner active">Enrolling for: <strong>{selectedCourse}</strong> (₹1,999)</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label htmlFor="fullName">FULL NAME</label><div className="input-wrapper"><User /><input id="fullName" className="form-control" placeholder="Enter your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div></div>
              <div className="form-group"><label htmlFor="phoneNum">PHONE NUMBER</label><div className="input-wrapper"><Phone /><input id="phoneNum" className="form-control" type="tel" placeholder="Enter 10-digit mobile number" pattern="[0-9]{10}" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div></div>
              <div className="form-group"><label htmlFor="studyingIn">STUDYING IN</label><div className="input-wrapper"><BookOpen /><select id="studyingIn" className="form-control" required value={form.study} onChange={(e) => setForm({ ...form, study: e.target.value })}><option value="" disabled>Select your current study level</option><option>B.Tech / B.E.</option><option>Intermediate (1st/2nd Year)</option><option>Degree (B.Sc / BCA / B.Com)</option><option>Diploma / Polytechnic</option><option>School (8th - 10th Class)</option><option>Working Professional</option></select></div></div>
              <button type="submit" className="submit-pay-btn"><span>PROCEED TO PAY ₹1,999</span><Lock size={17} /></button>
            </form>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast-container show" initial={{ opacity: 0, y: 25, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 20, x: "-50%" }}><CheckCircle2 size={20} /><span>{toast}</span></motion.div>}</AnimatePresence>
    </div>
  );
}
