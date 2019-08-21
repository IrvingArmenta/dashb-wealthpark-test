import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getUsers } from '../../api';
import { LStorage } from '../../api/localstorage';
import Content from '../../components/layout/Content';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import MainLayout from '../../components/layout/MainLayout';

class MainScreen extends PureComponent<RouteComponentProps> {

  public checkAuth(authToken: string | null) {
    if(!authToken) {
      this.props.history.replace('/login');
    }
  }

  public async componentDidMount() {
    this.checkAuth(LStorage.getAuthToken());
    const usersArr = await getUsers();
  }

  public componentWillUnmount() {

  }

  public render() {

    return (
      <MainLayout>
        <Header />
        <Content p={10} >
          <ul/>
        </Content>
        <Footer />
      </MainLayout>
    );
  }

}

export default withRouter(MainScreen);