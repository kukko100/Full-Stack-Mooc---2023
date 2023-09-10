import Message from "./components/Message";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from './components/UserList'
import UserBlogList from './components/UserBlogList'
import BlogCatalog from './components/BlogCatalog'
import BlogDetail from './components/BlogDetail'
import NavBar from "./components/NavBar";


const App = () => {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <h1>Blog app</h1>
        <Message />
        <Routes>
          <Route path="/" element={<BlogCatalog />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/userblogs/:id" element={<UserBlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
