export default function Footer() {
    return (
      <footer style={{
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "auto",
        padding: "2rem 0",
        background: "var(--bg-secondary)"
      }}>
        <div className="container" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          color: "var(--text-muted)",
          fontSize: "0.9rem"
        }}>
          <p>&copy; {new Date().getFullYear()} GitHub Profile Tools. All rights reserved.</p>
          
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a 
              href="https://github.com/praveen2git/github-readme-streak-stats" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
            <a 
              href="https://github.com/sponsors/praveen2git" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M19 14c1.49-1.28 3.6-2.35 4.57-4.25A4.75 4.75 0 0 0 12 5.5a4.75 4.75 0 0 0-11.57 4.25C1.4 11.65 3.51 12.72 5 14c1.61 1.38 3.2 2.95 3.2 5.37h7.6c0-2.43 1.59-4 3.2-5.38Z"></path>
               </svg>
              Sponsor
            </a>
          </div>
        </div>
      </footer>
    );
  }
