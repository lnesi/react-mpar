/**
 * Author:    Luis Nesi
 * Created:   04.04.2019
 **/

// @flow
import { Base64 } from "js-base64";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

export default class {
  classSelector: string;
  dictonary: Object;
  document: Object;
  store: Object;
  constructor(classSelector: string, dictonary: Object, document: Object) {
    this.classSelector = classSelector;
    this.dictonary = dictonary;
    this.document = document;
    if (this.document.react_mpar) {
      this.document.react_mpar.push(this);
    } else {
      this.document.react_mpar = [this];
    }
  }

  createState(preloadedState: Object): Object {
    var state = preloadedState;
    this.document.querySelectorAll(this.classSelector).forEach(wrapper => {
      let definition = this.dictonary[wrapper.dataset.component];
      if (definition) {
        if (definition.reduxEnabled && definition.createState) {
          let initialState = {};
          initialState = JSON.parse(Base64.decode(wrapper.dataset.state));
          if (!state[wrapper.dataset.component])
            state[wrapper.dataset.component] = {};
          state[wrapper.dataset.component][wrapper.id] = initialState;
        }
      } else {
        throwError(
          "Invalid component. Could not find '" +
            wrapper.dataset.component +
            "' in dictionary."
        );
      }
    });
    return state;
  }

  /* To be implemented when we need to dispatch redux updates */
  getStateBy(id: string) {
    let wrapper = this.getWrapperById(id);
    if (wrapper) {
      let stateEntry = {};
      stateEntry = JSON.parse(Base64.decode(wrapper.dataset.state));
      return stateEntry;
    }
  }

  unmount(id: string) {
    if (this.document.getElementById(id))
      ReactDOM.unmountComponentAtNode(this.document.getElementById(id));
  }

  unmountAll() {
    this.document.querySelectorAll(this.classSelector).forEach(wrapper => {
      ReactDOM.unmountComponentAtNode(wrapper);
    });
  }

  getWrapperById(id: string) {
    if (id) {
      let wrapper = this.document.getElementById(id);
      if (wrapper) {
        return wrapper;
      } else {
        throwError("Invalid wrapper ID. Could not find '" + id + "' in DOM.");
        return null;
      }
    } else {
      throwError("Invalid wrapper ID. is missing in the DOM.");
      return null;
    }
  }

  mount(id: string, callback: Function = () => {}) {
    let wrapper = this.getWrapperById(id);
    if (wrapper) {
      let definition = this.dictonary[wrapper.dataset.component];
      if (definition) {
        let props = {};
        if (wrapper.dataset.props) {
          props = JSON.parse(Base64.decode(wrapper.dataset.props));
        }
        if (definition.classLoader !== undefined) {
          definition.classLoader().then(result => {
            if (wrapper.dataset.rendered === "true") {
              this.info("component already rendered", definition.name);
              this.hydratate(
                result.default,
                definition,
                wrapper,
                props,
                callback
              );
            } else {
              this.render(result.default, definition, wrapper, props, callback);
            }
          });
          this.info("loading module", definition.name);
        } else {
          // this.info(
          //   "Notice:",
          //   "no class loader, fallback to preloaded class for " +
          //     definition.name
          // );
          if (wrapper.dataset.rendered === "true") {
            this.info("component already rendered", definition.name);
            this.hydratate(
              definition.class,
              definition,
              wrapper,
              props,
              callback
            );
          } else {
            this.render(definition.class, definition, wrapper, props, callback);
          }
        }
      } else {
        throwError(
          "Invalid component. Could not find '" + wrapper.dataset.component
        );
      }
    }
  }

  render(
    Component: React.ComponentType<any>,
    definition: Object,
    wrapper: HTMLElement,
    props: Object = {},
    callback: Function = () => {}
  ) {
    this.info("Rendering", wrapper.id);
    if (definition.reduxEnabled) {
      ReactDOM.render(
        <Provider store={this.store}>
          <Component id={wrapper.id} {...props} />
        </Provider>,
        wrapper,
        callback
      );
    } else {
      ReactDOM.render(
        <React.Fragment>
          <Component id={wrapper.id} {...props} />
        </React.Fragment>,
        wrapper,
        callback
      );
    }
  }

  hydratate(
    Component: React.ComponentType<any>,
    definition: Object,
    wrapper: HTMLElement,
    props: Object = {},
    callback: Function = () => {}
  ) {
    this.info("Hyratating", wrapper.id);
    if (definition.reduxEnabled) {
      ReactDOM.hydrate(
        <Provider store={this.store}>
          <Component id={wrapper.id} {...props} />
        </Provider>,
        wrapper,
        callback
      );
    } else {
      ReactDOM.hydrate(
        <React.Fragment>
          <Component id={wrapper.id} {...props} />
        </React.Fragment>,
        wrapper,
        callback
      );
    }
  }

  renderAll() {
    if (this.store) {
      this.store.dispatch({ type: "REACT_REDUX_MPA_RENDER_ALL_START" });
    }
    document.dispatchEvent(new Event("REACT_REDUX_MPA_RENDER_ALL_START"));
    console.time("React-mpar");
    this.info("Render Start");
    if (this.document.querySelectorAll(this.classSelector).length > 0) {
      this.renderStep(0);
    } else {
      this.finishRender();
    }
  }
  finishRender() {
    if (this.store) {
      this.store.dispatch({ type: "REACT_REDUX_MPA_RENDER_ALL_END" });
    }
    document.dispatchEvent(new Event("REACT_REDUX_MPA_RENDER_ALL_END"));
    console.timeEnd("React-mpar");
    this.info("Render finish.");
  }
  renderStep(index: number = 0) {
    const element = this.document.querySelectorAll(this.classSelector)[index];

    this.mount(element.id, () => {
      if (
        index <
        this.document.querySelectorAll(this.classSelector).length - 1
      ) {
        this.renderStep(index + 1);
      } else {
        this.finishRender();
      }
    });
  }
  setStore(store: Object) {
    this.store = store;
    this.store.dispatch({ type: "REACT_REDUX_MPA_RENDER_SET_STORE" });
  }

  resetById(id: string) {
    this.unmount(id);
    this.mount(id);
  }

  info(primaryMessage: string, secondaryMessage: string = "") {
    console.log(
      "%c React-mpar " +
        "%c " +
        primaryMessage +
        " " +
        "%c " +
        secondaryMessage,
      "background: blue;color:white;",
      "font-weight: bold;",
      ""
    );
  }
}

function throwError(message: string) {
  try {
    console.error(
      "%c  React-mpar ",
      "background: #0483d8; color: #fff",
      message
    );
  } catch (e) {
    throw Error(message);
  }
}
