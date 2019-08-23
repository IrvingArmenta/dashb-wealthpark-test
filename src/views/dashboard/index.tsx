import { Spinner } from '@blueprintjs/core';
import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getPaginatedUsers, source, User } from '../../api';
import { LStorage } from '../../api/localstorage';
import Content from '../../components/layout/Content';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import MainLayout from '../../components/layout/MainLayout';
import Table from '../../components/layout/Table';
import Pagination from '../../components/ui-elements/Pagination';
import TableRow from './dashboard.styles';

type UserList = Array<Omit<User, 'password'>>;
interface DashboardState {
  usersList?: UserList;
  currentPage: number;
  usersPerPage: number;
  pages?: number;
}

class Dashboard extends PureComponent<RouteComponentProps, DashboardState> {

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      usersList: undefined,
      currentPage: 1,
      usersPerPage: 10,
      pages: undefined,
    }
  }

  public checkAuth(authToken: string | null) {
    if (!authToken) {
      this.props.history.replace('/login');
    }
    return true;
  }

  public async fetchUsers(currentPage: number) {
    const currentUsers = await getPaginatedUsers(currentPage, this.state.usersPerPage);
    this.setState({
      usersList: currentUsers.data,
      currentPage,
    });
  }


  public async componentDidMount() {

    if (!LStorage.getAuthToken()) {
      this.props.history.replace('/login');
      return;
    }

    const initialUsers = await getPaginatedUsers(this.state.currentPage, this.state.usersPerPage);
    setTimeout(() => {
      this.setState({
        usersList: initialUsers.data,
        pages: initialUsers.pages
      });
    }, 500)
  }

  public componentWillUnmount() {
    source.cancel();
  }

  public render() {
    const { usersList, pages, currentPage } = this.state;
    return (
      <MainLayout>
        <Header />
        <Content p={10} >
          {usersList ?
            <>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user, i) => {
                    return (
                      <TableRow key={user.id}>
                        <td className="user__name">{user.name}</td>
                        <td className="user__email">{user.email}</td>
                        <td className="user__role">{user.role}</td>
                      </TableRow>
                    )
                  })}
                </tbody>
              </Table>
              <Pagination
                totalPages={pages ? pages : 0}
                currentPage={currentPage}
                buttonOnClick={(pageNumber) => {
                  this.fetchUsers(pageNumber);
                }} />
            </> :
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
              <Spinner />
            </div>}
        </Content>
        <Footer />
      </MainLayout>
    );
  }

}

export default withRouter(Dashboard);