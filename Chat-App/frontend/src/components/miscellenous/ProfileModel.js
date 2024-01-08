import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModel = ({user,children}) => {
   
const {isOpen,onOpen,onClose} = useDisclosure();
    return (
    <>
    { children ? (
      <span onClick={onOpen}>{children}</span>
    ):(
      <IconButton display={{base:'flex'}} icon={<ViewIcon />} onClick={onOpen} />
    )
}
   
<Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            dfsdfgdssg
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>











    </>
  )
}

export default ProfileModel