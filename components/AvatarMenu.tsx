import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

type AvatarMenuProps = {};

const AvatarMenu = ({}: AvatarMenuProps) => {
  const { data } = useSession();

  const user = {
    name: data?.user?.name ?? '---',
    avatar: data?.user?.image ?? 'https://github.com/shadcn.png',
    email: data?.user?.email ?? '---',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <Avatar className="h-9 w-9 border border-gray-100 shadow">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col justify-center space-y-2 px-2 py-1.5 font-medium">
        <DropdownMenuLabel className="flex gap-2">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-xs text-gray-400">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() =>
            signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` })
          }
        >
          <LogOut /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
