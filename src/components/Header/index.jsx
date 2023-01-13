function Header() {
  return (
    <>
      <div className="main-header side-header">
        <div className="container-fluid">
          <div className="main-header-left">
            <div
              className="app-sidebar__toggle mobile-toggle"
              data-toggle="sidebar"
            >
              <a className="open-toggle" href="#">
                <i className="header-icons" data-eva="menu-outline"></i>
              </a>
              <a className="close-toggle" href="#">
                <i className="header-icons" data-eva="close-outline"></i>
              </a>
            </div>
            <div className="responsive-logo">
              <a href="#">
                <img
                  src="/assets/img/brand/logo-white.png"
                  className="logo-1"
                />
              </a>
              <a href="#">
                <img src="/assets/img/brand/logo.png" className="logo-11" />
              </a>
              <a href="#">
                <img
                  src="/assets/img/brand/favicon-white.png"
                  className="logo-2"
                />
              </a>
              <a href="#">
                <img src="/assets/img/brand/favicon.png" className="logo-12" />
              </a>
            </div>
            <ul className="header-megamenu-dropdown nav">
              <li className="nav-item">
                <div className="btn-group dropdown">
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="btn btn-link dropdown-toggle"
                    data-toggle="dropdown"
                    id="dropdownMenuButton2"
                    type="button"
                  >
                    <span>
                      <i className="fe fe-settings"></i>
                      Settings
                    </span>
                  </button>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-header header-img p-3">
                      <div className="drop-menu-inner">
                        <div className="header-content text-left d-flex">
                          <div className="text-white">
                            <h5 className="menu-header-title">Setting</h5>
                            <h6 className="menu-header-subtitle mb-0">
                              Overview of theme
                            </h6>
                          </div>
                          <div className="my-auto ml-auto">
                            <span className="badge badge-pill badge-warning float-right">
                              View all
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="setting-scroll">
                      <div>
                        <div className="setting-menu">
                          <a className="dropdown-item" href="#">
                            <i className="mdi mdi-account-outline tx-16 mr-2 mt-1"></i>
                            Profile
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="mdi mdi-account-box-outline tx-16 mr-2"></i>
                            Contacts
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="mdi mdi-account-location tx-16 mr-2"></i>
                            Accounts
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">
                            <i className="typcn typcn-briefcase tx-16 mr-2"></i>
                            About us
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="mdi mdi-application tx-16 mr-2"></i>
                            Getting start
                          </a>
                        </div>
                      </div>
                    </div>
                    <ul className="setting-menu-footer flex-column pl-0">
                      <li className="divider mb-0 pb-0"></li>
                      <li className="setting-menu-btn">
                        <button className="btn-shadow btn btn-success btn-sm">
                          Cancel
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown-menu-rounded btn-group dropdown">
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="btn btn-link dropdown-toggle"
                    data-toggle="dropdown"
                    id="dropdownMenuButton3"
                    type="button"
                  >
                    <span>
                      <i className="nav-link-icon fe fe-briefcase"></i>
                      Projects
                    </span>
                  </button>
                  <div
                    className="dropdown-menu-lg dropdown-menu"
                    x-placement="bottom-left"
                  >
                    <div className="dropdown-menu-header">
                      <div className="dropdown-menu-header-inner header-img p-3">
                        <div className="header-content text-left d-flex">
                          <div className="text-white">
                            <h5 className="menu-header-title">Projects</h5>
                            <h6 className="menu-header-subtitle mb-0">
                              Overview of Projects
                            </h6>
                          </div>
                          <div className="my-auto ml-auto">
                            <span className="badge badge-pill badge-warning float-right">
                              View all
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a className="dropdown-item mt-2" href="#">
                      <i className="dropdown-icon"></i>Mobile Application
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="dropdown-icon"></i>PSD Projects
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="dropdown-icon"></i>PHP Project
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i className="dropdown-icon"></i>Wordpress Projects
                    </a>
                    <a className="dropdown-item mb-2" href="#">
                      <i className="dropdown-icon"></i>HTML & CSS3 Projects
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="main-header-right">
            <div
              className="nav nav-item nav-link"
              id="bs-example-navbar-collapse-1"
            >
              <form className="navbar-form" role="search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                  <span className="input-group-btn">
                    <button type="reset" className="btn btn-default">
                      <i className="fas fa-times"></i>
                    </button>
                    <button type="submit" className="btn btn-default nav-link">
                      <i className="fe fe-search"></i>
                    </button>
                  </span>
                </div>
              </form>
            </div>
            <div className="nav nav-item navbar-nav-right ml-auto">
              <div className="nav-item full-screen fullscreen-button">
                <a className="new nav-link full-screen-link" href="#">
                  <i className="fe fe-maximize"></i>
                </a>
              </div>
              <div className="dropdown nav-item main-header-message">
                <a className="new nav-link" href="#">
                  <i className="fe fe-mail"></i>
                  <span className="pulse-danger"></span>
                </a>
                <div className="dropdown-menu">
                  <div className="menu-header-content bg-primary-gradient text-left d-flex">
                    <div className="">
                      <h6 className="menu-header-title text-white mb-0">
                        5 new Messages
                      </h6>
                    </div>
                    <div className="my-auto ml-auto">
                      <a
                        className="badge badge-pill badge-warning float-right"
                        href="#"
                      >
                        Mark All Read
                      </a>
                    </div>
                  </div>
                  <div className="main-message-list chat-scroll">
                    <a href="#" className="p-3 d-flex border-bottom">
                      <div
                        className="drop-img cover-image"
                        data-image-src="/assets/img/faces/3.jpg"
                      >
                        <span className="avatar-status bg-teal"></span>
                      </div>

                      <div className="wd-90p">
                        <div className="d-flex">
                          <h5 className="mb-1 name">Paul Molive</h5>
                          <p className="time mb-0 text-right ml-auto float-right">
                            10 min ago
                          </p>
                        </div>
                        <p className="mb-0 desc">
                          I'm sorry but i'm not sure how...
                        </p>
                      </div>
                    </a>
                    <a href="#" className="p-3 d-flex border-bottom">
                      <div
                        className="drop-img cover-image"
                        data-image-src="/assets/img/faces/2.jpg"
                      >
                        <span className="avatar-status bg-teal"></span>
                      </div>
                      <div className="wd-90p">
                        <div className="d-flex">
                          <h5 className="mb-1 name">Sahar Dary</h5>
                          <p className="time mb-0 text-right ml-auto float-right">
                            13 min ago
                          </p>
                        </div>
                        <p className="mb-0 desc">
                          All set ! Now, time to get to you now......
                        </p>
                      </div>
                    </a>
                    <a href="#" className="p-3 d-flex border-bottom">
                      <div
                        className="drop-img cover-image"
                        data-image-src="/assets/img/faces/9.jpg"
                      >
                        <span className="avatar-status bg-teal"></span>
                      </div>
                      <div className="wd-90p">
                        <div className="d-flex">
                          <h5 className="mb-1 name">Khadija Mehr</h5>
                          <p className="time mb-0 text-right ml-auto float-right">
                            20 min ago
                          </p>
                        </div>
                        <p className="mb-0 desc">
                          Are you ready to pickup your Delivery...
                        </p>
                      </div>
                    </a>
                    <a href="#" className="p-3 d-flex border-bottom">
                      <div
                        className="drop-img cover-image"
                        data-image-src="/assets/img/faces/12.jpg"
                      >
                        <span className="avatar-status bg-danger"></span>
                      </div>
                      <div className="wd-90p">
                        <div className="d-flex">
                          <h5 className="mb-1 name">Barney Cull</h5>
                          <p className="time mb-0 text-right ml-auto float-right">
                            30 min ago
                          </p>
                        </div>
                        <p className="mb-0 desc">Here are some products ...</p>
                      </div>
                    </a>
                    <a href="#" className="p-3 d-flex border-bottom">
                      <div
                        className="drop-img cover-image"
                        data-image-src="/assets/img/faces/5.jpg"
                      >
                        <span className="avatar-status bg-teal"></span>
                      </div>
                      <div className="wd-90p">
                        <div className="d-flex">
                          <h5 className="mb-1 name">Petey Cruiser</h5>
                          <p className="time mb-0 text-right ml-auto float-right">
                            35 min ago
                          </p>
                        </div>
                        <p className="mb-0 desc">
                          I'm sorry but i'm not sure how...
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="text-center dropdown-footer">
                    <a href="#">VIEW ALL</a>
                  </div>
                </div>
              </div>
              <div className="dropdown nav-item main-header-notification">
                <a className="new nav-link" href="#">
                  <i className="fe fe-bell"></i>
                  <span className="pulse"></span>
                </a>
                <div className="dropdown-menu">
                  <div className="menu-header-content bg-primary-gradient text-left d-flex">
                    <div className="">
                      <h6 className="menu-header-title text-white mb-0">
                        7 new Notifications
                      </h6>
                    </div>
                    <div className="my-auto ml-auto">
                      <a
                        className="badge badge-pill badge-warning float-right"
                        href="#"
                      >
                        Mark All Read
                      </a>
                    </div>
                  </div>
                  <div className="main-notification-list Notification-scroll">
                    <a className="d-flex p-3 border-bottom" href="#">
                      <div className="notifyimg bg-success-transparent">
                        <i className="la la-shopping-basket text-success"></i>
                      </div>
                      <div className="ml-3">
                        <h5 className="notification-label mb-1">
                          New Order Received
                        </h5>
                        <div className="notification-subtext">1 hour ago</div>
                      </div>
                      <div className="ml-auto">
                        <i className="las la-angle-right text-right text-muted"></i>
                      </div>
                    </a>
                    <a className="d-flex p-3 border-bottom" href="#">
                      <div className="notifyimg bg-danger-transparent">
                        <i className="la la-user-check text-danger"></i>
                      </div>
                      <div className="ml-3">
                        <h5 className="notification-label mb-1">
                          22 verified registrations
                        </h5>
                        <div className="notification-subtext">2 hour ago</div>
                      </div>
                      <div className="ml-auto">
                        <i className="las la-angle-right text-right text-muted"></i>
                      </div>
                    </a>
                    <a className="d-flex p-3 border-bottom" href="#">
                      <div className="notifyimg bg-primary-transparent">
                        <i className="la la-check-circle text-primary"></i>
                      </div>
                      <div className="ml-3">
                        <h5 className="notification-label mb-1">
                          Project has been approved
                        </h5>
                        <div className="notification-subtext">4 hour ago</div>
                      </div>
                      <div className="ml-auto">
                        <i className="las la-angle-right text-right text-muted"></i>
                      </div>
                    </a>
                    <a className="d-flex p-3 border-bottom" href="#">
                      <div className="notifyimg bg-pink-transparent">
                        <i className="la la-file-alt text-pink"></i>
                      </div>
                      <div className="ml-3">
                        <h5 className="notification-label mb-1">
                          New files available
                        </h5>
                        <div className="notification-subtext">10 hour ago</div>
                      </div>
                      <div className="ml-auto">
                        <i className="las la-angle-right text-right text-muted"></i>
                      </div>
                    </a>
                    <a className="d-flex p-3 border-bottom" href="#">
                      <div className="notifyimg bg-warning-transparent">
                        <i className="la la-envelope-open text-warning"></i>
                      </div>
                      <div className="ml-3">
                        <h5 className="notification-label mb-1">
                          New review received
                        </h5>
                        <div className="notification-subtext">1 day ago</div>
                      </div>
                      <div className="ml-auto">
                        <i className="las la-angle-right text-right text-muted"></i>
                      </div>
                    </a>
                    <a className="d-flex p-3" href="#">
                      <div className="notifyimg bg-purple-transparent">
                        <i className="la la-gem text-purple"></i>
                      </div>
                      <div className="ml-3">
                        <h5 className="notification-label mb-1">
                          Updates Available
                        </h5>
                        <div className="notification-subtext">2 days ago</div>
                      </div>
                      <div className="ml-auto">
                        <i className="las la-angle-right text-right text-muted"></i>
                      </div>
                    </a>
                  </div>
                  <div className="dropdown-footer">
                    <a href="#">VIEW ALL</a>
                  </div>
                </div>
              </div>
              <div className="dropdown main-profile-menu nav nav-item nav-link">
                <a className="profile-user d-flex" href="">
                  <img
                    src="/assets/img/faces/6.jpg"
                    alt="user-img"
                    className="rounded-circle mCS_img_loaded"
                  />
                  <span></span>
                </a>

                <div className="dropdown-menu">
                  <div className="main-header-profile header-img">
                    <div className="main-img-user">
                      <img alt="" src="/assets/img/faces/6.jpg" />
                    </div>
                    <h6>Petey Cruiser</h6>
                    <span>Premium Member</span>
                  </div>
                  <a className="dropdown-item" href="">
                    <i className="far fa-user"></i> My Profile
                  </a>
                  <a className="dropdown-item" href="">
                    <i className="far fa-edit"></i> Edit Profile
                  </a>
                  <a className="dropdown-item" href="">
                    <i className="far fa-clock"></i>
                    Activity Logs
                  </a>
                  <a className="dropdown-item" href="">
                    <i className="fas fa-sliders-h"></i>
                    Account Settings
                  </a>
                  <a className="dropdown-item" href="page-signin.html">
                    <i className="fas fa-sign-out-alt"></i>
                    Sign Out
                  </a>
                </div>
              </div>
              <div className="dropdown main-header-message right-toggle">
                <a
                  className="nav-link pr-0"
                  data-toggle="sidebar-right"
                  data-target=".sidebar-right"
                >
                  <i className="ion ion-md-menu tx-20 bg-transparent"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
