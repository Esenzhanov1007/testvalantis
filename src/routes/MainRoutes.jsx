import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    // {
    //   link: "/product",
    //   element: <ProductPage />,
    //   id: 1,
    // },
    {
      link: "/",
      element: <MainPage />,
      id: 2,
    },
  ];
  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id}></Route>
      ))}
    </Routes>
  );
};

export default MainRoutes;
