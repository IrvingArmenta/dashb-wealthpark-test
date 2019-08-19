import React from 'react';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import GlobalStyle from './global-styles/GlobalStyle';

const App = () => {

  return (
    <>
      <GlobalStyle />
      <MainLayout>
        <Header />
        <Content p={10}>TEST</Content>
        <Footer />
      </MainLayout>
    </>
  );

}

export default App;
