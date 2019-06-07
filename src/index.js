// @flow
import ReactMPAR from "./ReactMPAR";
import dictionary from "./dictionaries/development";

const renderer = new ReactMPAR(".test_class_name", dictionary, document);

renderer.renderAll();
