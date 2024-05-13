import React from 'react';
import { useUser } from '../context/useContext';
import admin from "../assets/admin.png";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

function DashboardProfile() {
  const { user } = useUser();
  console.log('User Data:', user);

  return (
    <Card className="h-[calc(114vh)] w-full max-w-[200rem] shadow-blue-gray-900/5 text-white">
      <CardHeader floated={false} className="h-[calc(110vh)] bshadow-blue-gray-900/5 text-white" style={{marginTop: '10px'}}>
        <img src={admin} alt="profile-picture" className="rounded-partial mx-auto" style={{marginTop: '50px'}}/>
      
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {user.fullname}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {user.email}  
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {user.phone}  
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
      </CardHeader>
    </Card>
  );
}

export default DashboardProfile;
