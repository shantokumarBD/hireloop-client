import React from 'react'

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const JobDetilsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params;

  return (
    <div>JobDetilsPage: {id}</div>
  );
}

export default JobDetilsPage;