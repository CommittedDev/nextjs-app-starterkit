/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Router from 'next/router';
import { LayoutProvider } from 'src/components/DashboardLayout/LayoutContext';
import DashboardLayout from 'src/components/DashboardLayout';
import SidebarLink from 'src/components/DashboardLayout/Sidebar/SidebarLink';
import { getDeep } from 'src/utils';
import { connect } from 'react-redux';
import { i18n } from 'src/i18n';
import { setLocal as setLocalDashboard, locals as localsDashboard } from 'feathers-mongoose-casl-dashboard/lib';
import { setLocal, locals } from 'redux-admin';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import {
  TableChart as TableChartIcon,
} from '@material-ui/icons';
import { dispatchAction, selectors } from 'net-provider';
import dynamic from 'next/dynamic';
import { Icon } from 'antd';

import 'feathers-mongoose-casl-dashboard/lib/style.css';
import 'antd/dist/antd.less';

const fullLangsName = {
  en: 'enUS',
  he: 'heIL',
};

const LtrDashboard = dynamic(() => import('./DashboardAppLtr'));
const RtlDashBoard = dynamic(() => import('./DashboardAppRtl'));


const getUrl = function getUrl() {
  const query = Router.router.query && Router.router.query.screen;
  return query;
};
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: null,
    };
  }

  componentDidMount() {
    const screenName = getUrl();
    this.setState({ screenName });
    Router.router.events.on('beforeHistoryChange', this.handleRouteChange);
    dispatchAction.Read({
      targetKey: 'dashboard',
      url: 'dashboard',
      customHandleResponse: (res) => res.data.data,
      getCountFromResponse: (res) => res.data.total,
    });
  }

  componentWillUnmount() {
    Router.router.events.off('beforeHistoryChange', this.handleRouteChange);
  }

  handleRouteChange = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const screenName = urlParams.get('screen');
    // eslint-disable-next-line react/destructuring-assignment
    if (screenName !== this.state.screenName) {
      this.setState({ screenName });
    }
  }

  renderBoxes = () => {
    const { data, classes } = this.props;
    return data.filter((item) => item.schema).map((item) => {
      const currentLang = i18n.language;
      const fullLangName = fullLangsName[currentLang];
      const localName = getDeep(item, `data.dashboardConfig.i18n.${fullLangName}.serviceName`);
      return (
        <Link
          href={`/dashboard?screen=${item.result.name}`}
        >
          <Button variant="contained" component="a" className={classes.button}>
            {localName || item.result.name}
          </Button>
        </Link>
      );
    });
  }

  render() {
    const { screenName } = this.state;
    const { data } = this.props;
    if (!data) return 'Loading dashboard...';
    const currentLang = i18n.language;
    const fullLangName = fullLangsName[currentLang];
    setLocal(locals[fullLangsName[currentLang]]);
    setLocalDashboard(localsDashboard[fullLangsName[currentLang]]);
    const isRtl = i18n.dir() === 'rtl';
    const DashboardApp = isRtl ? RtlDashBoard : LtrDashboard;
    return (
      <LayoutProvider>
        <DashboardLayout
          renderMain={() => (
            screenName ? <DashboardApp url={screenName} /> : this.renderBoxes()
          )}
          renderSidebarBody={({ isSidebarOpened }) => data.filter((item) => item.schema).map((item) => {
            const icon = getDeep(
              item,
              'data.dashboardConfig.sideBarIconName',
            );
            const localName = getDeep(item, `data.dashboardConfig.i18n.${fullLangName}.serviceName`);
            return (
              <SidebarLink
                key={item.result.name}
                isSidebarOpened={isSidebarOpened}
                id={item.result.name}
                label={localName || item.result.name}
                link={`/dashboard?screen=${item.result.name}`}
                icon={icon ? <Icon type={icon} /> : <TableChartIcon />}
                isLinkActive={item.result.name === screenName}
              />
            );
          })}
        />
      </LayoutProvider>
    );
  }
}

function mapStateToProps(store) {
  const {
    data, error, loading, count,
  } = selectors.getCrudObject(store, 'dashboard');
  return {
    data,
    error,
    loading,
    count,
  };
}

const styles = () => createStyles({
  button: {
    margin: 15,
  },
});

const Extended = withStyles(styles)(Dashboard);

export default connect(mapStateToProps, null)(Extended);
