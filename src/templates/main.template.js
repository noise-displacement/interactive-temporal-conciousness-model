import { Outlet } from "react-router-dom";
import MainNav from "../components/mainNav";
import { easeInOut, motion } from "framer-motion";

const homeVariants = {
  initial: {
    x: "0rem",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: { x: "-1rem", opacity: 0 },
};

function MainTemplate(props, { children }) {
  return (
    <>
      <MainNav location={props.location}></MainNav>
      <motion.div
        className="routeContainer"
        variants={homeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }}
      >
        {children}
        <Outlet />
      </motion.div>
    </>
  );
}

export default MainTemplate;
