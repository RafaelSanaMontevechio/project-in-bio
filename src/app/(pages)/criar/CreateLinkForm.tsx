'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import { sanitizeLink } from '@/app/lib/utils';

import { verifyLink } from '@/app/actions/verify-link';
import { createLink } from '@/app/actions/create-link';

import { Button } from '@/app/components/ui/Button';
import { TextInput } from '@/app/components/ui/TextInput';
import { useRouter } from 'next/navigation';

export function CreateLinkForm() {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  function onLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));
    setError('');
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (link.length === 0) return setError('Link não deve ser nulo!');

    const linkAlreadyExists = await verifyLink(link);

    if (linkAlreadyExists) return setError('Link já existe, escolha outro!');

    const isLinkCreated = await createLink(link);

    if (!isLinkCreated) return setError('Erro ao criar perfil!');

    router.push(`/${link}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <span>projectinbio.com/</span>
        <TextInput value={link} onChange={onLinkChange} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      {error && (
        <div>
          <span className="text-accent-pink">{error}</span>
        </div>
      )}
    </>
  );
}
