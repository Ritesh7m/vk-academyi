import Button from "@/components/ui/Button";
import Image from "next/image";
import { Users, BookOpen, LineChart, Star, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import KnowledgeTreeJourney from "@/components/ui/KnowledgeTreeJourney";
import HeroCarousel from "@/components/ui/HeroCarousel";
import WeeklyQuizBanner from "@/components/ui/WeeklyQuizBanner";


export default function Home() {
  return (
    <div className="w-full bg-white">

      {/* ── WEEKLY QUIZ BANNER ─────────────────────────────────────── */}
      <WeeklyQuizBanner />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, #EFF6FF 0%, transparent 55%), radial-gradient(circle at 10% 80%, #F8FAFC 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-[#FFB300]/10 text-brand-navy text-xs font-bold px-4 py-2 rounded-full w-fit mb-6 tracking-wide border border-brand-gold/30">
                <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                Admissions Open 2026–27
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-brand-navy leading-[1.1] mb-6 tracking-tight">
                "Dare to Dream,<br />
                <span className="text-brand-gold">Learn to Excel"</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-lg mb-10 leading-relaxed font-medium">
                Empowering Students from Std 5th to 12th Science with Expert Guidance for CET & Board Exams. Built on strong PCM/PCB foundations.
              </p>

              <div className="flex flex-wrap gap-3 mb-14">
                <Button href="/contact" variant="accent">
                  Enroll Now
                </Button>
                <Button href="tel:8356992905" variant="outline">
                  📞 Call Now
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-10 border-t border-slate-200 pt-8">
                <div>
                  <p className="text-3xl font-extrabold text-brand-navy tracking-tight">100+</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Students Enrolled</p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <p className="text-3xl font-extrabold text-brand-navy tracking-tight">98%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Success Rate</p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <p className="text-3xl font-extrabold text-brand-navy tracking-tight">5.0</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Google Rating</p>
                </div>
              </div>
            </div>

            {/* Right – auto-swiping hero carousel */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <HeroCarousel />
            </div>

          </div>
        </div>
      </section>

      {/* ── KNOWLEDGE TREE JOURNEY ─────────────────────────────────────── */}
      <KnowledgeTreeJourney />

      {/* ── COURSES SECTION ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Our Offerings</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">
              Academic Divisions & Coaching
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Structured result-oriented coaching classes to guide school learners to boards, and science students to competitive college exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* School Coaching */}
            <div className="bg-brand-light p-8 md:p-10 rounded-2xl border border-slate-100 hover:border-brand-gold/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider rounded-full">
                  🏫 School Section
                </div>
                <h3 className="text-2xl font-extrabold text-brand-navy">Standard 5th to 10th</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Building strong conceptual bases and rigorous discipline to score top ranks in secondary school exams.
                </p>
                <div className="h-px bg-slate-200" />
                <ul className="space-y-3">
                  {["State Board Coaching", "ICSE Board Preparation", "Concept-Based Lectures", "Personal Attention & Small Batches"].map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                      <span className="w-5 h-5 bg-brand-gold/25 rounded-full flex items-center justify-center text-brand-navy text-xs font-black">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="accent" className="w-full">
                  Enroll in School Batch
                </Button>
              </div>
            </div>

            {/* Science Coaching */}
            <div className="bg-brand-light p-8 md:p-10 rounded-2xl border border-slate-100 hover:border-brand-gold/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/20 text-brand-navy text-xs font-bold uppercase tracking-wider rounded-full">
                  🔬 College Section
                </div>
                <h3 className="text-2xl font-extrabold text-brand-navy">11th & 12th Science</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Targeted, result-oriented coaching programs to crack national and state competitive entrance exams.
                </p>
                <div className="h-px bg-slate-200" />
                <ul className="space-y-3">
                  {["CET Entrance Preparation", "Class 11 & 12 Board Exams", "Concept-Based Lectures", "Strong PCM & PCB Core Foundations"].map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                      <span className="w-5 h-5 bg-brand-gold/25 rounded-full flex items-center justify-center text-brand-navy text-xs font-black">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="primary" className="w-full">
                  Enroll in Science Batch
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-brand-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Why Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">
              Why Choose VK Academy?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We provide an ecosystem that fosters curiosity, instills rigorous discipline, and unlocks the true latent potential of every single student.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Left Column: Before Transformation */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="space-y-4">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                  <Image
                    src="/images/before_vk.png"
                    alt="Before VK Academy"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                </div>
              </div>
            </div>

            {/* Middle Column: The Core Pillars */}
            <div className="flex flex-col gap-6 justify-center">
              {/* Card 1 */}
              <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 hover:border-brand-gold/40 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center text-brand-navy shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-navy mb-1.5">Expert Faculty & Subject Mentors</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Learn from highly specialized professionals and subject matter experts who guide your learning path every single day.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 hover:border-brand-gold/40 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center text-brand-navy shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-navy mb-1.5">Premium Conceptual Study Material</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    In-house structured modules crafted to break down complex concepts into highly intuitive lessons.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: After Transformation */}
            <div className="bg-white border-2 border-brand-gold rounded-3xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
    
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-brand-gold/20 bg-brand-light flex items-center justify-center">
                  <Image
                    src="/images/after_vk.png"
                    alt="After VK Academy"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SHINING STARS ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Achievers</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">
              Our Shining Stars
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              A legacy defined by the extraordinary achievements of our students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Mrunal Sawant", result: "10th Board · 90.20%", tag: "SSC Topper", imageSrc: "/images/3.2026.jpeg" },
              { name: "Neel Vadke", result: "10th Board · 90.00%", tag: "SSC Topper", imageSrc: "/images/2.2026.jpeg" },
              { name: "Mayank Mahajan", result: "10th Board · 89.80%", tag: "SSC Topper", imageSrc: "/images/4.2026.jpeg" },
              { name: "Rose Joseph", result: "10th Board · 85.40%", tag: "SSC Topper", imageSrc: "/images/1.2026.jpeg" },
            ].map((star, i) => (
              <div
                key={star.name}
                className={`relative h-72 rounded-2xl overflow-hidden group ${
                  ["bg-slate-700", "bg-slate-800", "bg-slate-900", "bg-slate-950"][i % 4]
                }`}
              >
                {/* Image */}
                <Image
                  src={star.imageSrc}
                  alt={star.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <span className="inline-block px-2.5 py-1 bg-brand-gold text-brand-navy text-[10px] font-bold uppercase tracking-widest rounded mb-2">
                    {star.tag}
                  </span>
                  <h3 className="text-xl font-extrabold text-white">{star.name}</h3>
                  <p className="text-sm text-amber-100 mt-1">{star.result}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/wall-of-fame"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-[#002244] transition-colors"
            >
              View All Achievers <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── GOOGLE REVIEWS SECTION ───────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-t border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 text-brand-navy text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-brand-gold/30">
            <Star className="w-3 h-3 fill-brand-gold text-brand-gold" /> Student & Parent Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">
            Hear from Our Community
          </h2>
          <p className="text-slate-600 text-base leading-relaxed max-w-2xl mx-auto">
            See how our conceptual teaching methodology and dedicated mentorship have helped students transform their academic trajectories.
          </p>
        </div>

        {/* Scrolling review track 1 (Scrolls Left) */}
        <div className="relative w-full overflow-hidden py-4 pause-marquee">
          <div className="animate-marquee gap-6 flex">
            {[
              {
                name: "Ritesh Yadav",
                role: "Student (10th Board · 95.6%)",
                text: "The study materials and mock tests provided by VK Academy were extremely helpful. Vikram Sir's physics tips helped me secure 98 in physics!",
              },
              {
                name: "Dr. Sunita Sharma",
                role: "Parent of 12th Board Aspirant",
                text: "VK Academy changed my son's approach to learning. The small batch size of 15 students ensures the teachers can clear doubts immediately. Extremely satisfied!",
              },
              {
                name: "Sneha Patel",
                role: "12th Board Topper (96.4%)",
                text: "Biology lectures by Ananya Ma'am were so descriptive and clear. The regular mock test series gave me the confidence to score high on my board exams.",
              },
            ].concat([
              {
                name: "Ritesh Yadav",
                role: "Student (10th Board · 95.6%)",
                text: "The study materials and mock tests provided by VK Academy were extremely helpful. Vikram Sir's physics tips helped me secure 98 in physics!",
              },
              {
                name: "Dr. Sunita Sharma",
                role: "Parent of 12th Board Aspirant",
                text: "VK Academy changed my son's approach to learning. The small batch size of 15 students ensures the teachers can clear doubts immediately. Extremely satisfied!",
              },
              {
                name: "Sneha Patel",
                role: "12th Board Topper (96.4%)",
                text: "Biology lectures by Ananya Ma'am were so descriptive and clear. The regular mock test series gave me the confidence to score high on my board exams.",
              },
            ]).map((rev, idx) => (
              <div
                key={idx}
                className="w-[380px] bg-brand-light p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-brand-gold/40 hover:shadow-md transition-all duration-300 shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-0.5 text-brand-gold mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                    "{rev.text}"
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200/60">
                  <p className="text-sm font-bold text-brand-navy">{rev.name}</p>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling review track 2 (Scrolls Right) */}
        <div className="relative w-full overflow-hidden py-4 pause-marquee mt-2">
          <div className="animate-marquee-reverse gap-6 flex">
            {[
              {
                name: "Amit More",
                role: "Student (12th Science)",
                text: "Rajiv Sir's organic chemistry lectures are the best. I used to struggle with reactions, but the conceptual modules broke them down beautifully.",
              },
              {
                name: "Mrs. Rekha Joshi",
                role: "Parent (10th Class Student)",
                text: "Excellent coaching classes near Mohili Pipeline. The individual attention and regular parent-teacher meetings kept us in the loop throughout the year.",
              },
              {
                name: "Shubham Kadam",
                role: "MHT-CET Ranker",
                text: "Calculus and algebra became my strongest subjects thanks to Shreya Ma'am's shortcuts. VK Academy builds a solid foundation for both Boards and competitive exams.",
              },
            ].concat([
              {
                name: "Amit More",
                role: "Student (12th Science)",
                text: "Rajiv Sir's organic chemistry lectures are the best. I used to struggle with reactions, but the conceptual modules broke them down beautifully.",
              },
              {
                name: "Mrs. Rekha Joshi",
                role: "Parent (10th Class Student)",
                text: "Excellent coaching classes near Mohili Pipeline. The individual attention and regular parent-teacher meetings kept us in the loop throughout the year.",
              },
              {
                name: "Shubham Kadam",
                role: "MHT-CET Ranker",
                text: "Calculus and algebra became my strongest subjects thanks to Shreya Ma'am's shortcuts. VK Academy builds a solid foundation for both Boards and competitive exams.",
              },
            ]).map((rev, idx) => (
              <div
                key={idx}
                className="w-[380px] bg-brand-light p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-brand-gold/40 hover:shadow-md transition-all duration-300 shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-0.5 text-brand-gold mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                    "{rev.text}"
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200/60">
                  <p className="text-sm font-bold text-brand-navy">{rev.name}</p>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-brand-navy rounded-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-8">
            Join hundreds of students who have transformed their futures with VK Academy's expert guidance.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/batches" variant="accent">
              Explore Batches
            </Button>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 tracking-wide border border-white text-white hover:bg-white/10 bg-transparent"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}