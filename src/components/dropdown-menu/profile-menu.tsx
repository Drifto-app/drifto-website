import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bolt,
  ExternalLink,
  Filter,
  LogIn,
  LogOut,
  Rocket,
  Settings2,
  User,
} from "lucide-react";
import {CgProfile} from "react-icons/cg";

interface Props {
  username: string;
  profilePicture?: string
}

export default function ProfileMenu({
  username, profilePicture
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={profilePicture} alt="profile picture" />
          <AvatarFallback className="bg-neutral-800 text-primary-foreground">
            <CgProfile />
          </AvatarFallback>
        </Avatar>
        <div className="text-start flex flex-col">
          <p className="text-base font-medium">{username}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-72">
        <DropdownMenuItem className="py-3">
          <Avatar>
            <AvatarImage src={profilePicture} alt="profile picture" />
            <AvatarFallback className="bg-neutral-800 text-primary-foreground">
              <CgProfile />
            </AvatarFallback>
          </Avatar>
          <div className="ml-1 flex flex-col">
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">My Account</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex-col items-start">
          <div className="flex items-center gap-1">
            <Rocket className="mr-1 h-[18px] w-[18px]" />
            <span className="font-medium leading-none">Upgrade</span>
          </div>
          <p className="text-muted-foreground">
            You&apos;re on a free version of Slack.
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-1" /> Invite people
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings2 className="mr-1" /> Preferences
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Filter className="mr-1" />
            Filter sidebar
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Activity</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem checked>
                  All activity
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Unread messaged only
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Mentions only
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Customize by section
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>People</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem checked>
                  Everyone
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Without external people
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Including external people
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Bolt className="mr-1" />
            Tools & settings
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-52">
            <DropdownMenuLabel>Tools</DropdownMenuLabel>
            <DropdownMenuItem>Customize workspace</DropdownMenuItem>
            <DropdownMenuItem>Workspace builder</DropdownMenuItem>
            <DropdownMenuItem>
              Workspace analytics <ExternalLink className="ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Administration</DropdownMenuLabel>
            <DropdownMenuItem>Manage apps</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogIn className="mr-1" /> Sign in on mobile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-1" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
