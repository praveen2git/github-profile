"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ReadmeGenerator() {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [skills, setSkills] = useState([]);
  
  const [markdown, setMarkdown] = useState("");

  const techStack = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "React", "Next.js", 
    "Vue.js", "Node.js", "Go", "Rust", "Docker", "Kubernetes", "AWS"
  ];

  useEffect(() => {
    let md = "";
    if (name) md += `# Hi there 👋, I'm ${name}\n\n`;
    if (subtitle) md += `### ${subtitle}\n\n`;
    if (description) md += `${description}\n\n`;
    
    if (skills.length > 0) {
      md += `### 🛠 Skills\n`;
      md += skills.map(s => `![${s}](https://img.shields.io/badge/${s}-black?style=flat-square&logo=${s.toLowerCase()})`).join(" ") + "\n\n";
    }

    if (github || twitter || linkedin) {
      md += `### 🔗 Connect with me\n`;
      if (github) md += `[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${github}) `;
      if (twitter) md += `[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${twitter}) `;
      if (linkedin) md += `[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${linkedin}) `;
      md += "\n\n";
    }

    setMarkdown(md);
  }, [name, subtitle, description, github, twitter, linkedin, skills]);

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
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h2 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Profile Details</h2>
          
          <div>
            <label className="label">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="John Doe" />
          </div>
          
          <div>
            <label className="label">Subtitle</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="input-field" placeholder="Full Stack Developer" />
          </div>

          <div>
            <label className="label">About Me</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" rows={4} placeholder="I'm currently working on..." />
          </div>

          <h2 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem", marginTop: "1rem" }}>Socials</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label className="label">GitHub Username</label>
              <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">Twitter Username</label>
              <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">LinkedIn Username</label>
              <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="input-field" />
            </div>
          </div>

          <h2 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem", marginTop: "1rem" }}>Tech Stack</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {techStack.map(t => (
              <button 
                key={t}
                onClick={() => toggleSkill(t)}
                style={{
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  background: skills.includes(t) ? "var(--accent-primary)" : "rgba(255,255,255,0.05)",
                  color: skills.includes(t) ? "white" : "var(--text-secondary)",
                  fontSize: "0.8rem",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                {t}
              </button>
            ))}
          </div>

        </div>

        {/* Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div className="glass-panel" style={{ minHeight: "200px" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Preview</h3>
            <div 
              style={{ background: "#0d1117", padding: "1.5rem", borderRadius: "8px", border: "1px solid #30363d", color: "#c9d1d9", fontFamily: "sans-serif", whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: markdown.replace(/\n/g, '<br/>') }} // Very basic preview
            />
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
      `}</style>
    </div>
  );
}
