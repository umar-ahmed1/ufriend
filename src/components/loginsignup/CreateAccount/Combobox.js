import React from "react";
import { useCombobox } from "downshift";
import { Input, List, ListItem, Flex, Text, IconButton, Box } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import majors from './majors'

const items = majors

const Combobox = ({signUpForm,setSignUpForm,setMajorClicked,majorClicked}) => {
  const [inputItems, setInputItems] = React.useState(items);
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    }
  });

  React.useEffect(() =>{
    setSignUpForm(prev => ({
      ...prev,
      major:selectedItem
  }))
    if(selectedItem){
      setMajorClicked(!majorClicked)
    }
  },[selectedItem])

  return (
    <Box width='100%'>
      <Box>
        <Flex alignItems="center" width='100%'>
          <Input flex={1} width='100%' {...getInputProps()} placeholder="Search..."/>
          <IconButton
            {...getToggleButtonProps()}
            aria-label={"toggle menu"}
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          />
        </Flex>
        {isOpen && (
          <List maxH='200px' overflowY='auto' position='absolute' zIndex={1} background='white' width='100%'>
            {inputItems.map((item, index) => (
              <ListItem
                {...getItemProps({ item, index })}
                bg={highlightedIndex === index ? "brand.100" : null}
                px={4}
                py={2}
                cursor="pointer"
                key={index}
              >
                {item}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Combobox;
