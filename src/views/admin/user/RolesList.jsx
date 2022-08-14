import React, { useState, useRef } from "react";
import { Button, Card, CardBody } from "@material-tailwind/react";
import CardHead from "../../../components/CardHead";
import Container from "../../../components/Container";
import useFetch from "../../../hooks/useFetch";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { reportErrors } from "../../../utils/helpers";
import Alert from "../../../components/Alert";
import Modal from "../../../components/Modal";
import AddRole from "./AddRole";
import { TAILWIND_COLORS } from "../../../utils/constants";

const RolesList = () => {
  const alert = useRef();
  const modal = useRef();
  const [expanded, setExpanded] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: roles,
    loading,
    error,
    loadData,
  } = useFetch("access-control/roles", { currentPage: currentPage }, true, {
    data: [],
    pagination: { totalPages: 0 },
  });
  React.useEffect(() => {
    if (error) reportErrors(alert.current, error);
  }, [error]);

  const editRoleRoute = (e) => {
    e.stopPropagation();
  };

  const openAddRoleModal = () => {
    let component = <AddRole cancel={() => modal.current.hide()} />;
    modal && modal.current.openModal(component, "Add Role");
  };
  return (
    <div>
      <div className="mt-5" />
      <div className="">
        <Container>
          <CardHead title="Roles List">
            <div className="flex">
              <Button
                color={TAILWIND_COLORS.accent}
                size="sm"
                variant="outlined"
                className="text-accentColor"
                onClick={openAddRoleModal}
              >
                <div className="material-icons font-bold mr-1 text-base leading-none">
                  add
                </div>
                Role
              </Button>
            </div>
          </CardHead>
          <CardBody className="w-full">
            <Alert ref={alert} className="mb-2" />
            <Table
              expanded={expanded}
              items={roles?.data}
              loading={loading}
              columns={[
                { label: "S/N", name: "index", customRender: true },
                {
                  label: "Role",
                  name: "name",
                },
                {
                  label: "Description",
                  name: "description",
                },
                {
                  label: "Action",
                  name: "Action",
                  customRender: true,
                },
              ]}
              renderExpanded={(item, index) => (
                <div className="px-2 pt-2">
                  <Table
                    items={item.permissions || []}
                    columns={[
                      { label: "S/N", name: "index", customRender: true },
                      {
                        label: "Permission",
                        name: "displayName",
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
                    ]}
                  />
                </div>
              )}
              onRowClick={(item) => setExpanded(expanded ? undefined : item)}
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
                        onClick={editRoleRoute}
                      >
                        <div className="material-icons font-bold">edit</div>
                        Role
                      </Button>
                    );
                  },
                },
              ]}
            />
            <Pagination
              data={roles}
              onChange={(value) => setCurrentPage(value)}
            />
          </CardBody>
        </Container>
      </div>
      <Modal ref={modal} />
    </div>
  );
};

export default RolesList;
