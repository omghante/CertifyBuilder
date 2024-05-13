import React from 'react';
import { List, ListItem, Card, CardHeader } from "@material-tailwind/react";

function DashboardSetting() {
  return (
    <Card className="h-[calc(114vh)] w-full max-w-[200rem] shadow-blue-gray-900/5 text-white">
       <Card className="h-[calc(114vh)] bshadow-blue-gray-900/5 text-white">
      <List>
        <a href="#" className="text-initial">
          <ListItem>Personal Information</ListItem>
        </a>
        <a href="#" className="text-initial">
          <ListItem>Language</ListItem>
        </a>
        <a href="#" className="text-initial">
          <ListItem>Content Language</ListItem>
        </a>
        <a href="#" className="text-initial">
          <ListItem>Sync Calendar</ListItem>
        </a>
        <a href="#" className="text-initial">
          <ListItem>Sync Time</ListItem>
        </a>
        <a href="#" className="text-initial">
          <ListItem>About Us</ListItem>
        </a>
        <a href="#" className="text-initial">
          <ListItem>Dark Mode</ListItem>
        </a>
      </List>
    </Card>
    </Card>
  );
}

export default DashboardSetting;
