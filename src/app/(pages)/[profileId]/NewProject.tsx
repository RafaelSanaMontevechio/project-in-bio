'use client';

import { ChangeEvent, startTransition, useState } from 'react';

import { ArrowUpFromLine, Plus } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Modal } from '@/app/components/ui/Modal';
import { Button } from '@/app/components/ui/Button';
import { TextArea } from '@/app/components/ui/TextArea';
import { TextInput } from '@/app/components/ui/TextInput';
import { compressFiles } from '@/app/lib/utils';
import { createProject } from '@/app/actions/create-project';

export function NewProject({ profileId }: { profileId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const router = useRouter();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  function handleImageInput(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      return imageUrl;
    }

    return null;
  }

  async function handleCreateProject() {
    setIsCreatingProject(true);

    const imagesInput = document.getElementById(
      'imageInput',
    ) as HTMLInputElement;

    if (!imagesInput.files?.length) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    const formData = new FormData();
    formData.append('file', compressedFile[0]);
    formData.append('profileId', profileId);
    formData.append('projectName', projectName);
    formData.append('projectDescription', projectDescription);
    formData.append('projectUrl', projectUrl);

    await createProject(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsCreatingProject(false);
      setProjectName('');
      setProjectDescription('');
      setProjectUrl('');
      setProjectImage(null);
      router.refresh();
    });
  }

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
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Project Image"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    className="w-full h-full"
                    onClick={() => triggerImageInput('imageInput')}
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput('image-input')}
              >
                <ArrowUpFromLine />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="image-input"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))}
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
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
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
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
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
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>
            <Button onClick={handleCreateProject} disabled={isCreatingProject}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
