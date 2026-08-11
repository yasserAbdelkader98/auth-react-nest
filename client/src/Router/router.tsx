import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthGuard from '../Guards/auth.guard';
import AccountSettings from '../pages/AccountSettings';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Swagger from '../pages/swagger';

function Routing() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/docs" element={<Swagger />} />

        <Route element={<AuthGuard />}>
          <Route path="/accountSettings" element={<AccountSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
