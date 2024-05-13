import { Typography } from "@material-tailwind/react";
 
function HomeFooter() {
    return (
      <footer className="flex w-full flex-row flex-wrap items-center justify-center mx-auto max-w-screen-xl px-4 py-2" style={{marginTop: '20px'}}>
        <Typography color="blue-gray" className="font-normal">
          &copy; 2023 Certification Generation System
        </Typography>
      </footer>
    );
  }
  
  export default HomeFooter