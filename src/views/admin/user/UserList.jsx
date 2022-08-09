import { CardBody } from "@material-tailwind/react";
import React from "react";
import CardHead from "../../../components/CardHead";
import Container from "../../../components/Container";
import useFetch from "../../../hooks/useFetch";
import Table from "../../../components/Table";

const UserList = () => {
  const { data: users } = useFetch("users", null, true, []);
  return (
    <div>
      <div className="mt-10" />
      <div className="px-3 md:px-8">
        <Container>
          <CardHead>Students List</CardHead>
          <CardBody className="w-full">
            <Table
              items={users}
              // smallHidden
              columns={[
                { label: "S/N", name: "index", customRender: true },
                {
                  label: "First Name",
                  name: "first_name",
                  customRender: true,
                },
                {
                  label: "Last Name",
                  name: "last_name",
                  customRender: true,
                },
                {
                  label: "Registration Number",
                  name: "registration_number",
                },
                {
                  label: "Year Of Study",
                  name: "year_of_Study",
                },
                {
                  label: "Year Of Study",
                  name: "created_at",
                  customRender: true,
                },
                {
                  label: "Year Of Study",
                  name: "modified_at",
                  customRender: true,
                },
                {
                  label: "Status",
                  name: "is_active",
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
                // {
                //   name: "first_name",
                //   render: (item, index) => {
                //     console.log(item.user.first_name);
                //     return <span>{item.user.first_name}</span>;
                //   },
                // },
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
