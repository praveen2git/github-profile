import Link from "next/link";

export default function Home() {
  return (
    <div className="container" style={{ padding: "4rem 0" }}>
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

        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Streak Stats</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", flexGrow: 1 }}>
            Display your daily coding streak and contributions in a stylish SVG card.
          </p>
          <Link href="/streak" className="btn-primary" style={{ justifyContent: "center" }}>
            Generate Streak
          </Link>
        </div>

        {/* Visitor Counter Card */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Visitor Counter</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", flexGrow: 1 }}>
            Track profile visits with a customizable SVG badge.
          </p>
          <Link href="/visitor" className="btn-primary" style={{ justifyContent: "center" }}>
            Create Counter
          </Link>
        </div>

      </main>


    </div>
  );
}
