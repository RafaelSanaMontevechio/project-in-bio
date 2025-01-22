'use client';

import { JSX, startTransition, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react';

import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { TextInput } from '../../ui/TextInput';
import { createSocialLinks } from '@/app/actions/create-social-links';

export default function EditSocialLinks({
  socialMedias = {
    github: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },
}: {
  socialMedias?: {
    github: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [github, setGithub] = useState(socialMedias.github || '');
  const [twitter, setTwitter] = useState(socialMedias.github || '');
  const [linkedin, setLinkedin] = useState(socialMedias.github || '');
  const [instagram, setInstagram] = useState(socialMedias.github || '');
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false);

  const router = useRouter();
  const { profileId } = useParams();

  const socialLinks = [
    {
      icon: <Github />,
      placeholder: 'Link Github',
      value: github,
      onChange: setGithub,
    },
    {
      icon: <Linkedin />,
      placeholder: 'Link LinkedIn',
      value: linkedin,
      onChange: setLinkedin,
    },
    {
      icon: <Instagram />,
      placeholder: 'Link Instagram',
      value: instagram,
      onChange: setInstagram,
    },
    {
      icon: <Twitter />,
      placeholder: 'Link Twitter',
      value: twitter,
      onChange: setTwitter,
    },
  ];

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true);

    if (!profileId) return;

    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter,
    });

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingSocialLinks(false);
      router.refresh();
    });
  }

  function SocialInput({
    icon,
    placeholder,
    value,
    onChange,
  }: {
    icon: JSX.Element;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  }) {
    return (
      <div className="flex items-center gap-2 w-full">
        {icon}
        <TextInput
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={placeholder}
          className="flex-1"
        />
      </div>
    );
  }

  return (
    <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
      <p className="text-white font-bold text-xl">Adicionar redes sociais</p>
      <div className="flex flex-col gap-4">
        {socialLinks.map(({ icon, placeholder, value, onChange }, index) => (
          <SocialInput
            key={index}
            icon={icon}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        ))}
      </div>
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => setIsModalOpen(false)}
          className="font-bold text-white hover:underline focus:outline-none"
        >
          Voltar
        </button>
        <Button
          onClick={handleAddSocialLinks}
          disabled={isSavingSocialLinks}
          className={`transition ${
            isSavingSocialLinks ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
