'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { Modal } from '@/app/components/ui/Modal';

export function NewProject({ profileId }: { profileId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border hover:border-dashed border-border-secondary">
        <Plus className="size-10 text-accent-green" />
        <span>Novo projeto</span>
      </button>

      <Modal isOpen={isOpen} setIsOpen={handleOpenModal}>
        Hello
      </Modal>
    </>
  );
}
