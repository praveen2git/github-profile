"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReadmeGenerator() {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  
  // Socials
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [portfolio, setPortfolio] = useState("");

  // Stats
  const [showStats, setShowStats] = useState(true);
  const [showStreak, setShowStreak] = useState(true);
  const [showTopLangs, setShowTopLangs] = useState(true);
  const [showVisitorCount, setShowVisitorCount] = useState(true);

  const [skills, setSkills] = useState([]);
  const [markdown, setMarkdown] = useState("");

  const techStacks = {
    Languages: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin"],
    Frontend: ["React", "Next.js", "Vue.js", "Angular", "Svelte", "TailwindCSS", "Bootstrap", "HTML5", "CSS3"],
    Backend: ["Node.js", "Express", "NestJS", "Django", "Flask", "Spring Boot", "GraphQL"],
    Database: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Firebase", "Supabase"],
    DevOps: ["Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "GitHub Actions", "Jenkins", "Terraform"],
    Tools: ["Git", "Figma", "Postman", "VS Code", "Linux"]
  };

  useEffect(() => {
    let md = "";
    
    // Header
    if (name) md += `# Hi there 👋, I'm ${name}\n\n`;
    if (subtitle) md += `### ${subtitle}\n\n`;
    
    // Visitor Count (Top Right Alignment usually requires HTML, but standard is inline)
    if (github && showVisitorCount) {
       md += `![Visitor Count](https://profile-counter.glitch.me/${github}/count.svg)\n\n`;
    }

    if (description) md += `${description}\n\n`;
    
    // About / Dynamic Content (Example from user profile)
    md += `- 🔭 I’m currently working on ...\n`;
    md += `- 🌱 I’m currently learning ...\n`;
    md += `- 👯 I’m looking to collaborate on ...\n`;
    if (github) md += `- 📫 How to reach me: [GitHub](https://github.com/${github})\n\n`;

    // Skills
    if (skills.length > 0) {
      md += `### 🛠 Skills\n`;
      md += `<p align="left">\n`;
      md += skills.map(s => `  <img src="https://img.shields.io/badge/${s}-black?style=flat-square&logo=${s.toLowerCase()}&logoColor=white" alt="${s}" />`).join("\n");
      md += `\n</p>\n\n`;
    }

    // Stats Section
    if (github && (showStats || showStreak || showTopLangs)) {
      md += `### 📊 GitHub Analytics\n\n`;
      md += `<p align="center">\n`;
      
      if (showStats) {
        md += `  <img src="https://github-readme-stats.vercel.app/api?username=${github}&show_icons=true&theme=radical" alt="Stats" />\n`;
      }
      if (showStreak) {
        md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${github}&theme=radical" alt="Streak" />\n`;
      }
      md += `</p>\n`;
      
      if (showTopLangs) {
        md += `<p align="center">\n`;
        md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${github}&layout=compact&theme=radical" alt="Top Langs" />\n`;
        md += `</p>\n\n`;
      }
    }

    // Socials
    if (github || twitter || linkedin || instagram || portfolio) {
      md += `### 🔗 Connect with me\n`;
      md += `<p align="left">\n`;
      if (github) md += `  <a href="https://github.com/${github}" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>\n`;
      if (twitter) md += `  <a href="https://twitter.com/${twitter}" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>\n`;
      if (linkedin) md += `  <a href="https://linkedin.com/in/${linkedin}" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
      if (instagram) md += `  <a href="https://instagram.com/${instagram}" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>\n`;
      md += `</p>\n\n`;
    }

    // Support Me
    if (github) {
      md += `### ❤️ Support Me\n`;
      md += `[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="150" />](https://www.buymeacoffee.com/${github})\n`;
    }

    setMarkdown(md);
  }, [name, subtitle, description, github, twitter, linkedin, instagram, portfolio, skills, showStats, showStreak, showTopLangs, showVisitorCount]);

  const toggleSkill = (s) => {
    if (skills.includes(s)) {
      setSkills(skills.filter(i => i !== s));
    } else {
      setSkills([...skills, s]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <header style={{ padding: "2rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>← Back</Link>
        <h1 className="title-gradient" style={{ fontSize: "2rem" }}>Readme Generator</h1>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        
        {/* Editor */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxHeight: "80vh", overflowY: "auto" }}>
          <h2 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Profile Details</h2>
          
          <div className="form-group">
            <label className="label">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Praveen Kumar" />
          </div>
          
          <div className="form-group">
            <label className="label">Subtitle</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="input-field" placeholder="Full Stack Developer" />
          </div>

          <div className="form-group">
            <label className="label">About Me</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" rows={4} placeholder="I'm a Software and Web Developer..." />
          </div>

          <h2 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem", marginTop: "1rem" }}>Socials</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label className="label">GitHub</label><input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className="input-field" /></div>
            <div><label className="label">Twitter</label><input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="input-field" /></div>
            <div><label className="label">LinkedIn</label><input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="input-field" /></div>
            <div><label className="label">Instagram</label><input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="input-field" /></div>
          </div>

          <h2 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem", marginTop: "1rem" }}>Stats Widgets</h2>
           <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <label className="checkbox-label"><input type="checkbox" checked={showStats} onChange={(e) => setShowStats(e.target.checked)} /> GitHub Stats</label>
              <label className="checkbox-label"><input type="checkbox" checked={showStreak} onChange={(e) => setShowStreak(e.target.checked)} /> Streak Stats</label>
              <label className="checkbox-label"><input type="checkbox" checked={showTopLangs} onChange={(e) => setShowTopLangs(e.target.checked)} /> Top Languages</label>
              <label className="checkbox-label"><input type="checkbox" checked={showVisitorCount} onChange={(e) => setShowVisitorCount(e.target.checked)} /> Visitor Count</label>
           </div>

          <h2 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem", marginTop: "1rem" }}>Tech Stack</h2>
          {Object.entries(techStacks).map(([category, items]) => (
            <div key={category} style={{ marginBottom: "1rem" }}>
              <h4 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>{category}</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {items.map(t => (
                  <button 
                    key={t}
                    onClick={() => toggleSkill(t)}
                    style={{
                      padding: "0.3rem 0.6rem",
                      borderRadius: "4px",
                      background: skills.includes(t) ? "var(--accent-primary)" : "rgba(255,255,255,0.05)",
                      color: skills.includes(t) ? "white" : "var(--text-secondary)",
                      fontSize: "0.8rem",
                      border: "1px solid var(--border-subtle)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxHeight: "80vh", overflowY: "auto" }}>
          
          <div className="glass-panel" style={{ minHeight: "200px" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Preview</h3>
            <div 
              style={{ background: "#0d1117", padding: "1.5rem", borderRadius: "8px", border: "1px solid #30363d", color: "#c9d1d9", fontFamily: "sans-serif" }}
              className="markdown-preview"
            >
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                components={{
                  img: ({node, ...props}) => <img style={{maxWidth: '100%'}} {...props} />
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>

          <div className="glass-panel" style={{ flexGrow: 1 }}>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem" }}>Markdown Code</h3>
              <button onClick={copyToClipboard} className="btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }}>Copy</button>
            </div>
            <textarea 
              readOnly 
              value={markdown} 
              className="input-field" 
              style={{ height: "300px", fontFamily: "monospace", fontSize: "0.9rem" }} 
            />
          </div>

        </div>

      </div>
      <style jsx>{`
        .label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        /* Custom scrollbar for panels */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: var(--border-strong);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
