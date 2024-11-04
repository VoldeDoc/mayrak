import { lazy, useContext, useEffect, useReducer, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { adminOptions, adminnUtilOptions } from "../utils/constants";
import { AuthContext } from "../context/AuthContex";
import { clear } from "idb-keyval";
import StaffReducer from "../reducers/StaffReducer";
import { AdminManagementContextProvider } from "../context/AdminManagementModule";
import { AdminRouteContextProvider } from "../context/AdminRouteContext";
// import Employers from "../admin-module/pages/employers/Employers";
// import Candidates from "../admin-module/pages/candidate/Candidate";
// import AllEmployers from "../admin-module/pages/employers/AllEmployers";
// import AllArtisans from "../admin-module/pages/artisans/AllArtisans";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import AllCandidate from "../admin-module/pages/candidate/AllCandidate";
import CandidateDetails from "../admin-module/pages/candidate/CandidateDetails";
import JobsByEmployer from "../admin-module/pages/employers/JobsByEmployer";
import AppliedJobs from "../admin-module/pages/employers/AppliedJobs";
import EmployerCandidates from "../admin-module/pages/employers/EmployerCandidates";
import EmployerStaff from "../admin-module/pages/employers/EmployerStaff";
import CandidateStaff from "../admin-module/pages/candidate/CandidateStaff";
import Sectors from "../admin-module/pages/settings/Sectors/Sectors";
import AddCategory from "../admin-module/pages/settings/Sectors/AddCategory";
import Currency from "../admin-module/pages/settings/Currency/curremcy";
import AddCurrency from "../admin-module/pages/settings/Currency/AddCurrency";
import JobListing from "../admin-module/pages/Jobs/JobListing";

//Util Component
const NavBar = lazy(() => import("../admin-module/components/NavBar"));
const SideBar = lazy(() => import("../admin-module/components/SideBar"));
const SideBarItem = lazy(() =>
  import("../admin-module/components/SideBarItem")
);

//pages
const Dashboard = lazy(() =>
  import("../admin-module/pages/dashboard/Dashboard")
);
const HelpCenter = lazy(() => import("../admin-module/pages/help-center/Help"));
const Settings = lazy(() => import("../admin-module/pages/settings/Settings"));

const Employers = lazy(() =>
  import("../admin-module/pages/employers/Employers")
);
const AllEmployers = lazy(() =>
  import("../admin-module/pages/employers/AllEmployers")
);
const EmployerDetails = lazy(() =>
  import("../admin-module/pages/employers/EmployerDetails")
);

const Artisan = lazy(() => import("../admin-module/pages/artisans/Artisans"));
const AllArtisans = lazy(() =>
  import("../admin-module/pages/artisans/AllArtisans")
);
const ArtisanDetails = lazy(() =>
  import("../admin-module/pages/artisans/ArtisanDetails")
);

const DomesticStaff = lazy(() =>
  import("../admin-module/pages/domesticStaff/DomesticStaff")
);
const AllDomesticStaff = lazy(() =>
  import("../admin-module/pages/domesticStaff/AllDomesticStaff")
);
const DomesticStaffDetails = lazy(() =>
  import("../admin-module/pages/domesticStaff/DomesticStaffDetails")
);

const Candidates = lazy(() =>
  import("../admin-module/pages/candidate/Candidate")
);


function useAdminRoute() {
  const [state, dispatch] = useReducer(StaffReducer, adminOptions[0]);
  const { authDetails } = useContext(AuthContext);
  // const [redirectState, setRedirectState] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toogleIsOpen = () => setIsOpen(!isOpen);

  const setSideBar = (index) => {
    const page = adminOptions[index];
    dispatch({ ...page });
  };

  useEffect(() => {
    const clearDb = async () => await clear();

    const handleUnload = () => {
      clearDb();
    };

    window.addEventListener("unload", handleUnload);

    return () => () => {
      handleUnload();
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <>
      {true ? (
        <AdminManagementContextProvider>
          <AdminRouteContextProvider setSideBar={setSideBar}>
            <main className="h-screen w-screen relative flex">
              {/* Side bar takes up 20% of total width and 100% of height */}

              <SideBar
                authDetails={authDetails}
                toogleIsOpen={toogleIsOpen}
                isMenuOpen={isOpen}
              >
                <ul className="flex flex-col gap-[10px]">
                  {adminOptions.map((currentOption) => (
                    <SideBarItem
                      key={currentOption.type}
                      data={currentOption}
                      dispatch={dispatch}
                      state={state}
                    />
                  ))}
                </ul>

                <ul className="flex flex-col gap-[10px]">
                  {adminnUtilOptions.map((currentOption) => (
                    <SideBarItem
                      key={currentOption.type}
                      data={currentOption}
                      dispatch={dispatch}
                    />
                  ))}
                </ul>
              </SideBar>

              {/* Routes and dashboard take up 80% of total width and 100% of height*/}
              <div className="md:w-[82%] w-full relative flex divide-y-2 divide-secondaryColor bg-white flex-col h-full">
                <NavBar
                  state={state}
                  toogleIsOpen={toogleIsOpen}
                  isMenuOpen={isOpen}
                />
                <div className="w-full  h-[92%] overflow-y-auto">
                  <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="employers" element={<Employers />}></Route>
                      <Route path="employers/all" element={<AllEmployers />} />
                      <Route
                        path="employer/details/:id"
                        element={<EmployerDetails />}
                      />
                      <Route
                        path="employer/jobs/:id"
                        element={<JobsByEmployer />}
                      />
                      <Route
                        path="employer/applied-jobs/:id"
                        element={<AppliedJobs />}
                      />
                      <Route path="employer/:id/candidates" element={<EmployerCandidates />}>
                      </Route>

                      <Route path="employer/:id/staffs" element={<EmployerStaff />}>
                      </Route>
                      <Route
                        path="domestic-staff"
                        element={<DomesticStaff />}
                      />
                      <Route
                        path="domestic-staff/all"
                        element={<AllDomesticStaff />}
                      />
                      <Route
                        path="domestic-staff/details/:id"
                        element={<DomesticStaffDetails />}
                      />
                      <Route path="settings" element={<Settings />} />
                      <Route path="settings/sectors" element={<Sectors />} />
                      <Route path="settings/sectors/categories" element={<AddCategory />} />
                      <Route path="settings/currency" element={<Currency/>} />
                      <Route path="settings/currency/add" element={<AddCurrency/>} />
                      <Route path="help-center" element={<HelpCenter />} />
                      <Route path="artisan" element={<Artisan />} />
                      <Route path="artisans/all" element={<AllArtisans />} />
                      <Route
                        path="artisan/details/:id"
                        element={<ArtisanDetails />}
                      />
                      <Route path="candidates" element={<Candidates />} />
                      <Route path="candidates/all" element={<AllCandidate />} />
                      <Route
                        path="candidate/details/:id"
                        element={<CandidateDetails />}
                      />
                      <Route path="candidate/:id/staffs" element={<CandidateStaff />}>
                      </Route>
                      <Route path="job-listing" element={<JobListing />}>
                      </Route>
                      {/* <Route path="" element={<DataTable/>} />  */}
                      {/* <Route path="*" element={<NotFound />} /> */}
                    </Routes>
                  </PrimeReactProvider>
                </div>
              </div>
            </main>
          </AdminRouteContextProvider>
        </AdminManagementContextProvider>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
}

export default useAdminRoute;