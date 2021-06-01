import React, { FC, ReactNode, useReducer } from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import {
  DraggableProvided,
  DroppableProvided,
  DropResult,
  Draggable,
  Droppable,
  DragDropContext,
} from 'react-beautiful-dnd'

// components
import Header from "./Header";
import Navigation from "./Navigation";
import SubNavigation from "./SubNavigation";
import Footer from "./Footer";

// constants
import { DRAWER_WIDTH, FOOTER_HEIGHT } from "../utils/constants";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex", flexDirection: "column",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
      background: theme.palette.background.paper,
      marginLeft: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    },
  })
);

// define interface to represent component props
interface Props {
  toggleTheme: () => void;
  useDefaultTheme: boolean;
  children: ReactNode;
}

// functional component
const Layout: FC<Props> = ({ toggleTheme, useDefaultTheme, children }) => {
  const classes = useStyles();
  const [open, toggle] = useReducer((open) => !open, true);

  const reducer = (state: boolean, isOpen: boolean) => {
    return isOpen;
  }
  const [subOpen, subToggle] = useReducer(reducer, false);

  const dndHandler = (result: DropResult) => {

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        open={open}
        handleMenuOpen={toggle}
        toggleTheme={toggleTheme}
        useDefaultTheme={useDefaultTheme}
      />
      <Navigation open={open} handleMenuClose={toggle} handleSubMenuClose={subToggle} >
      </Navigation>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >

        <div className={classes.toolbar} />
        <SubNavigation open={subOpen} />
        {children}
      </main>
      <footer>
        <Footer
          title="footer"
        />
      </footer>
    </div>
  );

};

export default Layout;