import Link from "next/link";

export default function Home() {
  return (
    <div className="container" style={{ minHeight: "100vh", padding: "4rem 0" }}>
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 className="title-gradient" style={{ fontSize: "4rem", marginBottom: "1rem" }}>
          GitHub Profile Tools
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
          Supercharge your GitHub profile with our premium Readme Generator and Trophy Configurator.
        </p>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        
        {/* Readme Card */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Readme Generator</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", flexGrow: 1 }}>
            Create stunning profile READMEs with an easy-to-use editor. Add skills, social links, and stats widgets seamlessly.
          </p>
          <Link href="/readme" className="btn-primary" style={{ justifyContent: "center" }}>
            Create Readme
          </Link>
        </div>

        {/* Trophy Card */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Trophy Generator</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", flexGrow: 1 }}>
            Configure and display your GitHub Achievements trophies. Customize themes, ranks, and layouts.
          </p>
          <Link href="/trophy" className="btn-primary" style={{ justifyContent: "center" }}>
            Configure Trophies
          </Link>
        </div>

      </main>

      <footer style={{ marginTop: "6rem", textAlign: "center", color: "var(--text-muted)" }}>
        <p>&copy; {new Date().getFullYear()} GitHub Tools. Built with Next.js.</p>
      </footer>
    </div>
  );
}
