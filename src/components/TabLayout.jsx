import React, { Component } from "react";
import { Routes } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default class TabLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.router ? props.location.pathname : props.activeTab || 0,
    };
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.router && prevProps.location !== this.props.location) {
      this.setActiveTab(this.props.location.pathname);
    }

    if (prevState.activeTab !== this.state.activeTab) {
      this.props.onTabChange && this.props.onTabChange(this.state.activeTab);
    }
  }
  _getTabType(tab, index) {
    if (
      this.state.activeTab === index ||
      (this.props.router &&
        this.state.activeTab === this.props.basePath + tab.props.path)
    ) {
      return "gradient";
    }

    return "text";
  }

  _getTabClassName(tab, index) {
    if (
      this.state.activeTab === index ||
      (this.props.router &&
        this.state.activeTab === this.props.basePath + tab.props.path)
    ) {
      return "indigo";
    }

    return "blue-gray";
  }

  render() {
    return (
      <div className={this.props.className || ""}>
        <ul className="flex flex-wrap text-sm font-medium text-center border-b border-slate-500 text-gray-500 dark:text-gray-400 ">
          {this.props.children.map((e, i) => (
            <Button
              key={i.toString()}
              className="transition-all"
              color={this._getTabClassName(e, i)}
              variant={this._getTabType(e, i)}
              onClick={() => {
                if (this.props.router) {
                  this.props.navigate &&
                    this.props.navigate(this.props.basePath + e.props.path);
                } else {
                  this.setState({ activeTab: i });
                }
              }}
            >
              {e.props.title}
              {e.props.badge ? (
                <span className="badge">{e.props.badge}</span>
              ) : null}
            </Button>
          ))}
        </ul>
        <div className={"flex-1 " + (this.props.bodyClassName || "p-6")}>
          {this.props.router ? (
            <Routes>{this.props.children}</Routes>
          ) : (
            <>
              {this.props.children.find((e, i) => i === this.state.activeTab)}
            </>
          )}
        </div>
      </div>
    );
  }
}
