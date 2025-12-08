import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills - Aakash Ambodkar",
  description: "Technical skills and expertise in Full Stack Development, AI/ML, and Cloud Technologies.",
};

const skills = [
  {
    title: "Programming Languages",
    items: ["Python", "JavaScript", "Java", "C++", "TypeScript"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Vue.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Django", "Spring Boot", "FastAPI"],
  },
  {
    title: "Databases & Cloud",
    items: ["PostgreSQL", "MongoDB", "AWS", "Firebase", "Docker"],
  },
  {
    title: "AI/ML",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "LLMs"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    title: "Tools & Technologies",
    items: ["Git", "GitHub", "CI/CD", "RESTful APIs", "GraphQL"],
  },
];

export const metadata = {
  title: "Skills - Aakash Ambodkar",
  description: "Technical skills and expertise",
};

export default function Skills() {
  return (
    <main>
      <Hero title="My Skills" subtitle="Technical expertise and proficiencies" />
      <section style={{ padding: "2rem 3rem", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="skills-tiles">
            {skills.map((skillGroup) => (
              <div key={skillGroup.title} className="skill-tile">
                <h3>{skillGroup.title}</h3>
                <div className="skill-tags">
                  {skillGroup.items.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
