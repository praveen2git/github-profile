"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { skillIcons } from "./skills";

export default function ReadmeGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // --- State ---

  // Step 1: Basic Info
  const [githubUsername, setGithubUsername] = useState("");
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [workingOn, setWorkingOn] = useState("");
  const [learning, setLearning] = useState("");
  const [collaborating, setCollaborating] = useState("");
  const [helping, setHelping] = useState("");
  const [askMe, setAskMe] = useState("");
  const [reachMe, setReachMe] = useState("");
  const [funFact, setFunFact] = useState("");

  // Step 2: Enhancements
  const [showVisitorCount, setShowVisitorCount] = useState(true);
  const [twitterBadge, setTwitterBadge] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState("");

  // Step 3: Socials & Links
  const [portfolio, setPortfolio] = useState("");
  const [blog, setBlog] = useState("");
  const [resume, setResume] = useState("");
  const [socials, setSocials] = useState({
    github: "",
    twitter: "",
    linkedin: "",
    devto: "",
    medium: "",
    stackoverflow: "",
    instagram: "",
    youtube: "",
    dribbble: "",
    behance: "",
  });

  // Step 4: Skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkills, setCustomSkills] = useState([]); // { name, logo }
  const [skillSearch, setSkillSearch] = useState("");
  const [skillCategory, setSkillCategory] = useState("all");

  // Step 5: Stats Widgets
  const [showGithubStats, setShowGithubStats] = useState(true);
  const [showStreak, setShowStreak] = useState(true);
  const [showTopLangs, setShowTopLangs] = useState(true);
  const [showTrophy, setShowTrophy] = useState(true);
  const [statsTheme, setStatsTheme] = useState("radical");

  // Step 6: Preview
  const [markdown, setMarkdown] = useState("");
  const [viewMode, setViewMode] = useState("preview"); // "preview" | "markdown"

  // --- Effects ---

  useEffect(() => {
    generateMarkdown();
  }, [
    name, subtitle, workingOn, learning, collaborating, helping, askMe, reachMe, funFact,
    showVisitorCount, twitterBadge, twitterUsername,
    portfolio, blog, resume, socials,
    selectedSkills, customSkills,
    showGithubStats, showStreak, showTopLangs, showTrophy, statsTheme,
    githubUsername
  ]);

  // --- Logic ---

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      toast.info(`Step ${currentStep + 1}: ${getStepTitle(currentStep + 1)}`);
      window.scrollTo(0, 0); 
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const jumpToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const getStepTitle = (step) => {
    switch(step) {
      case 1: return "Basic Information";
      case 2: return "Enhancements";
      case 3: return "Socials & Links";
      case 4: return "Skills";
      case 5: return "Statistics";
      case 6: return "Preview & Generate";
      default: return "";
    }
  };

  const autoFillGithub = async () => {
    if (!githubUsername) {
      toast.error("Please enter a GitHub username first");
      return;
    }
    const toastId = toast.loading("Fetching GitHub profile...");
    try {
      const res = await fetch(`https://api.github.com/users/${githubUsername}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      
      setName(data.name || data.login);
      setSubtitle(data.bio || "A passionate developer");
      if (data.blog) setPortfolio(data.blog);
      if (data.twitter_username) {
        setTwitterUsername(data.twitter_username);
        setSocials(prev => ({ ...prev, twitter: data.twitter_username, github: data.login }));
      } else {
        setSocials(prev => ({ ...prev, github: data.login }));
      }
      
      toast.success("Profile data autofilled!", { id: toastId });
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch GitHub profile", { id: toastId });
    }
  };

  const toggleSkill = (skill) => {
    const exists = selectedSkills.find(s => s.name === skill.name);
    if (exists) {
      setSelectedSkills(selectedSkills.filter(s => s.name !== skill.name));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const generateMarkdown = () => {
    let md = "";

    // 1. Header
    if (name) md += `# Hi there 👋, I'm ${name}\n\n`;
    if (subtitle) md += `### ${subtitle}\n\n`;
    
    // 2. Enhancements (Badges)
    let badges = [];
    if (showVisitorCount && socials.github) {
       badges.push(`![Visitor Count](https://profile-counter.glitch.me/${socials.github}/count.svg)`);
    }
    if (twitterBadge && twitterUsername) {
       badges.push(`[![Twitter Follow](https://img.shields.io/twitter/follow/${twitterUsername}?style=social)](https://twitter.com/${twitterUsername})`);
    }
    if (badges.length > 0) {
      md += `<p align="left">${badges.join(" ")}</p>\n\n`;
    }

    // 3. About Me Sections
    if (workingOn) md += `- 🔭 I’m currently working on **${workingOn}**\n`;
    if (learning) md += `- 🌱 I’m currently learning **${learning}**\n`;
    if (collaborating) md += `- 👯 I’m looking to collaborate on **${collaborating}**\n`;
    if (helping) md += `- 🤝 I’m looking for help with **${helping}**\n`;
    if (askMe) md += `- 💬 Ask me about **${askMe}**\n`;
    if (reachMe) md += `- 📫 How to reach me **${reachMe}**\n`;
    if (funFact) md += `- ⚡ Fun fact **${funFact}**\n`;
    md += "\n";

    // 4. Socials & Links
    const socialBadges = [];
    const addSocial = (platform, user, color, logo) => {
      if (user) socialBadges.push(`<a href="https://${platform}.com/${user}" target="_blank"><img src="https://img.shields.io/badge/${platform}-${color}?style=for-the-badge&logo=${logo}&logoColor=white" alt="${platform}" /></a>`);
    };
    
    // Custom logic for different URLs
    if (portfolio) socialBadges.push(`<a href="${portfolio}" target="_blank"><img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio" /></a>`);
    if (blog) socialBadges.push(`<a href="${blog}" target="_blank"><img src="https://img.shields.io/badge/Blog-FF9900?style=for-the-badge&logo=blogger&logoColor=white" alt="Blog" /></a>`);
    if (resume) socialBadges.push(`<a href="${resume}" target="_blank"><img src="https://img.shields.io/badge/Resume-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Resume" /></a>`);
    
    if (socials.github) addSocial("github", socials.github, "181717", "github");
    if (socials.twitter) addSocial("twitter", socials.twitter, "1DA1F2", "twitter");
    if (socials.linkedin) addSocial("linkedin", "in/" + socials.linkedin, "0077B5", "linkedin");
    if (socials.devto) addSocial("dev.to", socials.devto, "0A0A0A", "dev.to");
    if (socials.instagram) addSocial("instagram", socials.instagram, "E4405F", "instagram");
    if (socials.youtube) addSocial("youtube", socials.youtube, "FF0000", "youtube");
    if (socials.stackoverflow) addSocial("stackoverflow", "users/" + socials.stackoverflow, "F58025", "stackoverflow");

    if (socialBadges.length > 0) {
      md += `### 🔗 Connect with me\n<p align="left">\n${socialBadges.join(" ")}\n</p>\n\n`;
    }

    // 5. Skills
    if (selectedSkills.length > 0 || customSkills.length > 0) {
      md += `### 🛠 Languages and Tools\n<p align="left">\n`;
      selectedSkills.forEach(s => {
        md += ` <a href="https://skillicons.dev" target="_blank"> <img src="https://skillicons.dev/icons?i=${s.icon}" alt="${s.name}" /> </a> `;
      });
      customSkills.forEach(s => {
         md += ` <img src="https://img.shields.io/badge/${s.name}-black?style=flat-square&logo=${s.logo}&logoColor=white" alt="${s.name}" /> `;
      });
      md += `\n</p>\n\n`;
    }

    // 6. Stats
    if (socials.github) {
       md += `### 📊 GitHub Analytics\n\n`;
       
       if (showTrophy) {
          md += `<p align="left"> <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${socials.github}&theme=${statsTheme}&no-frame=false&no-bg=true&margin-w=4" alt="${socials.github}" /></a> </p>\n\n`;
       }

       md += `<p align="left">\n`;
       if (showGithubStats) {
         md += `<img src="https://github-readme-stats.vercel.app/api?username=${socials.github}&show_icons=true&theme=${statsTheme}&hide_border=true&bg_color=00000000" alt="${socials.github}" />\n`;
       }
       if (showStreak) {
         md += `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${socials.github}&theme=${statsTheme}&hide_border=true&background=00000000" alt="${socials.github}" />\n`;
       }
       if (showTopLangs) {
         md += `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${socials.github}&layout=compact&theme=${statsTheme}&hide_border=true&bg_color=00000000" alt="${socials.github}" />\n`;
       }
       md += `</p>\n\n`;
    }

    setMarkdown(md);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  // --- Render Steps ---

  const renderStep1 = () => (
    <div className="glass-panel slide-in">
       <div className="panel-header border-b border-border pb-4 mb-6">
         <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Basic Information</h2>
              <p className="subtitle">Tell us about yourself and what you do</p>
            </div>
            {/* Future: Add Clear All button here */}
         </div>
       </div>
       
       {/* GitHub Autofill Box */}
       <div className="autofill-box mb-6">
          <div className="flex items-start gap-4 mb-3">
             <span className="text-2xl">🚀</span>
             <div className="flex-1">
                <h3 className="font-semibold text-sm">Quick Start with GitHub</h3>
                <p className="text-sm text-muted">Enter your GitHub username to automatically populate your profile.</p>
             </div>
          </div>
          <div className="flex gap-2">
             <input type="text" value={githubUsername} onChange={e => setGithubUsername(e.target.value)} className="input-field flex-1" placeholder="e.g. praveen2git" />
             <button onClick={autoFillGithub} className="btn-secondary">Auto-fill</button>
          </div>
       </div>

       <div className="grid-2">
          <div className="input-group">
            <label className="label">Your Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label className="label">Subtitle</label>
            <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="input-field" placeholder="A passionate developer" />
          </div>
       </div>

          <div className="input-group mt-4">
            <label className="label">🔭 I’m currently working on</label>
            <input type="text" value={workingOn} onChange={e => setWorkingOn(e.target.value)} className="input-field" />
          </div>
          <div className="input-group">
            <label className="label">🌱 I’m currently learning</label>
            <input type="text" value={learning} onChange={e => setLearning(e.target.value)} className="input-field" />
          </div>
          <div className="input-group">
            <label className="label">👯 I’m looking to collaborate on</label>
            <input type="text" value={collaborating} onChange={e => setCollaborating(e.target.value)} className="input-field" />
          </div>
          <div className="input-group">
            <label className="label">🤝 I’m looking for help with</label>
            <input type="text" value={helping} onChange={e => setHelping(e.target.value)} className="input-field" />
          </div>
          <div className="input-group">
            <label className="label">💬 Ask me about</label>
            <input type="text" value={askMe} onChange={e => setAskMe(e.target.value)} className="input-field" />
          </div>
          <div className="input-group">
              <label className="label">📫 How to reach me</label>
              <input type="text" value={reachMe} onChange={e => setReachMe(e.target.value)} className="input-field" placeholder="your.email@example.com" />
          </div>
          <div className="input-group">
            <label className="label">⚡ Fun fact</label>
            <input type="text" value={funFact} onChange={e => setFunFact(e.target.value)} className="input-field" />
          </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="glass-panel slide-in">
      <div className="panel-header border-b border-border pb-4 mb-6">
         <h2 className="text-2xl font-bold">Profile Enhancements</h2>
         <p className="subtitle">Add visual statistics and achievements.</p>
       </div>

       <div className="bg-accent-subtle rounded-lg p-6 mb-4">
           <h4 className="flex items-center gap-2 font-semibold mb-2"><span>📊</span> Profile Enhancement</h4>
           <div className="checkbox-item" onClick={() => setShowVisitorCount(!showVisitorCount)}>
              <input type="checkbox" checked={showVisitorCount} readOnly />
              <span>Show profile visitors counter badge</span>
           </div>
       </div>

       <div className="bg-accent-subtle rounded-lg p-6">
           <h4 className="flex items-center gap-2 font-semibold mb-2"><span>🐦</span> Twitter Enhancement</h4>
           <div className="checkbox-item mb-3" onClick={() => setTwitterBadge(!twitterBadge)}>
              <input type="checkbox" checked={twitterBadge} readOnly />
              <span>Show Twitter follow badge</span>
           </div>
           {twitterBadge && (
             <div className="ml-6">
                <input type="text" value={twitterUsername} onChange={e => setTwitterUsername(e.target.value)} className="input-field" placeholder="Twitter username" />
                <p className="text-xs text-muted mt-1">Enter username only</p>
             </div>
           )}
       </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="glass-panel slide-in">
       <div className="panel-header border-b border-border pb-4 mb-6">
         <h2 className="text-2xl font-bold">Social Profiles</h2>
         <p className="subtitle">Connect your social media and coding platforms.</p>
       </div>

       {/* Instruction Banner */}
       <div className="autofill-box mb-6">
         <div className="flex gap-3">
            <div className="text-primary">ℹ️</div>
            <div>
               <h4 className="font-semibold text-sm">Enter usernames only</h4>
               <p className="text-sm text-muted">We'll automatically generate the correct URLs.</p>
               <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-success">✓ Correct: johndoe</span>
                  <span className="text-error">✗ Incorrect: https://...</span>
               </div>
            </div>
         </div>
       </div>

       <div className="grid-2">
         <div className="input-group"><label className="label">🐙 GitHub</label><input type="text" value={socials.github} onChange={e => setSocials({...socials, github: e.target.value})} className="input-field" placeholder="username" /></div>
         <div className="input-group"><label className="label">💼 LinkedIn</label><input type="text" value={socials.linkedin} onChange={e => setSocials({...socials, linkedin: e.target.value})} className="input-field" placeholder="username" /></div>
         <div className="input-group"><label className="label">🐦 Twitter</label><input type="text" value={socials.twitter} onChange={e => setSocials({...socials, twitter: e.target.value})} className="input-field" placeholder="username" /></div>
         <div className="input-group"><label className="label">📝 Dev.to</label><input type="text" value={socials.devto} onChange={e => setSocials({...socials, devto: e.target.value})} className="input-field" placeholder="username" /></div>
         <div className="input-group"><label className="label">📷 Instagram</label><input type="text" value={socials.instagram} onChange={e => setSocials({...socials, instagram: e.target.value})} className="input-field" placeholder="username" /></div>
         <div className="input-group"><label className="label">📺 YouTube</label><input type="text" value={socials.youtube} onChange={e => setSocials({...socials, youtube: e.target.value})} className="input-field" placeholder="channel-id" /></div>
         <div className="input-group"><label className="label">📚 StackOverflow</label><input type="text" value={socials.stackoverflow} onChange={e => setSocials({...socials, stackoverflow: e.target.value})} className="input-field" placeholder="userid" /></div>
       </div>

       <h3 className="text-lg font-bold mt-8 mb-4">Portfolio & Links</h3>
       <div className="grid-2">
         <div className="input-group"><label className="label">🌐 Portfolio Website</label><input type="text" value={portfolio} onChange={e => setPortfolio(e.target.value)} className="input-field" placeholder="https://..." /></div>
         <div className="input-group"><label className="label">✍️ Blog URL</label><input type="text" value={blog} onChange={e => setBlog(e.target.value)} className="input-field" placeholder="https://..." /></div>
         <div className="input-group"><label className="label">📄 Resume URL</label><input type="text" value={resume} onChange={e => setResume(e.target.value)} className="input-field" placeholder="https://..." /></div>
       </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="glass-panel slide-in">
       <div className="panel-header border-b border-border pb-4 mb-6">
         <h2 className="text-2xl font-bold">Skills & Technologies</h2>
         <p className="subtitle">Select the skills you want to showcase.</p>
       </div>

       <div className="flex flex-col sm:flex-row gap-4 mb-6">
         <input 
           type="text" 
           placeholder="Search skills..." 
           className="input-field flex-1" 
           value={skillSearch}
           onChange={e => setSkillSearch(e.target.value)}
         />
         <select className="input-field w-full sm:w-48" value={skillCategory} onChange={e => setSkillCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="core">Languages</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
            <option value="tools">Tools</option>
         </select>
       </div>

       <div className="skills-grid-container">
          {Object.entries(skillIcons).flatMap(([cat, skills]) => 
             skills
               .filter(s => (skillCategory === "all" || skillCategory === cat) && s.name.toLowerCase().includes(skillSearch.toLowerCase()))
               .map(s => {
                 const isSelected = selectedSkills.some(sel => sel.name === s.name);
                 return (
                 <button 
                  key={s.name} 
                  className={`skill-card ${isSelected ? 'active' : ''}`}
                  onClick={() => toggleSkill(s)}
                 >
                    <img src={`https://skillicons.dev/icons?i=${s.icon}`} width="32" height="32" className="skill-icon" />
                    <span className="skill-name">{s.name}</span>
                    {isSelected && <div className="skill-badge-dot"></div>}
                 </button>
               )})
          )}
       </div>

       {selectedSkills.length === 0 && (
         <div className="text-center py-8 text-muted">
            <p>Select at least one skill to continue</p>
         </div>
       )}
    </div>
  );

  const renderStep5 = () => (
    <div className="glass-panel slide-in">
      <div className="panel-header border-b border-border pb-4 mb-6">
         <h2 className="text-2xl font-bold">GitHub Analytics</h2>
         <p className="subtitle">Show off your stats with visual widgets.</p>
       </div>

       <div className="input-group mb-6">
         <label className="label">Theme</label>
         <select className="input-field" value={statsTheme} onChange={e => setStatsTheme(e.target.value)}>
            <option value="radical">Radical</option>
            <option value="tokyonight">Tokyo Night</option>
            <option value="dracula">Dracula</option>
            <option value="gruvbox">Gruvbox</option>
            <option value="dark">Dark</option>
            <option value="onedark">One Dark</option>
         </select>
       </div>

       <div className="grid gap-4 sm:grid-cols-2">
          <div className={`stat-card ${showGithubStats ? 'active' : ''}`} onClick={() => setShowGithubStats(!showGithubStats)}>
             <div className="flex justify-between items-start">
               <div>
                  <h4>GitHub Stats Card</h4>
                  <p>Stars, Commits, PRs</p>
               </div>
               <input type="checkbox" checked={showGithubStats} readOnly className="checkbox" />
             </div>
          </div>
          <div className={`stat-card ${showStreak ? 'active' : ''}`} onClick={() => setShowStreak(!showStreak)}>
             <div className="flex justify-between items-start">
               <div>
                  <h4>Streak Stats</h4>
                  <p>Current & Longest Streak</p>
               </div>
               <input type="checkbox" checked={showStreak} readOnly className="checkbox" />
             </div>
          </div>
          <div className={`stat-card ${showTopLangs ? 'active' : ''}`} onClick={() => setShowTopLangs(!showTopLangs)}>
             <div className="flex justify-between items-start">
               <div>
                  <h4>Top Languages</h4>
                  <p>Most used languages</p>
               </div>
               <input type="checkbox" checked={showTopLangs} readOnly className="checkbox" />
             </div>
          </div>
          <div className={`stat-card ${showTrophy ? 'active' : ''}`} onClick={() => setShowTrophy(!showTrophy)}>
             <div className="flex justify-between items-start">
               <div>
                  <h4>Trophy Case</h4>
                  <p>Achievements showcase</p>
               </div>
               <input type="checkbox" checked={showTrophy} readOnly className="checkbox" />
             </div>
          </div>
       </div>

    </div>
  );

  const renderStep6 = () => (
    <div className="glass-panel slide-in">
       <div className="panel-header border-b border-border pb-4 mb-6">
         <h2 className="text-2xl font-bold">Preview & Generate</h2>
         <p className="subtitle">Review your impressive profile!</p>
       </div>

       <div className="tabs mb-4">
          <button className={`tab-btn ${viewMode === "preview" ? "active" : ""}`} onClick={() => setViewMode("preview")}>Preview</button>
          <button className={`tab-btn ${viewMode === "markdown" ? "active" : ""}`} onClick={() => setViewMode("markdown")}>Markdown</button>
       </div>

       <div className="preview-container">
          {viewMode === "preview" ? (
             <div className="markdown-body">
               <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                components={{
                  img: ({node, ...props}) => <img style={{maxWidth: '100%'}} {...props} />
                }}
              >
                {markdown}
              </ReactMarkdown>
             </div>
          ) : (
             <textarea 
               className="code-editor" 
               value={markdown} 
               readOnly 
             />
          )}
       </div>

       <div className="action-buttons mt-6">
          <button className="btn-success w-full justify-center py-3" onClick={copyToClipboard}>
             Copy to Clipboard
          </button>
       </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 pb-12 max-w-4xl">
      <header className="page-header py-8 flex flex-col items-center relative">
        <Link href="/" className="back-link absolute left-0 top-10 text-muted hover:text-white transition-colors">
           ← Back
        </Link>
        <h1 className="title-gradient text-3xl font-bold mb-4">Readme Generator</h1>
        
        <div className="stepper flex gap-4">
           {Array.from({length: totalSteps}, (_, i) => i + 1).map(s => (
              <button 
                key={s} 
                className={`step-dot ${s <= currentStep ? "active" : ""}`} 
                onClick={() => jumpToStep(s)}
                title={getStepTitle(s)}
              >
                {s}
              </button>
           ))}
        </div>
      </header>

      <div className="wizard-content">
         {currentStep === 1 && renderStep1()}
         {currentStep === 2 && renderStep2()}
         {currentStep === 3 && renderStep3()}
         {currentStep === 4 && renderStep4()}
         {currentStep === 5 && renderStep5()}
         {currentStep === 6 && renderStep6()}
      </div>

      <div className="wizard-controls mt-8 flex justify-between">
         <button 
           className="btn-secondary px-6 py-2 rounded-lg disabled:opacity-50" 
           onClick={handlePrev} 
           disabled={currentStep === 1}
         >
           Previous
         </button>
         
         {currentStep < totalSteps ? (
            <button className="btn-primary px-6 py-2 rounded-lg" onClick={handleNext}>Next Step</button>
         ) : (
            <button className="btn-success px-6 py-2 rounded-lg" onClick={copyToClipboard}>Finish & Copy</button>
         )}
      </div>

      <style jsx global>{`
        /* --- General Layout --- */
        .grid-2 {
           display: grid;
           grid-template-columns: 1fr;
           gap: 1.5rem;
        }
        @media (min-width: 768px) {
           .grid-2 { grid-template-columns: 1fr 1fr; }
        }

        /* --- Stepper --- */
        .step-dot {
           width: 36px;
           height: 36px;
           border-radius: 50%;
           background: rgba(255,255,255,0.05);
           border: 1px solid rgba(255,255,255,0.1);
           display: flex;
           align-items: center;
           justify-content: center;
           font-weight: 600;
           color: var(--text-secondary);
           cursor: pointer;
           transition: all 0.2s;
        }
        .step-dot:hover {
           background: rgba(255,255,255,0.1);
           border-color: var(--text-primary);
        }
        .step-dot.active {
           background: var(--accent-primary);
           color: white;
           box-shadow: 0 0 10px var(--accent-glow);
           border-color: var(--accent-primary);
        }

        /* --- Components --- */
        .glass-panel {
           padding: 2rem;
           border: 1px solid var(--border-subtle);
           background: rgba(23, 23, 23, 0.7);
           border-radius: 12px;
           backdrop-filter: blur(10px);
        }
        
        .label {
           display: block;
           font-size: 0.9rem;
           font-weight: 500;
           margin-bottom: 0.5rem;
           color: var(--text-primary);
        }
        
        .input-field {
           width: 100%;
           padding: 0.75rem 1rem;
           background: rgba(0,0,0,0.2);
           border: 1px solid var(--border-subtle);
           border-radius: 6px;
           color: #fff;
           font-size: 0.95rem;
           transition: border-color 0.2s;
        }
        .input-field:focus {
           border-color: var(--accent-primary);
           outline: none;
        }

        /* --- Special Sections --- */
        .autofill-box {
           background: rgba(var(--accent-primary-rgb), 0.1);
           border: 1px solid rgba(var(--accent-primary-rgb), 0.2);
           border-radius: 8px;
           padding: 1.25rem;
        }
        
        .checkbox-item {
           display: flex;
           align-items: center;
           gap: 0.75rem;
           cursor: pointer;
           padding: 0.5rem 0;
        }
        
        /* --- Skills Grid --- */
        .skills-grid-container {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 0.75rem;
        }
        @media (min-width: 640px) { .skills-grid-container { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .skills-grid-container { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .skills-grid-container { grid-template-columns: repeat(5, 1fr); } }

        .skill-card {
           position: relative;
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 0.5rem;
           padding: 1rem;
           background: rgba(255,255,255,0.03);
           border: 2px solid transparent;
           border-radius: 8px;
           cursor: pointer;
           transition: all 0.2s;
           color: var(--text-secondary);
        }
        .skill-card:hover {
           background: rgba(255,255,255,0.06);
           transform: translateY(-2px);
        }
        .skill-card.active {
           background: rgba(var(--accent-primary-rgb), 0.15);
           border-color: var(--accent-primary);
           color: white;
        }
        .skill-icon {
           /* No invert needed for colorful icons */
        }
        .skill-card.active .skill-icon {
           /* No invert needed */
        }
        .skill-name {
           font-size: 0.8rem;
           text-align: center;
        }
        .skill-badge-dot {
           width: 8px;
           height: 8px;
           border-radius: 50%;
           background: var(--accent-primary);
           position: absolute;
           top: 8px;
           right: 8px;
        }

        /* --- Stats Cards --- */
        .stat-card {
           background: rgba(255,255,255,0.03);
           border: 1px solid var(--border-subtle);
           border-radius: 8px;
           padding: 1rem;
           cursor: pointer;
           transition: all 0.2s;
        }
        .stat-card:hover {
           background: rgba(255,255,255,0.06);
        }
        .stat-card.active {
           background: rgba(var(--accent-primary-rgb), 0.1);
           border-color: var(--accent-primary);
        }
        .checkbox {
           accent-color: var(--accent-primary);
           width: 1.2rem;
           height: 1.2rem;
        }

        /* --- Preview --- */
        .preview-container {
           min-height: 300px;
           background: #0d1117;
           border-radius: 8px;
           border: 1px solid #30363d;
           padding: 1.5rem;
           overflow-y: auto;
           max-height: 500px;
        }
        .code-editor {
           width: 100%;
           height: 400px;
           background: transparent;
           color: #c9d1d9;
           border: none;
           font-family: monospace;
           resize: vertical;
        }
        .tab-btn {
           padding: 0.5rem 1.5rem;
           border-bottom: 2px solid transparent;
           color: var(--text-secondary);
        }
        .tab-btn.active {
           color: white;
           border-bottom-color: var(--accent-primary);
        }
        
        /* Utility */
        .text-muted { color: var(--text-secondary); }
        .text-success { color: #4ade80; }
        .text-error { color: #f87171; }
        .bg-accent-subtle { background: rgba(255,255,255,0.03); }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mt-4 { margin-top: 1rem; }
        .p-6 { padding: 1.5rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .w-full { width: 100%; }
      `}</style>
    </div>
  );
}
