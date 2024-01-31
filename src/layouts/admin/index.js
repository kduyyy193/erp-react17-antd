import React, { useState, useEffect } from 'react';
import { Select, Dropdown } from 'antd';
// , notification as antNoti
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getMessaging, isSupported, getToken, onMessage } from 'firebase/messaging';

import { useAuth } from 'globalContext';
import logo from 'assets/images/logo.svg';
import avatar from 'assets/images/avatar.jpeg';
import us from 'assets/svg/us.svg';
import vn from 'assets/svg/vn.svg';

import './index.less';
import { routerLinks } from 'utils';
// import { firebaseConfig } from 'variable';
import { Avatar } from 'components';
import Menu from './menu';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  // menuVertical, permission,
  const { user, changeLanguage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, set_isCollapsed] = useState(window.innerWidth < 1025);
  const [isDesktop, set_isDesktop] = useState(window.innerWidth > 767);

  useEffect(() => {
    if (window.innerWidth < 1025 && !isCollapsed) {
      setTimeout(() => {
        set_isCollapsed(true);
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    function handleResize() {
      if (window.innerWidth < 1025 && !isCollapsed) {
        set_isCollapsed(true);
      }
      set_isDesktop(window.innerWidth > 767);
    }
    window.addEventListener('resize', handleResize, true);

    // const init = async () => {
    //   if (await isSupported()) {
    //     try {
    //       const defaultApp = initializeApp(firebaseConfig);
    //       const messaging = getMessaging(defaultApp);
    //       const firebaseToken = await getToken(messaging);
    //       console.log(firebaseToken);
    //       onMessage(messaging, async (payload) => {
    //         antNoti.open({
    //           message: <strong>{payload.notification.title}</strong>,
    //           description: payload.notification.body,
    //           icon: <i className="las la-info-circle text-4xl text-blue-500" />,
    //           // onClick: () => {},
    //         });
    //       });
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // };
    // init();

    return () => window.removeEventListener('resize', handleResize, true);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1025 && !isCollapsed) {
      set_isCollapsed(true);
    }
  }, [location]);

  const Header = ({ isCollapsed, isDesktop }) => (
    <header
      className={classNames(
        'bg-blue-50 w-full header h-20 transition-all duration-300 ease-in-out sticky top-0 block z-10',
        {
          'pl-52': !isCollapsed && isDesktop,
          'pl-32': isCollapsed && isDesktop,
          'pl-28': !isDesktop,
        },
      )}
    >
      <div className="flex items-center justify-end sm:justify-between px-5 h-20">
        <Select value={i18n.language} onChange={(value) => changeLanguage(value)}>
          <Select.Option value="en">
            <img src={us} alt="US" className="mr-1 w-4 inline-block relative -top-0.5" />{' '}
            {t('routes.admin.Layout.English')}
          </Select.Option>
          <Select.Option value="vi">
            <img src={vn} alt="VN" className="mr-1 w-4 inline-block relative -top-0.5" />{' '}
            {t('routes.admin.Layout.Vietnam')}
          </Select.Option>
        </Select>
        <div className="flex items-center">
          <div className="mr-5 relative flex group">
            <div className="rounded-full text-white w-5 h-5 bg-blue-400 absolute -right-1.5 -top-1.5 leading-none text-center pt-1 text-xs group-hover:animate-bounce">
              4
            </div>
            <i className="las la-bell text-4xl text-gray-500" />
          </div>
          <div className="mr-5 relative flex group">
            <div className="rounded-full text-white w-5 h-5 bg-yellow-500 absolute -right-1.5 -top-1.5 leading-none text-center pt-1 text-xs group-hover:animate-bounce">
              76
            </div>
            <i className="las la-comment text-4xl text-gray-500" />
          </div>
          <Dropdown
            trigger={['hover', 'click']}
            overlay={
              <ul className="bg-blue-50">
                <li
                  className="p-2 hover:bg-blue-100"
                  onClick={() => navigate(routerLinks('MyProfile'), { replace: true })}
                >
                  My Profile
                </li>
                <li className="p-2 hover:bg-blue-100" onClick={() => navigate(routerLinks('Login'), { replace: true })}>
                  Sign Out
                </li>
              </ul>
            }
            placement="bottomRight"
          >
            <section className="flex items-center" id={'dropdown-profile'}>
              <div className="text-right leading-none mr-3 hidden sm:block">
                <div className="font-bold text-black text-lg leading-snug mb-0.5">{user?.name}</div>
                <div className="text-gray-500">{user?.email}</div>
              </div>
              <Avatar src={avatar} size={10} />
            </section>
          </Dropdown>
        </div>
      </div>
    </header>
  );
  return (
    <main>
      <div className="leading-5 leading-10" />
      <Header isCollapsed={isCollapsed} isDesktop={isDesktop} />
      <div
        className={classNames(
          'flex items-center justify-between text-gray-800 hover:text-gray-500 h-20 fixed top-0 left-0 px-5 font-bold transition-all duration-300 ease-in-out z-10',
          {
            'w-52': !isCollapsed && isDesktop,
            'w-20': isCollapsed,
            'bg-blue-100': isDesktop,
            'bg-blue-50': !isDesktop,
          },
        )}
      >
        <div>
          <a href="/" className="flex items-center">
            <img className="w-10" src={logo} alt="" />
            <div
              id={'name-application'}
              className={classNames(
                'transition-all duration-300 ease-in-out absolute left-16 w-48 overflow-ellipsis overflow-hidden ml-2',
                {
                  'opacity-100 text-lg': !isCollapsed && !!isDesktop,
                  'opacity-0 text-[0px] invisible': !!isCollapsed || !isDesktop,
                },
              )}
            >
              Admin
            </div>
          </a>
        </div>

        <div
          className={classNames('hamburger', {
            'is-active': (isCollapsed && isDesktop) || (!isCollapsed && !isDesktop),
          })}
          onClick={() => set_isCollapsed(!isCollapsed)}
        >
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>
      </div>
      <div
        onMouseEnter={() => {
          const offsetWidth = document.body.offsetWidth;
          document.body.style.overflowY = 'hidden';
          document.body.style.paddingRight = document.body.offsetWidth - offsetWidth + 'px';
        }}
        onMouseLeave={() => {
          document.body.style.overflowY = 'auto';
          document.body.style.paddingRight = '';
        }}
        className={classNames('fixed z-20 top-20 left-0 h-screen bg-blue-100 transition-all duration-300 ease-in-out', {
          'w-52': !isCollapsed,
          'w-20': isCollapsed,
          '-left-20': isCollapsed && !isDesktop,
        })}
      >
        <Menu isCollapsed={isCollapsed} />
      </div>
      {!isCollapsed && !isDesktop && (
        <div className={'w-full h-full fixed bg-black opacity-50 z-[1]'} onClick={() => set_isCollapsed(true)} />
      )}
      <section
        id={'main'}
        className={classNames('px-5 transition-all duration-300 ease-in-out z-10 h-[calc(100vh-5rem)] relative', {
          'ml-52': !isCollapsed && isDesktop,
          'ml-20': isCollapsed && isDesktop,
        })}
      >
        {children}
        <footer className="text-center bg-blue-50 mt-10 -mx-5">
          {t('layout.footer', { year: new Date().getFullYear() })}
        </footer>
      </section>
      <div className="hidden h-7 w-7 leading-7" />
    </main>
  );
};
export default Layout;
