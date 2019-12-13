import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { I18nContext } from '../../hooks/i18n/I18nContext';
import { BooleanById } from '../../types';
import { TabPanel } from '../shared/TabPanel';
import { TranscribersSummary } from './TranscribersSummary';
import { UsersSummary } from './UsersSummary';

enum TAB_INDEX {
  USERS,
  TRANSCRIBERS,
}

const STARTING_TAB_INDEX = TAB_INDEX.USERS;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
  }),
);

export type CheckedSubGraphById = BooleanById;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IAMTabsProps {
  usersAccess: boolean;
  transcribersAccess: boolean;
}

export function IAMTabs(props: IAMTabsProps) {
  const { usersAccess, transcribersAccess } = props;
  const { translate } = React.useContext(I18nContext);
  const [activeTab, setActiveTab] = React.useState(STARTING_TAB_INDEX);

  const classes = useStyles();

  /** used to prevent tabs from rendering before they should be displayed */
  const tabsThatShouldRender = React.useMemo<Set<number>>(() => new Set([activeTab]), []);

  const handleChange = (event: React.ChangeEvent<{}>, newActiveTab: number) => {
    tabsThatShouldRender.add(newActiveTab);
    setActiveTab(newActiveTab);
  };

  // index will be `0` if there is only one item in the list
  const transcribersTabIndex = usersAccess ? 1 : 0;
  
  return (
    <Paper square elevation={0} className={classes.root} >
      <Tabs
        centered={false}
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        {usersAccess && <Tab label={translate('IAM.users')} />}
        {transcribersAccess && <Tab label={translate('IAM.transcribers')} />}
      </Tabs>
      {usersAccess && <TabPanel value={activeTab} index={0}>
        {tabsThatShouldRender.has(0) && <UsersSummary hasAccess={usersAccess} />}
      </TabPanel>}
      {transcribersAccess && <TabPanel value={activeTab} index={transcribersTabIndex}>
        {tabsThatShouldRender.has(transcribersTabIndex) && <TranscribersSummary hasAccess={transcribersAccess} />}
      </TabPanel>}
    </Paper>
  );
}