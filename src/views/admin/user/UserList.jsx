import { Button, CardBody } from "@material-tailwind/react";
import React, { useState, useRef } from "react";
import CardHead from "../../../components/CardHead";
import Container from "../../../components/Container";
import useFetch from "../../../hooks/useFetch";
import Table from "../../../components/Table";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users, loading } = useFetch(
    "users",
    { currentPage: currentPage },
    true,
    {
      data: [],
      pagination: { totalPages: 0 },
    }
  );
  return (
    <div>
      <div className="mt-10" />
      <div className="px-3 md:px-8">
        <Container>
          <CardHead title="Employee List">
            <div className="flex">
              <Button
                color="amber"
                size="sm"
                variant="outlined"
                className="text-accentColor flex gap-2 justify-between"
              >
                <div className="material-icons font-bold">add</div>
                User
              </Button>
            </div>
          </CardHead>
          <CardBody className="w-full">
            <Table
              items={users?.data}
              loading={loading}
              columns={[
                { label: "S/N", name: "index", customRender: true },
                {
                  label: "First Name",
                  name: "firstName",
                },
                {
                  label: "Last Name",
                  name: "lastName",
                },
                {
                  label: "Role",
                  name: "role",
                  customRender: true,
                },
                {
                  label: "Phone Number",
                  name: "phoneNumber",
                },
                {
                  label: "Email",
                  name: "email",
                },
                {
                  label: "Action",
                  name: "Action",
                  customRender: true,
                },
              ]}
              customRenders={[
                {
                  name: "index",
                  render: (item, index) => {
                    return (
                      <span className="text-center text-primary font-bold">
                        {index + 1}
                      </span>
                    );
                  },
                },
                {
                  name: "role",
                  render: (item, index) => {
                    return <span>{item.role?.name}</span>;
                  },
                },
                {
                  name: "Action",
                  render: (item, index) => {
                    return (
                      <Button
                        color="amber"
                        size="sm"
                        variant="filled"
                        className="text-text flex gap-2 justify-between"
                      >
                        <div className="material-icons font-bold">edit</div>
                        User
                      </Button>
                    );
                  },
                },
                // {
                //   name: "last_name",
                //   render: (item, index) => {
                //     // console.log(item.user.last_name);
                //     return <span>{item.user.last_name}</span>;
                //   },
                // },
                // {
                //   name: "created_at",
                //   render: (item, index) => {
                //     // console.log(item.user.last_name);
                //     return <span>{item.user.created_at}</span>;
                //   },
                // },
                // {
                //   name: "modified_at",
                //   render: (item, index) => {
                //     // console.log(item.user.last_name);
                //     return <span>{item.user.modified_at}</span>;
                //   },
                // },
                // {
                //   name: "is_active",
                //   render: (item, index) => {
                //     // console.log(item.user.last_name);
                //     return item.is_active ? (
                //       <span className="bg-green-100 rounded-2xl p-1.5">
                //         {item.is_active == true ? "active" : "inactive"}
                //       </span>
                //     ) : (
                //       <span className="bg-red-100 rounded-2xl p-1.5">
                //         {item.is_active == true ? "active" : "inactive"}
                //       </span>
                //     );
                //   },
                // },
              ]}
            />
          </CardBody>
        </Container>
      </div>
    </div>
  );
};

export default UserList;
