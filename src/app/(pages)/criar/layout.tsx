import React from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@/app/lib/auth';
import { getProfileId } from '@/app/server/get-profile-data';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect('/');

  const profileId = await getProfileId(session.user?.id as string);

  if (profileId) redirect(`/${profileId}`);

  return <>{children}</>;
}
