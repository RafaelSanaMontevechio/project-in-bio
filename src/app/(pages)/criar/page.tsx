import { Rocket } from 'lucide-react';

import { Header } from '@/app/components/landing-page/Header';

import { CreateLinkForm } from './CreateLinkForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project in bio - criar',
  description: 'Project in bio description',
};

export default function CreatePage() {
  return (
    <div>
      <Header />
      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div>
        <CreateLinkForm />
      </div>
    </div>
  );
}
