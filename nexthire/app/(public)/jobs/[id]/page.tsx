type JobDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};
export default async function JobDetails({ params }: JobDetailsProps) {
  const { id } = await params;

  return <h1>Job ID:{id}</h1>;
}
