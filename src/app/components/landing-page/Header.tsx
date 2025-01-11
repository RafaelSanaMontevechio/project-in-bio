import { auth } from '@/app/lib/auth';
import { managerAuth } from '@/app/actions/manager-auth';

import { Button } from '../ui/Button';

export async function Header() {
  const session = await auth();

  return (
    <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="logo" />
        <h3 className="text-white text-2xl font-bold">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">
        {session && <Button>Minha página</Button>}

        <form action={managerAuth}>
          <Button>{session ? ' Sair' : 'Login'}</Button>
        </form>
      </div>
    </div>
  );
}
