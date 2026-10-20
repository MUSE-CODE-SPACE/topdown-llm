export const metadata = { title: "나만의 AI 비서" };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f4f4f5" }}>
        {children}
      </body>
    </html>
  );
}
