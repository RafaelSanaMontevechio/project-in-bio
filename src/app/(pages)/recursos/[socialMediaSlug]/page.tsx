export default async function LinkInBio({
  params,
}: {
  params: Promise<{ socialMediaSlug: string }>;
}) {
  const { socialMediaSlug } = await params;
  return <></>;
}
