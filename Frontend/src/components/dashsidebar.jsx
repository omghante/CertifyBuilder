import { NavLink, Outlet } from 'react-router-dom';

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  InboxIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

function DashboardSidebar() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64">
        <Card className="h-[calc(120vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              CertifyBuilder
            </Typography>
          </div>
          <List>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink to="new">New Certificate</NavLink>
              <ListItemSuffix>
                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink to="profile">Profile</NavLink>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink to="settings">Settings</NavLink>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink to="/">Log Out</NavLink>
            </ListItem>
          </List>
        </Card>
      </div>
      {/* Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <Card className="h-[calc(114vh)] w-full max-w-[200rem]">
          <Outlet />
        </Card>
      </div>
    </div>
  );
}

export default DashboardSidebar;
