import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PaymentsInterfaceSettings from "./PaymentsInterfaceSettings/PaymentsInterfaceSettings";
import CurrenciesSettings from "./Currencies/CurrenciesSettings";
import { ToastContainer } from "react-toastify";
const SystemSettings = () => {
  return (
    <div className="p-2">
      <Tabs>
        <TabList>
          <Tab>
            <span className="text-sm">General</span>
          </Tab>
          <Tab>
            <span className="text-sm">Manage Currencies</span>
          </Tab>
          <Tab>
            <span className="text-sm">Payments Interfaces</span>
          </Tab>
          <Tab>
            <span className="text-sm">Future 2</span>
          </Tab>
          <Tab>
            <span className="text-sm">Future 3</span>
          </Tab>
          <Tab>
            <span className="text-sm">System logs</span>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>General</TabPanel>
          <TabPanel>
            <CurrenciesSettings />
          </TabPanel>
          <TabPanel>
            <PaymentsInterfaceSettings />
          </TabPanel>

          <TabPanel>Future 2</TabPanel>
          <TabPanel>Future 3</TabPanel>
          <TabPanel>System logging</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
