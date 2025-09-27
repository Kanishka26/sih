'use client';
import { useRouter } from 'next/navigation';
import {
  Languages,
  UserCircle,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage } from '@/context/language-context';
import { useUser } from '@/context/user-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export function AppHeader() {
  const { toggleLanguage } = useLanguage();
  const { user, logout } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  const handleProfileClick = () => {
    router.push('/profile');
  };
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1" />
      <Button variant="ghost" size="icon" onClick={toggleLanguage}>
        <Languages className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle language</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full p-0">
            {user?.profilePicture ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <UserCircle className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
