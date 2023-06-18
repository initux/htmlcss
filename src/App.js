import React, { useEffect, useState, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Helmet } from 'react-helmet';
import "./App.css";
import AuthProvider from "./GlobalShared/context/AuthProvider";

const Template1 = React.lazy(() => import("./template1/assets/Template1"));
const Template2 = React.lazy(() => import("./template2/assets/Template2"));
const Template3 = React.lazy(() => import("./template3/assets/Template3"));
const Template4 = React.lazy(() => import("./template4/assets/Template4"));
const Template5 = React.lazy(() => import("./template5/assets/Template5"));
const Template6 = React.lazy(() => import("./template6/assets/Template6"));
const Template7 = React.lazy(() => import("./template7/assets/Template7"));
const Template8 = React.lazy(() => import("./template8/assets/Template8"));
const Template9 = React.lazy(() => import("./template9/assets/Template9"));
const Template10 = React.lazy(() => import("./template10/assets/Template10"));
const Template11 = React.lazy(() => import("./template11/assets/Template11"));
const Template12 = React.lazy(() => import("./template12/assets/Template12"));
const Template13 = React.lazy(() => import("./template13/assets/Template13"));
const Template14 = React.lazy(() => import("./template14/assets/Template14"));
const Template15 = React.lazy(() => import("./template15/assets/Template15"));
const Template16 = React.lazy(() => import("./template16/assets/Template16"));
const Template17 = React.lazy(() => import("./template17/assets/Template17"));
const Template18 = React.lazy(() => import("./template18/assets/Template18"));
const Template19 = React.lazy(() => import("./template19/assets/Template19"));
const Template20 = React.lazy(() => import("./template20/assets/Template20"));


const mapTemplatePath = {
  theme1: <Template1 />,
  theme2: <Template2 />,
  theme3: <Template3 />,
  theme4: <Template4 />,
  theme5: <Template5 />,
  theme6: <Template6 />,
  theme7: <Template7 />,
  theme8: <Template8 />,
  theme9: <Template9 />,
  theme10: <Template10 />,
  theme11: <Template11 />,
  theme12: <Template12 />,
  theme13: <Template13 />,
  theme14: <Template14 />,
  theme15: <Template15 />,
  theme16: <Template16 />,
  theme17: <Template17 />,
  theme18: <Template18 />,
  theme19: <Template19 />,
  theme20: <Template20 />,


};

const getTemplate = (theme_name) => {
  return mapTemplatePath[theme_name] ? (
    mapTemplatePath[theme_name]
  ) : (
    <div
      style={{ color: "#157ed2", width: "100vw", height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <h1 style={{ color: "red" }}>Invalid Template</h1>
    </div>
  );
};

const getStarting = JSON.parse(localStorage.getItem("starting"));

function App() {
  const [template, setTemplate] = useState(null);
  const hostName = window.location.hostname;

  useEffect(() => {
      fetch("https://api.selfeb.com/api/token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      //body: JSON.stringify({"domain":window.location.hostname}),
       body: JSON.stringify({ domain: "roomdecorbd.com" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === false) {
          localStorage.setItem("starting", JSON.stringify(data));
          setTemplate(data.theme);
        }
      })
      .catch((error) => {
        alert("You Have Not Access");
      });

  
  }, []);

  return (
    
    <>

    <Helmet>
    <title>{getStarting?.meta_og_title || "Selfeb"}</title>
    <link rel="icon" type="image/png" href={process.env.REACT_APP_CDN_URL + getStarting?.logo} />
      <meta name="description" content={getStarting?.meta_description} />
      <meta name="keywords" content={getStarting?.meta_keywords} />
      <meta name="og:title" content={getStarting?.meta_og_title} />
      <meta name="og:description" content={getStarting?.meta_description} />
      <meta name="og:image" content={getStarting?.meta_og_image} />
      <meta property="og:url" content={window.location.href} />
    </Helmet>

      <Suspense
        fallback={
          <div
            style={{
              color: `${getStarting?.primaryColor || "#157ed2"}`,
              width: "100vw",
              height: "100vh",
            }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner animation="border" />
          </div>
        }
      >
        {template ? (
          <AuthProvider>{getTemplate(template)}</AuthProvider>
        ) : (
          <div
            style={{
              color: `${getStarting?.primaryColor || "#157ed2"}`,
              width: "100vw",
              height: "100vh",
            }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner animation="border" />
          </div>
        )}
      </Suspense>
    </>
  );
}

export default App;