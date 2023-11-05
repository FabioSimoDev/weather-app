import { Col, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";

const NavBar = function ({
  isSearching,
  appSection,
  setAppSection,
  setSavedLocations,
  savedLocations,
  setIsSearching,
  city,
  isSavingLocation,
  setIsSavingLocation
}) {
  const handleMenuCLick = function (e) {
    e.stopPropagation();
    if (appSection === "Main") {
      setAppSection("Menu");
    } else if (appSection === "Menu") {
      setAppSection("Main");
    }
  };
  return (
    <Row className="w-100 position-fixed bottom-0 pb-2 px-4">
      <Col className="d-flex justify-content-between">
        <Icon.GeoAlt
          className="fs-1 icon"
          role="button"
          onClick={(e) => {
            isSearching(true);
            setAppSection("Main");
            setIsSavingLocation(false);
            e.stopPropagation();
          }}
        />
        <Icon.PlusCircle
          className="fs-1 icon"
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            setAppSection("Main");
            setIsSearching(true);
            setIsSavingLocation(true);
          }}
        />
        <Icon.List
          className="fs-1 icon"
          role="button"
          onClick={(e) => {
            handleMenuCLick(e);
          }}
        />
      </Col>
    </Row>
  );
};

export default NavBar;
