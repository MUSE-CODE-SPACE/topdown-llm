import "./globals.css";

export const metadata = {
  title: "Muse — Top-Down LLM",
  description: "Build a real AI assistant, top-down.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
