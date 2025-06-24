import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FormCreateUser from './components/FormCreateUser/FormCreateUser'
import UserList from './components/UserList/UserList';

export default function CreateUser() {
  
  return (
    <div>
      <Header />
      <FormCreateUser />
      <UserList />
      <Footer />
    </div>
  );
}
