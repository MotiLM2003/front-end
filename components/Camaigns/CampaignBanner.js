import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Stack,
  FormLabel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Select,
  Input,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Fade,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faVimeo } from '@fortawesome/free-brands-svg-icons';
import { v4 as uid } from 'uuid';
import attach from '../../images/icons/attach.svg';
import Image from 'next/image';
import Close from '@components/Icons/Close';

const initialBanner = {
  type: 0,
  youtubeDesc: '',
  vimeoDesc: '',
};
const CampaignBanner = ({ bannerList, setBannerList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bannerItem, setBannerItem] = useState(initialBanner);
  const firstField = React.useRef();
  const renderContent = () => {
    switch (bannerItem.type) {
      case 0: {
        return (
          <div className='mr-5  cursor-pointer shadow py-2 min-w-[220px] mb-5 px-2 flex flex-col rounded items-center'>
            <Image src={attach} width={80} height={80} />
            <h3 className='text-'>Upload Banner</h3>
          </div>
        );
      }
      case 1: {
        return (
          <Fade in={onOpen}>
            <div className='cursor-pointer shadow py-2 flex flex-col rounded items-center p-2'>
              <Textarea
                placeholder='Add Youtube link'
                resize='none'
                size='lg'
                value={bannerItem.youtubeDesc}
                onChange={(e) => {
                  setBannerItem({ ...bannerItem, youtubeDesc: e.target.value });
                }}
                variant='filled'
              />
            </div>
          </Fade>
        );
      }
      case 2: {
        return (
          <div className='cursor-pointer shadow py-2 flex flex-col rounded items-center p-2'>
            <Textarea
              placeholder='Add Vimeo link'
              resize='none'
              size='lg'
              variant='filled'
              value={bannerItem.vimeoDesc}
              onChange={(e) => {
                setBannerItem({ ...bannerItem, vimeoDesc: e.target.value });
              }}
            />
          </div>
        );
      }
    }
  };

  const renderBannerItem = (bannerItem) => {
    const image = null;
    switch (bannerItem.type) {
      case 0: {
        image = faImage;
        break;
      }
      case 1: {
        image = faYoutube;
        break;
      }
      case 2: {
        image = faVimeo;
      }
    }

    return (
      <Popover>
        <PopoverTrigger>
          <FontAwesomeIcon
            icon={faYoutube}
            size='5x'
            className='text-slate-700'
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Confirmation</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <div
                className='text-center flex justify-center items p-4'
                onClick={() => {
                  setBannerList(
                    bannerList.filter((x) => x.id !== bannerItem.id)
                  );
                }}
              >
                <Button colorScheme='blue'>Delete this item.</Button>
              </div>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    );
  };

  return (
    <div>
      <Button size='xs' colorScheme='blue' onClick={onOpen}>
        Create a new Banner item
      </Button>
      <div className='flex gap-5 mt-5 mb-8 flex-wrap justify-center '>
        {bannerList.map((item) => {
          console.log(item);
          return <div className='cursor-pointer'>{renderBannerItem(item)}</div>;
        })}
      </div>

      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='11px'>
            Create new banner item
          </DrawerHeader>

          <DrawerBody>
            <div className='flex flex-col item-center justify-center mt-7  gap-5'>
              <div className='shadow py-2 flex flex-col rounded  pl-5'>
                <h3>Create Banner</h3>
                <div className='flex flex-col gap-1 my-8'>
                  <div
                    onClick={() => setBannerItem({ ...bannerItem, type: 0 })}
                    className={`flex items-center gap-4  select-none  p-3 rounded mr-5 transition duration-300 cursor-pointer ${
                      bannerItem.type === 0 ? 'bg-red' : 'hover:bg-slate-300'
                    }`}
                  >
                    <div className='basis-[40px]'>
                      <FontAwesomeIcon
                        icon={faImage}
                        size='2x'
                        className='text-slate-700'
                      />
                    </div>
                    <div className='select-none'>Image</div>
                  </div>
                  <div
                    onClick={() => setBannerItem({ ...bannerItem, type: 1 })}
                    className={`flex items-center gap-4select-none  p-3 rounded mr-5 transition duration-300 cursor-pointer ${
                      bannerItem.type === 1 ? 'bg-red' : 'hover:bg-slate-300'
                    } `}
                  >
                    <div className='basis-[40px]'>
                      <FontAwesomeIcon
                        icon={faYoutube}
                        size='2x'
                        className='text-slate-700'
                      />
                    </div>
                    <div className='select-none'>You sadtube</div>
                  </div>
                  <div
                    onClick={() => setBannerItem({ ...bannerItem, type: 2 })}
                    className={`flex items-center gap-4  p-3 rounded mr-5 transition duration-300 cursor-pointer ${
                      bannerItem.type === 2 ? 'bg-red' : 'hover:bg-slate-300'
                    }`}
                  >
                    <di className='basis-[40px]'>
                      <FontAwesomeIcon
                        icon={faVimeo}
                        size='2x'
                        className='text-slate-700'
                      />
                    </di>
                    <div className='flex-grow select-none'>Vimeo</div>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  {renderContent()}
                </div>
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              onClick={() => {
                const isUpdating = false;
                if (!bannerItem.id) {
                  setBannerList([...bannerList, { ...bannerItem, id: uid() }]);
                } else {
                  isUpdating = true;
                  setBannerList(
                    buttonsList.map((item) =>
                      item.id === bannerItem.id ? bannerItem : item
                    )
                  );
                }
                onClose();
                // toast({
                //   position: 'top',
                //   title: isUpdating
                //     ? 'Charity button button successfully updated'
                //     : 'Charity button button successfully created',
                //   status: isUpdating ? 'info' : 'success',
                //   variant: 'top-accent',
                //   isClosable: true,
                // });
                // setCharityButton(initialCharityButton);
              }}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CampaignBanner;