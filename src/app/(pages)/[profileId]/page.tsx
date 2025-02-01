import { notFound, redirect } from 'next/navigation';

import Link from 'next/link';

import { auth } from '@/app/lib/auth';
import { getDownloadUrlFromPath } from '@/app/lib/firebase';

import {
  getProfileData,
  getProfileProjects,
} from '@/app/server/get-profile-data';

import { UserCard } from '@/app/components/commons/UserCard';
import { ProjectCard } from '@/app/components/commons/ProjectCard';
import { TotalVisits } from '@/app/components/commons/TotalVisits';

import { NewProject } from './NewProject';
import { increaseProfileVisits } from '@/app/actions/increase-profile-visits';

export default async function Profile({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();

  const projects = await getProfileProjects(profileId);

  const session = await auth();

  const isOwner = profileData.userId === session?.user?.id;

  if (isOwner) {
    await increaseProfileVisits(profileId);
  }

  if (isOwner && !session.user.isSubscribed && !session?.user.isTrial) {
    redirect(`/${profileId}/upgrade`);
  }

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      {session?.user.isTrial && !session.user.isSubscribed && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
          <Link href={`/${profileId}/upgrade`}>
            <span>Você está usando a versão trial.</span>
            <button className="text-accent-green font-bold">
              Faça o upgrade agora!
            </button>
          </Link>
        </div>
      )}

      <div className="w-1/2 flex justify-center h-min">
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>
      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={(await getDownloadUrlFromPath(project.imagePath)) || ''}
          />
        ))}

        {isOwner && <NewProject profileId={profileId} />}
      </div>
      {isOwner && (
        <div className="absolute bottom-6 right-0 left-0 w-min mx-auto">
          <TotalVisits totalVisits={profileData.totalVisits} showBar />
        </div>
      )}
    </div>
  );
}
