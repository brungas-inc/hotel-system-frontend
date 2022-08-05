import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";

const Login = () => {
  return (
    <div className="bg-center bg-no-repeat bg-cover w-full h-screen flex bg-login-image">
      <Card className="m-auto w-96">
        <CardHeader color="indigo" className="relative h-20 flex">
          <h2 className="text-white text-2xl m-auto">Login</h2>
        </CardHeader>
        <CardBody>
          <form>
            <div className="block mt-5">
              <div className="w-full mb-5 font-light">
                <Input type="text" color="indigo" label="Username" />
              </div>
              <div className="w-full  mb-5 font-light">
                <Input type="password" color="indigo" label="Password" />
              </div>
              <div className="w-full  mb-5 font-light">
                <Checkbox color="indigo" label="Rember Me" />
              </div>
              <div className="w-full font-light flex">
                <Button variant="gradient" color="indigo" className="mx-auto">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
