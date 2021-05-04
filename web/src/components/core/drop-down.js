import React from 'react'
import {Dropdown, DropdownButton} from "react-bootstrap";

function DropdownCore(props) {
  return (
    <DropdownButton
      variant="primary"
      title={props.value || 'Not set'}
    >
      {
        props.categories.map((category, index) => {
          return (
            <Dropdown.Item
              key={index}
              eventKey={category !== 'Not set' ? category.toLowerCase() : null}
              onSelect={props.onChange}
            >
              {category}
            </Dropdown.Item>
          );
        })
      }
    </DropdownButton>
  );
}

export default DropdownCore;

