import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";

import styled from "@emotion/styled";

export const STabs = styled(Tabs)``;
export const STabList = styled(TabList)`
  font-family: 'Quicksand';
  background-color: transparent;
  [data-reach-tab] {
    outline: none;
    border: none;
    background-color: transparent;
    padding: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 20px;
  }
  [data-reach-tab][data-selected] {
    border-bottom: 2px solid #7151C9;
    font-weight: 500;
  }
`;
export const STab = styled(Tab)``;
export const STabPanels = styled(TabPanels)`
  > [data-reach-tab-panel] {
    outline: none;
    border: none;
  }
`;
export const STabPanel = styled(TabPanel)`
`;
