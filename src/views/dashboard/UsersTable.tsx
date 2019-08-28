import { Alert, Button, Icon, Intent, Menu, Popover, Spinner } from '@blueprintjs/core';
import { motion } from 'framer-motion';
import React, { PureComponent } from 'react';
import { UserList } from '.';
import { deleteUser, User } from '../../api';
import { LStorage } from '../../api/localstorageHelpers';
import Table from '../../components/layout/Table';
import TableRow from './dashboard.styles';
import EditUserForm from './EditUserForm';

interface UsersTableProps {
  usersList?: UserList
  isAdmin?: boolean;
  fetchUsers: () => void;
}

interface UsersTableState {
  confirmDelete: boolean;
  editModalIsOpen: boolean;
  selectedUser?: Omit<User, 'password'>
}

class UsersTable extends PureComponent<UsersTableProps, UsersTableState> {
  constructor(props: UsersTableProps) {
    super(props);
    this.state = {
      confirmDelete: false,
      editModalIsOpen: false,
      selectedUser: undefined,
    }
  }

  public render() {
    const { usersList, isAdmin, fetchUsers } = this.props;
    const { selectedUser } = this.state;

    if (!usersList) {
      return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Spinner />
        </div>
      )
    }

    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <motion.tbody initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ staggerChildren: 2, when: "beforeChildren"}}>
            {usersList.map((user, i) => {
              const t = parseFloat((i / 50).toFixed(2));
              return (
                <TableRow key={user.id}
                  positionTransition={true}
                  transition={{ delay: t }}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}>
                  <td className="user__name">{user.name}</td>
                  <td className="user__email">{user.email}</td>
                  <td className="user__role">{user.role}</td>
                  {isAdmin &&
                    <td className="user__actions">
                      <Popover
                        content={
                          <Menu>
                            <Menu.Item text="Edit user"
                              icon="edit"
                              intent={Intent.SUCCESS}
                              onClick={() => this.setState({ editModalIsOpen: true, selectedUser: user })} />
                            <Menu.Divider />
                            <Menu.Item icon="trash" text="Delete User" intent={Intent.DANGER}
                              onClick={() => this.setState({ confirmDelete: true, selectedUser: user })}
                            />
                          </Menu>
                        }>
                        <Button icon={<Icon icon="cog" />} />
                      </Popover>
                    </td>
                  }
                </TableRow>
              )
            })}
          </motion.tbody>
        </Table>
        {selectedUser &&
          <EditUserForm
            selectedUser={selectedUser}
            fetchUsers={this.props.fetchUsers}
            isOpen={this.state.editModalIsOpen}
            onClose={() => this.setState({ editModalIsOpen: false, selectedUser: undefined })} />
        }
        {selectedUser &&
          <Alert
            isOpen={this.state.confirmDelete}
            confirmButtonText="Yes"
            cancelButtonText="Cancel"
            onCancel={() => this.setState({ confirmDelete: false, selectedUser: undefined })}
            onConfirm={() => {
              this.setState({
                confirmDelete: false
              })
              deleteUser(selectedUser.id, LStorage.getAuthToken());
              fetchUsers();
            }}
          ><p>{`Are you sure you want to delete ${selectedUser.name}?`}</p></Alert>
        }
      </>
    )


  }
}

export default UsersTable;