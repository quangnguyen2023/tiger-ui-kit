import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="font-medium flex flex-col justify-center">
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

        <DropdownMenuSeparator className="bg-gray-200" />

        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/sign-in' })}>
          <LogOut /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
