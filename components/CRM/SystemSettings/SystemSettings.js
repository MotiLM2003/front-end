import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PaymentsInterfaceSettings from "./PaymentsInterfaceSettings/PaymentsInterfaceSettings";
import CurrenciesSettings from "./Currencies/CurrenciesSettings";
import { AnimatePresence } from "framer-motion";

const SystemSettings = () => {
  return (
    <div className="p-2">
      <Tabs isLazy>
        <TabList>
          <Tab>
            <span className="text-sm"> General </span>
          </Tab>
          <Tab>
            <span className="text-sm"> Manage Currencies </span>
          </Tab>
          <Tab>
            <span className="text-sm"> Payments Interfaces </span>
          </Tab>
          <Tab>
            <span className="text-sm">Withdraw requests</span>
          </Tab>
          <Tab>
            <span className="text-sm"> Future 3 </span>
          </Tab>
          <Tab>
            <span className="text-sm"> System logs </span>
          </Tab>
          <Tab>
            <span className="text-sm">Payments Scheduler </span>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel> General </TabPanel>
          <TabPanel>
            <AnimatePresence>
              <CurrenciesSettings />{" "}
            </AnimatePresence>
          </TabPanel>
          <TabPanel>
            <PaymentsInterfaceSettings />
          </TabPanel>
          <TabPanel>withdraws </TabPanel> <TabPanel> Future 3 </TabPanel>
          <TabPanel>System logging </TabPanel>
          <TabPanel>Payments Scheduler </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
