import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const TabLayout = (props) => {
  const [title, setTitle] = useState([]);

  useEffect(() => {
    setTitle(props.children.map((item) => item.props.title));
  }, [props.children]);
  return title.length ? (
    <Tabs value={title[0]}>
      <TabsHeader className="flex-wrap sm:flex-nowrap">
        {props.children.map((e, i) => (
          <Tab key={i.toString()} value={e.props.title} className="">
            {e.props.title}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {props.children.map((e, i) => (
          <TabPanel key={i.toString()} value={e.props.title}>
            {e}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  ) : null;
};

export default TabLayout;
