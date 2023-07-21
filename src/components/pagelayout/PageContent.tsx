import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
    children: any;
};

const PageContent:React.FC<PageContentProps> = ({children}) => {
    //the children are the LHS and RHS react fragments
    return (
            <Flex width='100%'  justify='space-between'>
                {/*LHS*/}
                <Flex 
                    direction='column' 
                    width={{base:'100%',md:'25%'}}
                    border='1px solid #2F3336'
                >
                    {children && children[0 as keyof typeof children]}
                </Flex>
                {/*MHS*/}
                <Flex 
                    direction='column' 
                    width={{base:'45%',md:'50%'}}
                    border='1px solid #2F3336'
                >
                    {children && children[1 as keyof typeof children]}
                </Flex>
                {/*RHS*/}
                <Flex 
                    direction='column' 
                    display={{base:'none',md:'flex'}}
                    flexGrow={1}
                    border='1px solid #2F3336'
                >
                    {children && children[2 as keyof typeof children]}
                </Flex>
            </Flex>
    )
}
export default PageContent;