'use client';

import { useState } from 'react';

import { ArrowUpFromLine, Plus } from 'lucide-react';

import { Modal } from '@/app/components/ui/Modal';
import { TextInput } from '@/app/components/ui/TextInput';
import { TextArea } from '@/app/components/ui/TextArea';
import { Button } from '@/app/components/ui/Button';

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
        <div className="bg-background-primary p-8 rounded-[1.25rem] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Novo projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[6.25rem] h-[6.25rem] rounded-xl bg-border-tertiary overflow-hidden">
                <button className="w-full h-full">100X100</button>
              </div>
              <button className="text-white flex items-center gap-2">
                <ArrowUpFromLine />
                <span className="">Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="image-input"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex flex-col gap-4 w-[18.3125rem]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">
                  Título do projeto
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-white font-bold"
                >
                  Descrição do projeto
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Descrição do projeto"
                  className="h-[2.25rem]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">
                  URL do projeto
                </label>
                <TextInput
                  id="project-url"
                  type="url"
                  placeholder="URL do projeto"
                  className="h-[2.25rem]"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white">Voltar</button>
            <Button>Salvar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
