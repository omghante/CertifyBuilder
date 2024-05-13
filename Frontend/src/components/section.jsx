import React from 'react';
import img from '../assets/section.png';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function HomeSection() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  return (
    <Card className="mt-6 mx-auto h-72 flex items-start justify-center" style={{ width: '1140px', height: '600px' }}>
      <CardBody>
        <figure>
          <img
            className="h-96 w-full rounded-lg object-cover object-center"
            src={img}
            alt="nature image"
          />
        </figure>
        <Typography variant="h2" color="blue-gray" className="mb-2" style={{ marginTop: '20px' }}>
          Certificate Generation System
        </Typography>

        <Typography>
          "A MERN-based system for easy certificate generation and management. Admins input details, 
          triggering automatic PDF creation saved securely on Google Drive. 
          Links to certificates, along with student emails, are stored for quick access."
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleOpen} variant="gradient">
          Get Started
        </Button>
        <Dialog open={open} onClose={handleOpen}>
          <DialogHeader>Welcome To Certificate Generation System</DialogHeader>
          <DialogBody>
            Note: I've been trying hard to deploy my MERN stack (that's MongoDB, Express.js, React.js, and Node.js) application on platforms like vercel.com, dashboard.render.com, and cloud.mongodb.com, but I haven't succeeded yet. Since I've done it before, I'm feeling a bit lost. Please check my GitHub repo and try to run this project locally. I've tried to satisfy the requirements provided in the problem statement. 
            Thank You!
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default HomeSection;
