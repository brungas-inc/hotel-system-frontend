import { Button, Card, CardBody } from "@material-tailwind/react";
import React, { useState, useRef } from "react";
import CardHead from "../../../components/CardHead";
import Container from "../../../components/Container";
import useFetch from "../../../hooks/useFetch";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { reportErrors } from "../../../utils/helpers";
import Alert from "../../../components/Alert";
import Modal from "../../../components/Modal";
import AddUser from "./AddUser";
import { TAILWIND_COLORS } from "../../../utils/constants";

const UserList = () => {
  const alert = useRef();
  const modal = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: users,
    loading,
    error,
  } = useFetch("users", { currentPage: currentPage }, true, {
    data: [],
    pagination: { totalPages: 0 },
  });
  React.useEffect(() => {
    if (error) reportErrors(alert.current, error);
  }, [error]);
  const openEditUserModal = (item) => {};
  const openAddUserModal = () => {
    // let component = <Card></Card>;
    let component = <AddUser hide={() => modal.current.hide()} />;
    modal && modal.current.openModal(component, "Add User");
  };

  return (
    <div>
      <div className="mt-10" />
      <div className="px-3 md:px-8">
        <Container>
          <CardHead title="Employee List">
            <div className="flex">
              <Button
                color={TAILWIND_COLORS.accent}
                size="sm"
                variant="outlined"
                className="text-accentColor"
                onClick={openAddUserModal}
              >
                <div className="material-icons font-bold mr-1 text-base leading-none">
                  add
                </div>
                User
              </Button>
            </div>
          </CardHead>
          <CardBody className="w-full">
            <Alert ref={alert} className="mb-2" />
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
                        color={TAILWIND_COLORS.accent}
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
              ]}
            />
            <Pagination
              data={users}
              onChange={(value) => setCurrentPage(value)}
            />
          </CardBody>
        </Container>
      </div>
      <Modal ref={modal} />
    </div>
  );
};

export default UserList;
