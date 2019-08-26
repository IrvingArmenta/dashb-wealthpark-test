import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getPaginatedUsers, getUserByEmail, source, User } from '../../api';
import { LStorage } from '../../api/localstorageHelpers';
import Content from '../../components/layout/Content';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import MainLayout from '../../components/layout/MainLayout';
import Pagination from '../../components/ui-elements/Pagination';
import UsersTable from './UsersTable';

export type UserList = Array<Omit<User, 'password'>>;
interface DashboardState {
  usersList?: UserList;
  currentPage: number;
  usersPerPage: number;
  totalPages?: number;
  currentUserEmail: string;
  currentUserInfo: Pick<User, 'id' | 'role' | 'name'>;
}

class Dashboard extends PureComponent<RouteComponentProps, DashboardState> {

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      usersList: undefined,
      currentPage: 1,
      usersPerPage: 12,
      totalPages: 1,
      currentUserEmail: '',
      currentUserInfo: {
        id: '',
        role: '',
        name: ''
      }
    }
  }

  public fetchUsers = async (currentPage?: number) => {
    const fetchData = await getPaginatedUsers(currentPage || this.state.currentPage, this.state.usersPerPage);
    this.setState({
      usersList: fetchData.data,
      currentPage: currentPage || (this.state.currentPage > fetchData.pages ? fetchData.pages : this.state.currentPage),
      totalPages: fetchData.pages
    });
  }

  public fetchCurrentUser = async (email: string) => {
    const currentUser = await getUserByEmail(email);
    this.setState({
      currentUserInfo: currentUser
    })
  }


  public componentDidMount() {
    const { currentPage, usersPerPage } = this.state;
    const LSuserEmail = LStorage.getCurrentUserEmail();

    if (!LStorage.getAuthToken()) {
      this.props.history.replace('/login');
      return;
    }

    getUserByEmail(LSuserEmail).then(res => {
      this.setState({
        currentUserInfo: res
      })
    }).catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        alert(err)
      }

    });

    getPaginatedUsers(currentPage, usersPerPage).then((res) => {
      this.setState({
        usersList: res.data,
        totalPages: res.pages,
        currentUserEmail: LStorage.getCurrentUserEmail(),
      });
    }).catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        alert(err)
      }
    });
  }

  public componentWillUnmount() {
    // cancelling all Axios fetch promises
    source.cancel();
  }

  public render() {
    const { usersList, totalPages, currentPage, currentUserInfo } = this.state;
    return (
      <MainLayout animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
        <Header />
        <Content p={10} >
          <h2 style={{ textAlign: 'center' }}>Welcome {currentUserInfo.name}!</h2>
          <UsersTable usersList={usersList}
            isAdmin={currentUserInfo.role === 'admin'} fetchUsers={this.fetchUsers} />
          <Pagination
            totalPages={totalPages || 0}
            currentPage={currentPage}
            buttonOnClick={(pageNumber) => {
              this.fetchUsers(pageNumber);
            }} />
        </Content>
        <Footer />
      </MainLayout>
    );
  }

}

export default withRouter(Dashboard);