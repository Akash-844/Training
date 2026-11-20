export default function RecruiterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Recruiter Dashboard</h1>

      {children}
    </div>
  );
}
