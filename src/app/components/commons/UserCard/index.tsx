import Link from 'next/link';

import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Plus,
} from 'lucide-react';

import { ProfileData } from '@/app/server/get-profile-data';

import { Button } from '../../ui/Button';

import EditSocialLinks from './EditSocialLinks';

export function UserCard({ profileData }: { profileData: ProfileData }) {
  const icons = [Github, Instagram, Linkedin, Twitter];

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img
          src="https://avatars.githubusercontent.com/u/25842800?v=4"
          alt=""
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-h-0 overflow-hidden">Rafael</h3>
        </div>
        <p className="opacity-40">"Eu faço produtos para a internet"</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex gap-3 justify-between">
          {profileData.socialMedias?.github && (
            <Link
              href={profileData.socialMedias.github}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Github />
            </Link>
          )}

          {profileData.socialMedias?.instagram && (
            <Link
              href={profileData.socialMedias?.instagram}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Instagram />
            </Link>
          )}

          {profileData.socialMedias?.linkedin && (
            <Link
              href={profileData.socialMedias?.linkedin}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Linkedin />
            </Link>
          )}

          {profileData.socialMedias?.twitter && (
            <Link
              href={profileData.socialMedias?.twitter}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Twitter />
            </Link>
          )}

          {/* {icons.map((Icon, i) => (
            <button
              key={i}
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Icon />
            </button>
          ))} */}
          <EditSocialLinks socialMedias={profileData.socialMedias} />
        </div>
        <div className="flex flex-col gap-3 w-full h-[172px]">
          <div className="w-full flex flex-col items-center gap-3">
            <Button className="w-full">Template SaaS - Compre agora</Button>
            <button className="p-3 rounded-xl bg-[#1E1E1E]  hover:bg-[#2E2E2E]">
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
