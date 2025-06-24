import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FormCreateUser from './components/FormCreateUser'
import UserList from './components/UserList';

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
