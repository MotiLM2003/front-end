import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PaymentsInterfaceSettings from "./PaymentsInterfaceSettings/PaymentsInterfaceSettings";
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
            <span className="text-sm">Logging</span>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>General</TabPanel>
          <TabPanel>Manage Currencies</TabPanel>
          <TabPanel>
            <PaymentsInterfaceSettings />
          </TabPanel>

          <TabPanel>Future 2</TabPanel>
          <TabPanel>Future 3</TabPanel>
          <TabPanel>Logging</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
